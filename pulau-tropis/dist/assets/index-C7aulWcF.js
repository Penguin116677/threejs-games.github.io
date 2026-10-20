(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pl="170",Fs={ROTATE:0,DOLLY:1,PAN:2},Ui={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ap=0,hu=1,op=2,ml=1,Xf=2,ai=3,mi=0,nn=1,en=2,Fi=0,Bs=1,fu=2,du=3,pu=4,cp=5,rs=100,lp=101,up=102,hp=103,fp=104,dp=200,pp=201,mp=202,gp=203,pc=204,mc=205,xp=206,_p=207,vp=208,yp=209,Mp=210,bp=211,Sp=212,Ap=213,wp=214,gc=0,xc=1,_c=2,Xs=3,vc=4,yc=5,Mc=6,bc=7,gl=0,Tp=1,Ep=2,Bi=0,Rp=1,Cp=2,Pp=3,jf=4,Ip=5,Lp=6,Dp=7,mu="attached",zp="detached",Yf=300,js=301,Ys=302,Sc=303,Ac=304,io=306,Wi=1e3,Wn=1001,qa=1002,Ye=1003,Kf=1004,Sr=1005,Fe=1006,Ha=1007,pn=1008,Mn=1009,qf=1010,Zf=1011,Or=1012,xl=1013,ls=1014,yn=1015,nr=1016,_l=1017,vl=1018,Ks=1020,$f=35902,Jf=1021,Qf=1022,Xe=1023,td=1024,ed=1025,Hs=1026,qs=1027,yl=1028,Ml=1029,nd=1030,bl=1031,Sl=1033,Ga=33776,Va=33777,Wa=33778,Xa=33779,wc=35840,Tc=35841,Ec=35842,Rc=35843,Cc=36196,Pc=37492,Ic=37496,Lc=37808,Dc=37809,zc=37810,Nc=37811,Uc=37812,kc=37813,Oc=37814,Fc=37815,Bc=37816,Hc=37817,Gc=37818,Vc=37819,Wc=37820,Xc=37821,ja=36492,jc=36494,Yc=36495,id=36283,Kc=36284,qc=36285,Zc=36286,Al=2200,Np=2201,Up=2202,Fr=2300,Br=2301,mo=2302,Ds=2400,zs=2401,Za=2402,wl=2500,kp=2501,Op=0,sd=1,$c=2,Fp=3200,Tl=3201,El=0,Bp=1,Ni="",Ne="srgb",sn="srgb-linear",so="linear",me="srgb",ps=7680,gu=519,Hp=512,Gp=513,Vp=514,rd=515,Wp=516,Xp=517,jp=518,Yp=519,Jc=35044,Hi=35048,xu="300 es",li=2e3,$a=2001;class ji{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _u=1234567;const Cr=Math.PI/180,Zs=180/Math.PI;function Nn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ke[i&255]+Ke[i>>8&255]+Ke[i>>16&255]+Ke[i>>24&255]+"-"+Ke[t&255]+Ke[t>>8&255]+"-"+Ke[t>>16&15|64]+Ke[t>>24&255]+"-"+Ke[e&63|128]+Ke[e>>8&255]+"-"+Ke[e>>16&255]+Ke[e>>24&255]+Ke[n&255]+Ke[n>>8&255]+Ke[n>>16&255]+Ke[n>>24&255]).toLowerCase()}function Ie(i,t,e){return Math.max(t,Math.min(e,i))}function Rl(i,t){return(i%t+t)%t}function Kp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function qp(i,t,e){return i!==t?(e-i)/(t-i):0}function Pr(i,t,e){return(1-e)*i+e*t}function Zp(i,t,e,n){return Pr(i,t,1-Math.exp(-e*n))}function $p(i,t=1){return t-Math.abs(Rl(i,t*2)-t)}function Jp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Qp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function tm(i,t){return i+Math.floor(Math.random()*(t-i+1))}function em(i,t){return i+Math.random()*(t-i)}function nm(i){return i*(.5-Math.random())}function im(i){i!==void 0&&(_u=i);let t=_u+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function sm(i){return i*Cr}function rm(i){return i*Zs}function am(i){return(i&i-1)===0&&i!==0}function om(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function lm(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),h=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ln(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function de(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const di={DEG2RAD:Cr,RAD2DEG:Zs,generateUUID:Nn,clamp:Ie,euclideanModulo:Rl,mapLinear:Kp,inverseLerp:qp,lerp:Pr,damp:Zp,pingpong:$p,smoothstep:Jp,smootherstep:Qp,randInt:tm,randFloat:em,randFloatSpread:nm,seededRandom:im,degToRad:sm,radToDeg:rm,isPowerOfTwo:am,ceilPowerOfTwo:om,floorPowerOfTwo:cm,setQuaternionFromProperEuler:lm,normalize:de,denormalize:Ln};class St{constructor(t=0,e=0){St.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,n,s,r,a,o,c,l){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],y=s[1],v=s[4],_=s[7],A=s[2],w=s[5],C=s[8];return r[0]=a*x+o*y+c*A,r[3]=a*m+o*v+c*w,r[6]=a*p+o*_+c*C,r[1]=l*x+u*y+h*A,r[4]=l*m+u*v+h*w,r[7]=l*p+u*_+h*C,r[2]=d*x+f*y+g*A,r[5]=d*m+f*v+g*w,r[8]=d*p+f*_+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,g=e*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=h*x,t[1]=(s*l-u*n)*x,t[2]=(o*n-s*a)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(go.makeScale(t,e)),this}rotate(t){return this.premultiply(go.makeRotation(-t)),this}translate(t,e){return this.premultiply(go.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const go=new qt;function ad(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Hr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function um(){const i=Hr("canvas");return i.style.display="block",i}const vu={};function Ar(i){i in vu||(vu[i]=!0,console.warn(i))}function hm(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function fm(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function dm(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ie={enabled:!0,workingColorSpace:sn,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===me&&(i.r=pi(i.r),i.g=pi(i.g),i.b=pi(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===me&&(i.r=Gs(i.r),i.g=Gs(i.g),i.b=Gs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ni?so:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function pi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const yu=[.64,.33,.3,.6,.15,.06],Mu=[.2126,.7152,.0722],bu=[.3127,.329],Su=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Au=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ie.define({[sn]:{primaries:yu,whitePoint:bu,transfer:so,toXYZ:Su,fromXYZ:Au,luminanceCoefficients:Mu,workingColorSpaceConfig:{unpackColorSpace:Ne},outputColorSpaceConfig:{drawingBufferColorSpace:Ne}},[Ne]:{primaries:yu,whitePoint:bu,transfer:me,toXYZ:Su,fromXYZ:Au,luminanceCoefficients:Mu,outputColorSpaceConfig:{drawingBufferColorSpace:Ne}}});let ms;class pm{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ms===void 0&&(ms=Hr("canvas")),ms.width=t.width,ms.height=t.height;const n=ms.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ms}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Hr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=pi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(pi(e[n]/255)*255):e[n]=pi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let mm=0;class od{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Nn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xo(s[a].image)):r.push(xo(s[a]))}else r=xo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function xo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gm=0;class Be extends ji{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=Wn,s=Wn,r=Fe,a=pn,o=Xe,c=Mn,l=Be.DEFAULT_ANISOTROPY,u=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Nn(),this.name="",this.source=new od(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wi:t.x=t.x-Math.floor(t.x);break;case Wn:t.x=t.x<0?0:1;break;case qa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wi:t.y=t.y-Math.floor(t.y);break;case Wn:t.y=t.y<0?0:1;break;case qa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=Yf;Be.DEFAULT_ANISOTROPY=1;class ee{constructor(t=0,e=0,n=0,s=1){ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,_=(f+1)/2,A=(p+1)/2,w=(u+d)/4,C=(h+x)/4,z=(g+m)/4;return v>_&&v>A?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=C/n):_>A?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=z/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=z/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(h-x)/y,this.z=(d-u)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xm extends ji{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Be(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new od(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gi extends xm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class cd extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _m extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _e{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(h!==x||c!==d||l!==f||u!==g){let m=1-o;const p=c*d+l*f+u*g+h*x,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const A=Math.sqrt(v),w=Math.atan2(A,p*y);m=Math.sin(m*w)/A,o=Math.sin(o*w)/A}const _=o*y;if(c=c*m+d*_,l=l*m+f*_,u=u*m+g*_,h=h*m+x*_,m===1-o){const A=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=A,l*=A,u*=A,h*=A}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+u*h+c*f-l*d,t[e+1]=c*g+u*d+l*h-o*f,t[e+2]=l*g+u*f+o*d-c*h,t[e+3]=u*g-o*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,n=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),h=2*(r*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _o.copy(this).projectOnVector(t),this.sub(_o)}reflect(t){return this.sub(_o.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _o=new B,wu=new _e;class _i{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,wn):wn.fromBufferAttribute(r,a),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Jr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jr.copy(n.boundingBox)),Jr.applyMatrix4(t.matrixWorld),this.union(Jr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(hr),Qr.subVectors(this.max,hr),gs.subVectors(t.a,hr),xs.subVectors(t.b,hr),_s.subVectors(t.c,hr),Mi.subVectors(xs,gs),bi.subVectors(_s,xs),Ki.subVectors(gs,_s);let e=[0,-Mi.z,Mi.y,0,-bi.z,bi.y,0,-Ki.z,Ki.y,Mi.z,0,-Mi.x,bi.z,0,-bi.x,Ki.z,0,-Ki.x,-Mi.y,Mi.x,0,-bi.y,bi.x,0,-Ki.y,Ki.x,0];return!vo(e,gs,xs,_s,Qr)||(e=[1,0,0,0,1,0,0,0,1],!vo(e,gs,xs,_s,Qr))?!1:(ta.crossVectors(Mi,bi),e=[ta.x,ta.y,ta.z],vo(e,gs,xs,_s,Qr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Qn=[new B,new B,new B,new B,new B,new B,new B,new B],wn=new B,Jr=new _i,gs=new B,xs=new B,_s=new B,Mi=new B,bi=new B,Ki=new B,hr=new B,Qr=new B,ta=new B,qi=new B;function vo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){qi.fromArray(i,r);const o=s.x*Math.abs(qi.x)+s.y*Math.abs(qi.y)+s.z*Math.abs(qi.z),c=t.dot(qi),l=e.dot(qi),u=n.dot(qi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const vm=new _i,fr=new B,yo=new B;class ln{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):vm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fr.subVectors(t,this.center);const e=fr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(fr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(yo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fr.copy(t.center).add(yo)),this.expandByPoint(fr.copy(t.center).sub(yo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ti=new B,Mo=new B,ea=new B,Si=new B,bo=new B,na=new B,So=new B;class ir{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ti)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ti.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ti.copy(this.origin).addScaledVector(this.direction,e),ti.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Mo.copy(t).add(e).multiplyScalar(.5),ea.copy(e).sub(t).normalize(),Si.copy(this.origin).sub(Mo);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ea),o=Si.dot(this.direction),c=-Si.dot(ea),l=Si.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*c-o,d=a*o-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Mo).addScaledVector(ea,d),f}intersectSphere(t,e){ti.subVectors(t.center,this.origin);const n=ti.dot(this.direction),s=ti.dot(ti)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ti)!==null}intersectTriangle(t,e,n,s,r){bo.subVectors(e,t),na.subVectors(n,t),So.crossVectors(bo,na);let a=this.direction.dot(So),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Si.subVectors(this.origin,t);const c=o*this.direction.dot(na.crossVectors(Si,na));if(c<0)return null;const l=o*this.direction.dot(bo.cross(Si));if(l<0||c+l>a)return null;const u=-o*Si.dot(So);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ut{constructor(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m){Ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m)}set(t,e,n,s,r,a,o,c,l,u,h,d,f,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ut().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/vs.setFromMatrixColumn(t,0).length(),r=1/vs.setFromMatrixColumn(t,1).length(),a=1/vs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=a*u,f=a*h,g=o*u,x=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=f+g*l,e[5]=d-x*l,e[9]=-o*c,e[2]=x-d*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*u,f=c*h,g=l*u,x=l*h;e[0]=d+x*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-g,e[6]=x+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*u,f=c*h,g=l*u,x=l*h;e[0]=d-x*o,e[4]=-a*h,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*u,e[9]=x-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*u,f=a*h,g=o*u,x=o*h;e[0]=c*u,e[4]=g*l-f,e[8]=d*l+x,e[1]=c*h,e[5]=x*l+d,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*u,e[4]=x-d*h,e[8]=g*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=f*h+g,e[10]=d-x*h}else if(t.order==="XZY"){const d=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+x,e[5]=a*u,e[9]=f*h-g,e[2]=g*h-f,e[6]=o*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ym,t,Mm)}lookAt(t,e,n){const s=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),Ai.crossVectors(n,hn),Ai.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),Ai.crossVectors(n,hn)),Ai.normalize(),ia.crossVectors(hn,Ai),s[0]=Ai.x,s[4]=ia.x,s[8]=hn.x,s[1]=Ai.y,s[5]=ia.y,s[9]=hn.y,s[2]=Ai.z,s[6]=ia.z,s[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],y=n[3],v=n[7],_=n[11],A=n[15],w=s[0],C=s[4],z=s[8],b=s[12],E=s[1],I=s[5],X=s[9],W=s[13],q=s[2],M=s[6],S=s[10],R=s[14],T=s[3],k=s[7],F=s[11],P=s[15];return r[0]=a*w+o*E+c*q+l*T,r[4]=a*C+o*I+c*M+l*k,r[8]=a*z+o*X+c*S+l*F,r[12]=a*b+o*W+c*R+l*P,r[1]=u*w+h*E+d*q+f*T,r[5]=u*C+h*I+d*M+f*k,r[9]=u*z+h*X+d*S+f*F,r[13]=u*b+h*W+d*R+f*P,r[2]=g*w+x*E+m*q+p*T,r[6]=g*C+x*I+m*M+p*k,r[10]=g*z+x*X+m*S+p*F,r[14]=g*b+x*W+m*R+p*P,r[3]=y*w+v*E+_*q+A*T,r[7]=y*C+v*I+_*M+A*k,r[11]=y*z+v*X+_*S+A*F,r[15]=y*b+v*W+_*R+A*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+x*(+e*c*f-e*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+m*(+e*l*h-e*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-e*c*h+e*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],y=h*m*l-x*d*l+x*c*f-o*m*f-h*c*p+o*d*p,v=g*d*l-u*m*l-g*c*f+a*m*f+u*c*p-a*d*p,_=u*x*l-g*h*l+g*o*f-a*x*f-u*o*p+a*h*p,A=g*h*c-u*x*c-g*o*d+a*x*d+u*o*m-a*h*m,w=e*y+n*v+s*_+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return t[0]=y*C,t[1]=(x*d*r-h*m*r-x*s*f+n*m*f+h*s*p-n*d*p)*C,t[2]=(o*m*r-x*c*r+x*s*l-n*m*l-o*s*p+n*c*p)*C,t[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*C,t[4]=v*C,t[5]=(u*m*r-g*d*r+g*s*f-e*m*f-u*s*p+e*d*p)*C,t[6]=(g*c*r-a*m*r-g*s*l+e*m*l+a*s*p-e*c*p)*C,t[7]=(a*d*r-u*c*r+u*s*l-e*d*l-a*s*f+e*c*f)*C,t[8]=_*C,t[9]=(g*h*r-u*x*r-g*n*f+e*x*f+u*n*p-e*h*p)*C,t[10]=(a*x*r-g*o*r+g*n*l-e*x*l-a*n*p+e*o*p)*C,t[11]=(u*o*r-a*h*r-u*n*l+e*h*l+a*n*f-e*o*f)*C,t[12]=A*C,t[13]=(u*x*s-g*h*s+g*n*d-e*x*d-u*n*m+e*h*m)*C,t[14]=(g*o*s-a*x*s-g*n*c+e*x*c+a*n*m-e*o*m)*C,t[15]=(a*h*s-u*o*s+u*n*c-e*h*c-a*n*d+e*o*d)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,g=r*h,x=a*u,m=a*h,p=o*h,y=c*l,v=c*u,_=c*h,A=n.x,w=n.y,C=n.z;return s[0]=(1-(x+p))*A,s[1]=(f+_)*A,s[2]=(g-v)*A,s[3]=0,s[4]=(f-_)*w,s[5]=(1-(d+p))*w,s[6]=(m+y)*w,s[7]=0,s[8]=(g+v)*C,s[9]=(m-y)*C,s[10]=(1-(d+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=vs.set(s[0],s[1],s[2]).length();const a=vs.set(s[4],s[5],s[6]).length(),o=vs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Tn.copy(this);const l=1/r,u=1/a,h=1/o;return Tn.elements[0]*=l,Tn.elements[1]*=l,Tn.elements[2]*=l,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=h,Tn.elements[9]*=h,Tn.elements[10]*=h,e.setFromRotationMatrix(Tn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=li){const c=this.elements,l=2*r/(e-t),u=2*r/(n-s),h=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(o===li)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===$a)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=li){const c=this.elements,l=1/(e-t),u=1/(n-s),h=1/(a-r),d=(e+t)*l,f=(n+s)*u;let g,x;if(o===li)g=(a+r)*h,x=-2*h;else if(o===$a)g=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const vs=new B,Tn=new Ut,ym=new B(0,0,0),Mm=new B(1,1,1),Ai=new B,ia=new B,hn=new B,Tu=new Ut,Eu=new _e;class rn{constructor(t=0,e=0,n=0,s=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ie(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Tu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Tu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Eu.setFromEuler(this),this.setFromQuaternion(Eu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class Cl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bm=0;const Ru=new B,ys=new _e,ei=new Ut,sa=new B,dr=new B,Sm=new B,Am=new _e,Cu=new B(1,0,0),Pu=new B(0,1,0),Iu=new B(0,0,1),Lu={type:"added"},wm={type:"removed"},Ms={type:"childadded",child:null},Ao={type:"childremoved",child:null};class Te extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new B,e=new rn,n=new _e,s=new B(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ut},normalMatrix:{value:new qt}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.multiply(ys),this}rotateOnWorldAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.premultiply(ys),this}rotateX(t){return this.rotateOnAxis(Cu,t)}rotateY(t){return this.rotateOnAxis(Pu,t)}rotateZ(t){return this.rotateOnAxis(Iu,t)}translateOnAxis(t,e){return Ru.copy(t).applyQuaternion(this.quaternion),this.position.add(Ru.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Cu,t)}translateY(t){return this.translateOnAxis(Pu,t)}translateZ(t){return this.translateOnAxis(Iu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?sa.copy(t):sa.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(dr,sa,this.up):ei.lookAt(sa,dr,this.up),this.quaternion.setFromRotationMatrix(ei),s&&(ei.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(ei),this.quaternion.premultiply(ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lu),Ms.child=t,this.dispatchEvent(Ms),Ms.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wm),Ao.child=t,this.dispatchEvent(Ao),Ao.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ei.multiply(t.parent.matrixWorld)),t.applyMatrix4(ei),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lu),Ms.child=t,this.dispatchEvent(Ms),Ms.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,t,Sm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,Am,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Te.DEFAULT_UP=new B(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new B,ni=new B,wo=new B,ii=new B,bs=new B,Ss=new B,Du=new B,To=new B,Eo=new B,Ro=new B,Co=new ee,Po=new ee,Io=new ee;class Dn{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),En.subVectors(t,e),s.cross(En);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){En.subVectors(s,e),ni.subVectors(n,e),wo.subVectors(t,e);const a=En.dot(En),o=En.dot(ni),c=En.dot(wo),l=ni.dot(ni),u=ni.dot(wo),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,g=(a*u-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ii.x),c.addScaledVector(a,ii.y),c.addScaledVector(o,ii.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Co.setScalar(0),Po.setScalar(0),Io.setScalar(0),Co.fromBufferAttribute(t,e),Po.fromBufferAttribute(t,n),Io.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Co,r.x),a.addScaledVector(Po,r.y),a.addScaledVector(Io,r.z),a}static isFrontFacing(t,e,n,s){return En.subVectors(n,e),ni.subVectors(t,e),En.cross(ni).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),En.cross(ni).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Dn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;bs.subVectors(s,n),Ss.subVectors(r,n),To.subVectors(t,n);const c=bs.dot(To),l=Ss.dot(To);if(c<=0&&l<=0)return e.copy(n);Eo.subVectors(t,s);const u=bs.dot(Eo),h=Ss.dot(Eo);if(u>=0&&h<=u)return e.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(bs,a);Ro.subVectors(t,r);const f=bs.dot(Ro),g=Ss.dot(Ro);if(g>=0&&f<=g)return e.copy(r);const x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Ss,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return Du.subVectors(r,s),o=(h-u)/(h-u+(f-g)),e.copy(s).addScaledVector(Du,o);const p=1/(m+x+d);return a=x*p,o=d*p,e.copy(n).addScaledVector(bs,a).addScaledVector(Ss,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},ra={h:0,s:0,l:0};function Lo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ne){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ie.workingColorSpace){if(t=Rl(t,1),e=Ie(e,0,1),n=Ie(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Lo(a,r,t+1/3),this.g=Lo(a,r,t),this.b=Lo(a,r,t-1/3)}return ie.toWorkingColorSpace(this,s),this}setStyle(t,e=Ne){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ne){const n=ld[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=pi(t.r),this.g=pi(t.g),this.b=pi(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ne){return ie.fromWorkingColorSpace(qe.copy(this),t),Math.round(Ie(qe.r*255,0,255))*65536+Math.round(Ie(qe.g*255,0,255))*256+Math.round(Ie(qe.b*255,0,255))}getHexString(t=Ne){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.fromWorkingColorSpace(qe.copy(this),e);const n=qe.r,s=qe.g,r=qe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ie.workingColorSpace){return ie.fromWorkingColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=Ne){ie.fromWorkingColorSpace(qe.copy(this),t);const e=qe.r,n=qe.g,s=qe.b;return t!==Ne?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(wi),this.setHSL(wi.h+t,wi.s+e,wi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(wi),t.getHSL(ra);const n=Pr(wi.h,ra.h,e),s=Pr(wi.s,ra.s,e),r=Pr(wi.l,ra.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qe=new zt;zt.NAMES=ld;let Tm=0;class Un extends ji{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Nn(),this.name="",this.blending=Bs,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pc,this.blendDst=mc,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ps,this.stencilZFail=ps,this.stencilZPass=ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bs&&(n.blending=this.blending),this.side!==mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pc&&(n.blendSrc=this.blendSrc),this.blendDst!==mc&&(n.blendDst=this.blendDst),this.blendEquation!==rs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ps&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ps&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ps&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class je extends Un{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const aa=Em();function Em(){const i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,u=0;for(;!(l&8388608);)l<<=1,u-=8388608;l&=-8388609,u+=947912704,r[c]=l|u}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function Rm(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Ie(i,-65504,65504),aa.floatView[0]=i;const t=aa.uint32View[0],e=t>>23&511;return aa.baseTable[e]+((t&8388607)>>aa.shiftTable[e])}const Cm={toHalfFloat:Rm},Le=new B,oa=new St;class xe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Jc,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)oa.fromBufferAttribute(this,e),oa.applyMatrix3(t),this.setXY(e,oa.x,oa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Jc&&(t.usage=this.usage),t}}class ud extends xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class hd extends xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Vt extends xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Pm=0;const gn=new Ut,Do=new Te,As=new B,fn=new _i,pr=new _i,We=new B;class le extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ad(t)?hd:ud)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return Do.lookAt(t),Do.updateMatrix(),this.applyMatrix4(Do.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Vt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ln);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];pr.setFromBufferAttribute(o),this.morphTargetsRelative?(We.addVectors(fn.min,pr.min),fn.expandByPoint(We),We.addVectors(fn.max,pr.max),fn.expandByPoint(We)):(fn.expandByPoint(pr.min),fn.expandByPoint(pr.max))}fn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)We.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(We));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)We.fromBufferAttribute(o,l),c&&(As.fromBufferAttribute(t,l),We.add(As)),s=Math.max(s,n.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let z=0;z<n.count;z++)o[z]=new B,c[z]=new B;const l=new B,u=new B,h=new B,d=new St,f=new St,g=new St,x=new B,m=new B;function p(z,b,E){l.fromBufferAttribute(n,z),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,E),d.fromBufferAttribute(r,z),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,E),u.sub(l),h.sub(l),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(I),o[z].add(x),o[b].add(x),o[E].add(x),c[z].add(m),c[b].add(m),c[E].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let z=0,b=y.length;z<b;++z){const E=y[z],I=E.start,X=E.count;for(let W=I,q=I+X;W<q;W+=3)p(t.getX(W+0),t.getX(W+1),t.getX(W+2))}const v=new B,_=new B,A=new B,w=new B;function C(z){A.fromBufferAttribute(s,z),w.copy(A);const b=o[z];v.copy(b),v.sub(A.multiplyScalar(A.dot(b))).normalize(),_.crossVectors(w,b);const I=_.dot(c[z])<0?-1:1;a.setXYZW(z,v.x,v.y,v.z,I)}for(let z=0,b=y.length;z<b;++z){const E=y[z],I=E.start,X=E.count;for(let W=I,q=I+X;W<q;W+=3)C(t.getX(W+0)),C(t.getX(W+1)),C(t.getX(W+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new B,r=new B,a=new B,o=new B,c=new B,l=new B,u=new B,h=new B;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new xe(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new le,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zu=new Ut,Zi=new ir,ca=new ln,Nu=new B,la=new B,ua=new B,ha=new B,zo=new B,fa=new B,Uu=new B,da=new B;class ne extends Te{constructor(t=new le,e=new je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){fa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(zo.fromBufferAttribute(h,t),a?fa.addScaledVector(zo,u):fa.addScaledVector(zo.sub(e),u))}e.add(fa)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ca.copy(n.boundingSphere),ca.applyMatrix4(r),Zi.copy(t.ray).recast(t.near),!(ca.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(ca,Nu)===null||Zi.origin.distanceToSquared(Nu)>(t.far-t.near)**2))&&(zu.copy(r).invert(),Zi.copy(t.ray).applyMatrix4(zu),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,A=v;_<A;_+=3){const w=o.getX(_),C=o.getX(_+1),z=o.getX(_+2);s=pa(this,p,t,n,l,u,h,w,C,z),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=o.getX(m),v=o.getX(m+1),_=o.getX(m+2);s=pa(this,a,t,n,l,u,h,y,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,A=v;_<A;_+=3){const w=_,C=_+1,z=_+2;s=pa(this,p,t,n,l,u,h,w,C,z),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=m,v=m+1,_=m+2;s=pa(this,a,t,n,l,u,h,y,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Im(i,t,e,n,s,r,a,o){let c;if(t.side===nn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===mi,o),c===null)return null;da.copy(o),da.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(da);return l<e.near||l>e.far?null:{distance:l,point:da.clone(),object:i}}function pa(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,la),i.getVertexPosition(c,ua),i.getVertexPosition(l,ha);const u=Im(i,t,e,n,la,ua,ha,Uu);if(u){const h=new B;Dn.getBarycoord(Uu,la,ua,ha,h),s&&(u.uv=Dn.getInterpolatedAttribute(s,o,c,l,h,new St)),r&&(u.uv1=Dn.getInterpolatedAttribute(r,o,c,l,h,new St)),a&&(u.normal=Dn.getInterpolatedAttribute(a,o,c,l,h,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new B,materialIndex:0};Dn.getNormal(la,ua,ha,d.normal),u.face=d,u.barycoord=h}return u}class jn extends le{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(h,2));function g(x,m,p,y,v,_,A,w,C,z,b){const E=_/C,I=A/z,X=_/2,W=A/2,q=w/2,M=C+1,S=z+1;let R=0,T=0;const k=new B;for(let F=0;F<S;F++){const P=F*I-W;for(let N=0;N<M;N++){const j=N*E-X;k[x]=j*y,k[m]=P*v,k[p]=q,l.push(k.x,k.y,k.z),k[x]=0,k[m]=0,k[p]=w>0?1:-1,u.push(k.x,k.y,k.z),h.push(N/C),h.push(1-F/z),R+=1}}for(let F=0;F<z;F++)for(let P=0;P<C;P++){const N=d+P+M*F,j=d+P+M*(F+1),H=d+(P+1)+M*(F+1),V=d+(P+1)+M*F;c.push(N,j,V),c.push(j,H,V),T+=6}o.addGroup(f,T,b),f+=T,d+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function $s(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Qe(i){const t={};for(let e=0;e<i.length;e++){const n=$s(i[e]);for(const s in n)t[s]=n[s]}return t}function Lm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function fd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}const Dm={clone:$s,merge:Qe};var zm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kn extends Un{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zm,this.fragmentShader=Nm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=$s(t.uniforms),this.uniformsGroups=Lm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class dd extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=li}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ti=new B,ku=new St,Ou=new St;class tn extends dd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Zs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Cr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(Cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ti.x,Ti.y).multiplyScalar(-t/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-t/Ti.z)}getViewSize(t,e){return this.getViewBounds(t,ku,Ou),e.subVectors(Ou,ku)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Cr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ws=-90,Ts=1;class Um extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new tn(ws,Ts,t,e);s.layers=this.layers,this.add(s);const r=new tn(ws,Ts,t,e);r.layers=this.layers,this.add(r);const a=new tn(ws,Ts,t,e);a.layers=this.layers,this.add(a);const o=new tn(ws,Ts,t,e);o.layers=this.layers,this.add(o);const c=new tn(ws,Ts,t,e);c.layers=this.layers,this.add(c);const l=new tn(ws,Ts,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===li)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===$a)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class pd extends Be{constructor(t,e,n,s,r,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:js,super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class km extends gi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new pd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Fe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new jn(5,5,5),r=new kn({name:"CubemapFromEquirect",uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:Fi});r.uniforms.tEquirect.value=e;const a=new ne(s,r),o=e.minFilter;return e.minFilter===pn&&(e.minFilter=Fe),new Um(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const No=new B,Om=new B,Fm=new qt;class zi{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=No.subVectors(n,e).cross(Om.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(No),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Fm.getNormalMatrix(t),s=this.coplanarPoint(No).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new ln,ma=new B;class Yr{constructor(t=new zi,e=new zi,n=new zi,s=new zi,r=new zi,a=new zi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=li){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],y=s[13],v=s[14],_=s[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+a,d+u,m+g,_+y).normalize(),n[3].setComponents(c-a,d-u,m-g,_-y).normalize(),n[4].setComponents(c-o,d-h,m-x,_-v).normalize(),e===li)n[5].setComponents(c+o,d+h,m+x,_+v).normalize();else if(e===$a)n[5].setComponents(o,h,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(t){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(t.matrixWorld),this.intersectsSphere($i)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ma.x=s.normal.x>0?t.max.x:t.min.x,ma.y=s.normal.y>0?t.max.y:t.min.y,ma.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ma)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function md(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Bm(i){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const x=h[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class bn extends le{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=t/o,d=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const y=p*d-a;for(let v=0;v<l;v++){const _=v*h-r;g.push(_,-y,0),x.push(0,0,1),m.push(v/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const v=y+l*p,_=y+l*(p+1),A=y+1+l*(p+1),w=y+1+l*p;f.push(v,_,w),f.push(_,A,w)}this.setIndex(f),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Hm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gm=`#ifdef USE_ALPHAHASH
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
#endif`,Vm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ym=`#ifdef USE_AOMAP
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
#endif`,Km=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qm=`#ifdef USE_BATCHING
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
#endif`,Zm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,t0=`#ifdef USE_IRIDESCENCE
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
#endif`,e0=`#ifdef USE_BUMPMAP
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
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,c0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,u0=`#define PI 3.141592653589793
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
} // validated`,h0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,f0=`vec3 transformedNormal = objectNormal;
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
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,p0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,m0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,g0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,x0="gl_FragColor = linearToOutputTexel( gl_FragColor );",_0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,v0=`#ifdef USE_ENVMAP
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
#endif`,y0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,M0=`#ifdef USE_ENVMAP
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
#endif`,b0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,S0=`#ifdef USE_ENVMAP
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
#endif`,A0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,w0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,T0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,E0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,R0=`#ifdef USE_GRADIENTMAP
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
}`,C0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,P0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,L0=`uniform bool receiveShadow;
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
#endif`,D0=`#ifdef USE_ENVMAP
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
#endif`,z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,N0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,U0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,k0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O0=`PhysicalMaterial material;
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
#endif`,F0=`struct PhysicalMaterial {
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
}`,B0=`
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
#endif`,H0=`#if defined( RE_IndirectDiffuse )
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
#endif`,G0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,W0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Y0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,K0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,q0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Z0=`#if defined( USE_POINTS_UV )
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
#endif`,$0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Q0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ng=`#ifdef USE_MORPHTARGETS
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
#endif`,ig=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ag=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,og=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lg=`#ifdef USE_NORMALMAP
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
#endif`,ug=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_g=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ag=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wg=`float getShadowMask() {
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
}`,Tg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Eg=`#ifdef USE_SKINNING
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
#endif`,Rg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cg=`#ifdef USE_SKINNING
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
#endif`,Pg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ig=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zg=`#ifdef USE_TRANSMISSION
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
#endif`,Ng=`#ifdef USE_TRANSMISSION
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
#endif`,Ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hg=`uniform sampler2D t2D;
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
}`,Gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jg=`#include <common>
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
}`,Yg=`#if DEPTH_PACKING == 3200
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
}`,Kg=`#define DISTANCE
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
}`,qg=`#define DISTANCE
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
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$g=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jg=`uniform float scale;
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
}`,Qg=`uniform vec3 diffuse;
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
}`,tx=`#include <common>
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
}`,ex=`uniform vec3 diffuse;
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
}`,nx=`#define LAMBERT
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
}`,ix=`#define LAMBERT
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
}`,sx=`#define MATCAP
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
}`,rx=`#define MATCAP
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
}`,ax=`#define NORMAL
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
}`,ox=`#define NORMAL
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
}`,cx=`#define PHONG
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
}`,lx=`#define PHONG
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
}`,ux=`#define STANDARD
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
}`,hx=`#define STANDARD
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
}`,fx=`#define TOON
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
}`,dx=`#define TOON
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
}`,px=`uniform float size;
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
}`,mx=`uniform vec3 diffuse;
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
}`,gx=`#include <common>
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
}`,xx=`uniform vec3 color;
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
}`,_x=`uniform float rotation;
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
}`,vx=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:Hm,alphahash_pars_fragment:Gm,alphamap_fragment:Vm,alphamap_pars_fragment:Wm,alphatest_fragment:Xm,alphatest_pars_fragment:jm,aomap_fragment:Ym,aomap_pars_fragment:Km,batching_pars_vertex:qm,batching_vertex:Zm,begin_vertex:$m,beginnormal_vertex:Jm,bsdfs:Qm,iridescence_fragment:t0,bumpmap_pars_fragment:e0,clipping_planes_fragment:n0,clipping_planes_pars_fragment:i0,clipping_planes_pars_vertex:s0,clipping_planes_vertex:r0,color_fragment:a0,color_pars_fragment:o0,color_pars_vertex:c0,color_vertex:l0,common:u0,cube_uv_reflection_fragment:h0,defaultnormal_vertex:f0,displacementmap_pars_vertex:d0,displacementmap_vertex:p0,emissivemap_fragment:m0,emissivemap_pars_fragment:g0,colorspace_fragment:x0,colorspace_pars_fragment:_0,envmap_fragment:v0,envmap_common_pars_fragment:y0,envmap_pars_fragment:M0,envmap_pars_vertex:b0,envmap_physical_pars_fragment:D0,envmap_vertex:S0,fog_vertex:A0,fog_pars_vertex:w0,fog_fragment:T0,fog_pars_fragment:E0,gradientmap_pars_fragment:R0,lightmap_pars_fragment:C0,lights_lambert_fragment:P0,lights_lambert_pars_fragment:I0,lights_pars_begin:L0,lights_toon_fragment:z0,lights_toon_pars_fragment:N0,lights_phong_fragment:U0,lights_phong_pars_fragment:k0,lights_physical_fragment:O0,lights_physical_pars_fragment:F0,lights_fragment_begin:B0,lights_fragment_maps:H0,lights_fragment_end:G0,logdepthbuf_fragment:V0,logdepthbuf_pars_fragment:W0,logdepthbuf_pars_vertex:X0,logdepthbuf_vertex:j0,map_fragment:Y0,map_pars_fragment:K0,map_particle_fragment:q0,map_particle_pars_fragment:Z0,metalnessmap_fragment:$0,metalnessmap_pars_fragment:J0,morphinstance_vertex:Q0,morphcolor_vertex:tg,morphnormal_vertex:eg,morphtarget_pars_vertex:ng,morphtarget_vertex:ig,normal_fragment_begin:sg,normal_fragment_maps:rg,normal_pars_fragment:ag,normal_pars_vertex:og,normal_vertex:cg,normalmap_pars_fragment:lg,clearcoat_normal_fragment_begin:ug,clearcoat_normal_fragment_maps:hg,clearcoat_pars_fragment:fg,iridescence_pars_fragment:dg,opaque_fragment:pg,packing:mg,premultiplied_alpha_fragment:gg,project_vertex:xg,dithering_fragment:_g,dithering_pars_fragment:vg,roughnessmap_fragment:yg,roughnessmap_pars_fragment:Mg,shadowmap_pars_fragment:bg,shadowmap_pars_vertex:Sg,shadowmap_vertex:Ag,shadowmask_pars_fragment:wg,skinbase_vertex:Tg,skinning_pars_vertex:Eg,skinning_vertex:Rg,skinnormal_vertex:Cg,specularmap_fragment:Pg,specularmap_pars_fragment:Ig,tonemapping_fragment:Lg,tonemapping_pars_fragment:Dg,transmission_fragment:zg,transmission_pars_fragment:Ng,uv_pars_fragment:Ug,uv_pars_vertex:kg,uv_vertex:Og,worldpos_vertex:Fg,background_vert:Bg,background_frag:Hg,backgroundCube_vert:Gg,backgroundCube_frag:Vg,cube_vert:Wg,cube_frag:Xg,depth_vert:jg,depth_frag:Yg,distanceRGBA_vert:Kg,distanceRGBA_frag:qg,equirect_vert:Zg,equirect_frag:$g,linedashed_vert:Jg,linedashed_frag:Qg,meshbasic_vert:tx,meshbasic_frag:ex,meshlambert_vert:nx,meshlambert_frag:ix,meshmatcap_vert:sx,meshmatcap_frag:rx,meshnormal_vert:ax,meshnormal_frag:ox,meshphong_vert:cx,meshphong_frag:lx,meshphysical_vert:ux,meshphysical_frag:hx,meshtoon_vert:fx,meshtoon_frag:dx,points_vert:px,points_frag:mx,shadow_vert:gx,shadow_frag:xx,sprite_vert:_x,sprite_frag:vx},Rt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},Vn={basic:{uniforms:Qe([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Qe([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new zt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Qe([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Qe([Rt.common,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.roughnessmap,Rt.metalnessmap,Rt.fog,Rt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Qe([Rt.common,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.gradientmap,Rt.fog,Rt.lights,{emissive:{value:new zt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Qe([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Qe([Rt.points,Rt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Qe([Rt.common,Rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Qe([Rt.common,Rt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Qe([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Qe([Rt.sprite,Rt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Qe([Rt.common,Rt.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Qe([Rt.lights,Rt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};Vn.physical={uniforms:Qe([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const ga={r:0,b:0,g:0},Ji=new rn,yx=new Ut;function Mx(i,t,e,n,s,r,a){const o=new zt(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function x(y){let v=!1;const _=g(y);_===null?p(o,c):_&&_.isColor&&(p(_,1),v=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,v){const _=g(v);_&&(_.isCubeTexture||_.mapping===io)?(u===void 0&&(u=new ne(new jn(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:$s(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ji.copy(v.backgroundRotation),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(yx.makeRotationFromEuler(Ji)),u.material.toneMapped=ie.getTransfer(_.colorSpace)!==me,(h!==_||d!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ne(new bn(2,2),new kn({name:"BackgroundMaterial",uniforms:$s(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ie.getTransfer(_.colorSpace)!==me,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,v){y.getRGB(ga,fd(i)),n.buffers.color.setClear(ga.r,ga.g,ga.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:x,addToRenderList:m}}function bx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(E,I,X,W,q){let M=!1;const S=h(W,X,I);r!==S&&(r=S,l(r.object)),M=f(E,W,X,q),M&&g(E,W,X,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(M||a)&&(a=!1,_(E,I,X,W),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function c(){return i.createVertexArray()}function l(E){return i.bindVertexArray(E)}function u(E){return i.deleteVertexArray(E)}function h(E,I,X){const W=X.wireframe===!0;let q=n[E.id];q===void 0&&(q={},n[E.id]=q);let M=q[I.id];M===void 0&&(M={},q[I.id]=M);let S=M[W];return S===void 0&&(S=d(c()),M[W]=S),S}function d(E){const I=[],X=[],W=[];for(let q=0;q<e;q++)I[q]=0,X[q]=0,W[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:X,attributeDivisors:W,object:E,attributes:{},index:null}}function f(E,I,X,W){const q=r.attributes,M=I.attributes;let S=0;const R=X.getAttributes();for(const T in R)if(R[T].location>=0){const F=q[T];let P=M[T];if(P===void 0&&(T==="instanceMatrix"&&E.instanceMatrix&&(P=E.instanceMatrix),T==="instanceColor"&&E.instanceColor&&(P=E.instanceColor)),F===void 0||F.attribute!==P||P&&F.data!==P.data)return!0;S++}return r.attributesNum!==S||r.index!==W}function g(E,I,X,W){const q={},M=I.attributes;let S=0;const R=X.getAttributes();for(const T in R)if(R[T].location>=0){let F=M[T];F===void 0&&(T==="instanceMatrix"&&E.instanceMatrix&&(F=E.instanceMatrix),T==="instanceColor"&&E.instanceColor&&(F=E.instanceColor));const P={};P.attribute=F,F&&F.data&&(P.data=F.data),q[T]=P,S++}r.attributes=q,r.attributesNum=S,r.index=W}function x(){const E=r.newAttributes;for(let I=0,X=E.length;I<X;I++)E[I]=0}function m(E){p(E,0)}function p(E,I){const X=r.newAttributes,W=r.enabledAttributes,q=r.attributeDivisors;X[E]=1,W[E]===0&&(i.enableVertexAttribArray(E),W[E]=1),q[E]!==I&&(i.vertexAttribDivisor(E,I),q[E]=I)}function y(){const E=r.newAttributes,I=r.enabledAttributes;for(let X=0,W=I.length;X<W;X++)I[X]!==E[X]&&(i.disableVertexAttribArray(X),I[X]=0)}function v(E,I,X,W,q,M,S){S===!0?i.vertexAttribIPointer(E,I,X,q,M):i.vertexAttribPointer(E,I,X,W,q,M)}function _(E,I,X,W){x();const q=W.attributes,M=X.getAttributes(),S=I.defaultAttributeValues;for(const R in M){const T=M[R];if(T.location>=0){let k=q[R];if(k===void 0&&(R==="instanceMatrix"&&E.instanceMatrix&&(k=E.instanceMatrix),R==="instanceColor"&&E.instanceColor&&(k=E.instanceColor)),k!==void 0){const F=k.normalized,P=k.itemSize,N=t.get(k);if(N===void 0)continue;const j=N.buffer,H=N.type,V=N.bytesPerElement,tt=H===i.INT||H===i.UNSIGNED_INT||k.gpuType===xl;if(k.isInterleavedBufferAttribute){const Y=k.data,K=Y.stride,it=k.offset;if(Y.isInstancedInterleavedBuffer){for(let G=0;G<T.locationSize;G++)p(T.location+G,Y.meshPerAttribute);E.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let G=0;G<T.locationSize;G++)m(T.location+G);i.bindBuffer(i.ARRAY_BUFFER,j);for(let G=0;G<T.locationSize;G++)v(T.location+G,P/T.locationSize,H,F,K*V,(it+P/T.locationSize*G)*V,tt)}else{if(k.isInstancedBufferAttribute){for(let Y=0;Y<T.locationSize;Y++)p(T.location+Y,k.meshPerAttribute);E.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let Y=0;Y<T.locationSize;Y++)m(T.location+Y);i.bindBuffer(i.ARRAY_BUFFER,j);for(let Y=0;Y<T.locationSize;Y++)v(T.location+Y,P/T.locationSize,H,F,P*V,P/T.locationSize*Y*V,tt)}}else if(S!==void 0){const F=S[R];if(F!==void 0)switch(F.length){case 2:i.vertexAttrib2fv(T.location,F);break;case 3:i.vertexAttrib3fv(T.location,F);break;case 4:i.vertexAttrib4fv(T.location,F);break;default:i.vertexAttrib1fv(T.location,F)}}}}y()}function A(){z();for(const E in n){const I=n[E];for(const X in I){const W=I[X];for(const q in W)u(W[q].object),delete W[q];delete I[X]}delete n[E]}}function w(E){if(n[E.id]===void 0)return;const I=n[E.id];for(const X in I){const W=I[X];for(const q in W)u(W[q].object),delete W[q];delete I[X]}delete n[E.id]}function C(E){for(const I in n){const X=n[I];if(X[E.id]===void 0)continue;const W=X[E.id];for(const q in W)u(W[q].object),delete W[q];delete X[E.id]}}function z(){b(),a=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:z,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function Sx(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];e.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Ax(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Xe&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const z=C===nr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Mn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==yn&&!z)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:A,maxSamples:w}}function wx(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new zi,o=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const y=r?0:n,v=y*4;let _=p.clippingState||null;c.value=_,_=u(g,d,v,f);for(let A=0;A!==v;++A)_[A]=e[A];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=f+x*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,_=f;v!==x;++v,_+=4)a.copy(h[v]).applyMatrix4(y,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Tx(i){let t=new WeakMap;function e(a,o){return o===Sc?a.mapping=js:o===Ac&&(a.mapping=Ys),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Sc||o===Ac)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new km(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class ro extends dd{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ns=4,Fu=[.125,.215,.35,.446,.526,.582],as=20,Uo=new ro,Bu=new zt;let ko=null,Oo=0,Fo=0,Bo=!1;const ss=(1+Math.sqrt(5))/2,Es=1/ss,Hu=[new B(-ss,Es,0),new B(ss,Es,0),new B(-Es,0,ss),new B(Es,0,ss),new B(0,ss,-Es),new B(0,ss,Es),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class Gu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){ko=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),Fo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ko,Oo,Fo),this._renderer.xr.enabled=Bo,t.scissorTest=!1,xa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===js||t.mapping===Ys?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ko=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),Fo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:nr,format:Xe,colorSpace:sn,depthBuffer:!1},s=Vu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ex(r)),this._blurMaterial=Rx(r,t,e)}return s}_compileMaterial(t){const e=new ne(this._lodPlanes[0],t);this._renderer.compile(e,Uo)}_sceneToCubeUV(t,e,n,s){const o=new tn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Bu),u.toneMapping=Bi,u.autoClear=!1;const f=new je({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),g=new ne(new jn,f);let x=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(Bu),x=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):y===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const v=this._cubeSize;xa(s,y*v,p>2?v:0,v,v),u.setRenderTarget(s),x&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===js||t.mapping===Ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ne(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;xa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Uo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Hu[(s-r-1)%Hu.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ne(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*as-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):as;m>as&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${as}`);const p=[];let y=0;for(let C=0;C<as;++C){const z=C/x,b=Math.exp(-z*z/2);p.push(b),C===0?y+=b:C<m&&(y+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const _=this._sizeLods[s],A=3*_*(s>v-Ns?s-v+Ns:0),w=4*(this._cubeSize-_);xa(e,A,w,3*_,2*_),c.setRenderTarget(e),c.render(h,Uo)}}function Ex(i){const t=[],e=[],n=[];let s=i;const r=i-Ns+1+Fu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Ns?c=Fu[a-i+Ns-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,m=2,p=1,y=new Float32Array(x*g*f),v=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let w=0;w<f;w++){const C=w%3*2/3-1,z=w>2?0:-1,b=[C,z,0,C+2/3,z,0,C+2/3,z+1,0,C,z,0,C+2/3,z+1,0,C,z+1,0];y.set(b,x*g*w),v.set(d,m*g*w);const E=[w,w,w,w,w,w];_.set(E,p*g*w)}const A=new le;A.setAttribute("position",new xe(y,x)),A.setAttribute("uv",new xe(v,m)),A.setAttribute("faceIndex",new xe(_,p)),t.push(A),s>Ns&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Vu(i,t,e){const n=new gi(i,t,e);return n.texture.mapping=io,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xa(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Rx(i,t,e){const n=new Float32Array(as),s=new B(0,1,0);return new kn({name:"SphericalGaussianBlur",defines:{n:as,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pl(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Wu(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pl(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Xu(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Pl(){return`

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
	`}function Cx(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Sc||c===Ac,u=c===js||c===Ys;if(l||u){let h=t.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Gu(i)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new Gu(i)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Px(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ar("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ix(i,t,e,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const x=f[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],i.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let x=0;if(f!==null){const y=f.array;x=f.version;for(let v=0,_=y.length;v<_;v+=3){const A=y[v+0],w=y[v+1],C=y[v+2];d.push(A,w,w,C,C,A)}}else if(g!==void 0){const y=g.array;x=g.version;for(let v=0,_=y.length/3-1;v<_;v+=3){const A=v+0,w=v+1,C=v+2;d.push(A,w,w,C,C,A)}}else return;const m=new(ad(d)?hd:ud)(d,1);m.version=x;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Lx(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function u(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function h(d,f,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*x[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Dx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zx(i,t,e){const n=new WeakMap,s=new ee;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let E=function(){z.dispose(),n.delete(o),o.removeEventListener("dispose",E)};var f=E;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),x===!0&&(_=2),m===!0&&(_=3);let A=o.attributes.position.count*_,w=1;A>t.maxTextureSize&&(w=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const C=new Float32Array(A*w*4*h),z=new cd(C,A,w,h);z.type=yn,z.needsUpdate=!0;const b=_*4;for(let I=0;I<h;I++){const X=p[I],W=y[I],q=v[I],M=A*w*4*I;for(let S=0;S<X.count;S++){const R=S*b;g===!0&&(s.fromBufferAttribute(X,S),C[M+R+0]=s.x,C[M+R+1]=s.y,C[M+R+2]=s.z,C[M+R+3]=0),x===!0&&(s.fromBufferAttribute(W,S),C[M+R+4]=s.x,C[M+R+5]=s.y,C[M+R+6]=s.z,C[M+R+7]=0),m===!0&&(s.fromBufferAttribute(q,S),C[M+R+8]=s.x,C[M+R+9]=s.y,C[M+R+10]=s.z,C[M+R+11]=q.itemSize===4?s.w:1)}}d={count:h,texture:z,size:new St(A,w)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Nx(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class gd extends Be{constructor(t,e,n,s,r,a,o,c,l,u=Hs){if(u!==Hs&&u!==qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Hs&&(n=ls),n===void 0&&u===qs&&(n=Ks),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ye,this.minFilter=c!==void 0?c:Ye,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const xd=new Be,ju=new gd(1,1),_d=new cd,vd=new _m,yd=new pd,Yu=[],Ku=[],qu=new Float32Array(16),Zu=new Float32Array(9),$u=new Float32Array(4);function sr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Yu[s];if(r===void 0&&(r=new Float32Array(s),Yu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function He(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ge(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ao(i,t){let e=Ku[t];e===void 0&&(e=new Int32Array(t),Ku[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ux(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2fv(this.addr,t),Ge(e,t)}}function Ox(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;i.uniform3fv(this.addr,t),Ge(e,t)}}function Fx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4fv(this.addr,t),Ge(e,t)}}function Bx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ge(e,t)}else{if(He(e,n))return;$u.set(n),i.uniformMatrix2fv(this.addr,!1,$u),Ge(e,n)}}function Hx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ge(e,t)}else{if(He(e,n))return;Zu.set(n),i.uniformMatrix3fv(this.addr,!1,Zu),Ge(e,n)}}function Gx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ge(e,t)}else{if(He(e,n))return;qu.set(n),i.uniformMatrix4fv(this.addr,!1,qu),Ge(e,n)}}function Vx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Wx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2iv(this.addr,t),Ge(e,t)}}function Xx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;i.uniform3iv(this.addr,t),Ge(e,t)}}function jx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4iv(this.addr,t),Ge(e,t)}}function Yx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2uiv(this.addr,t),Ge(e,t)}}function qx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;i.uniform3uiv(this.addr,t),Ge(e,t)}}function Zx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4uiv(this.addr,t),Ge(e,t)}}function $x(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ju.compareFunction=rd,r=ju):r=xd,e.setTexture2D(t||r,s)}function Jx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||vd,s)}function Qx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||yd,s)}function t_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||_d,s)}function e_(i){switch(i){case 5126:return Ux;case 35664:return kx;case 35665:return Ox;case 35666:return Fx;case 35674:return Bx;case 35675:return Hx;case 35676:return Gx;case 5124:case 35670:return Vx;case 35667:case 35671:return Wx;case 35668:case 35672:return Xx;case 35669:case 35673:return jx;case 5125:return Yx;case 36294:return Kx;case 36295:return qx;case 36296:return Zx;case 35678:case 36198:case 36298:case 36306:case 35682:return $x;case 35679:case 36299:case 36307:return Jx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return t_}}function n_(i,t){i.uniform1fv(this.addr,t)}function i_(i,t){const e=sr(t,this.size,2);i.uniform2fv(this.addr,e)}function s_(i,t){const e=sr(t,this.size,3);i.uniform3fv(this.addr,e)}function r_(i,t){const e=sr(t,this.size,4);i.uniform4fv(this.addr,e)}function a_(i,t){const e=sr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function o_(i,t){const e=sr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function c_(i,t){const e=sr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function l_(i,t){i.uniform1iv(this.addr,t)}function u_(i,t){i.uniform2iv(this.addr,t)}function h_(i,t){i.uniform3iv(this.addr,t)}function f_(i,t){i.uniform4iv(this.addr,t)}function d_(i,t){i.uniform1uiv(this.addr,t)}function p_(i,t){i.uniform2uiv(this.addr,t)}function m_(i,t){i.uniform3uiv(this.addr,t)}function g_(i,t){i.uniform4uiv(this.addr,t)}function x_(i,t,e){const n=this.cache,s=t.length,r=ao(e,s);He(n,r)||(i.uniform1iv(this.addr,r),Ge(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||xd,r[a])}function __(i,t,e){const n=this.cache,s=t.length,r=ao(e,s);He(n,r)||(i.uniform1iv(this.addr,r),Ge(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||vd,r[a])}function v_(i,t,e){const n=this.cache,s=t.length,r=ao(e,s);He(n,r)||(i.uniform1iv(this.addr,r),Ge(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||yd,r[a])}function y_(i,t,e){const n=this.cache,s=t.length,r=ao(e,s);He(n,r)||(i.uniform1iv(this.addr,r),Ge(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||_d,r[a])}function M_(i){switch(i){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return a_;case 35675:return o_;case 35676:return c_;case 5124:case 35670:return l_;case 35667:case 35671:return u_;case 35668:case 35672:return h_;case 35669:case 35673:return f_;case 5125:return d_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return __;case 35680:case 36300:case 36308:case 36293:return v_;case 36289:case 36303:case 36311:case 36292:return y_}}class b_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=e_(e.type)}}class S_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=M_(e.type)}}class A_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ho=/(\w+)(\])?(\[|\.)?/g;function Ju(i,t){i.seq.push(t),i.map[t.id]=t}function w_(i,t,e){const n=i.name,s=n.length;for(Ho.lastIndex=0;;){const r=Ho.exec(n),a=Ho.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ju(e,l===void 0?new b_(o,i,t):new S_(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new A_(o),Ju(e,h)),e=h}}}class Ya{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);w_(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Qu(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const T_=37297;let E_=0;function R_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const th=new qt;function C_(i){ie._getMatrix(th,ie.workingColorSpace,i);const t=`mat3( ${th.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(i)){case so:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function eh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+R_(i.getShaderSource(t),a)}else return s}function P_(i,t){const e=C_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function I_(i,t){let e;switch(t){case Rp:e="Linear";break;case Cp:e="Reinhard";break;case Pp:e="Cineon";break;case jf:e="ACESFilmic";break;case Lp:e="AgX";break;case Dp:e="Neutral";break;case Ip:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _a=new B;function L_(){ie.getLuminanceCoefficients(_a);const i=_a.x.toFixed(4),t=_a.y.toFixed(4),e=_a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function D_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wr).join(`
`)}function z_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function N_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function wr(i){return i!==""}function nh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ih(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const U_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qc(i){return i.replace(U_,O_)}const k_=new Map;function O_(i,t){let e=$t[t];if(e===void 0){const n=k_.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qc(e)}const F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sh(i){return i.replace(F_,B_)}function B_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function H_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ml?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ai&&(t="SHADOWMAP_TYPE_VSM"),t}function G_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case js:case Ys:t="ENVMAP_TYPE_CUBE";break;case io:t="ENVMAP_TYPE_CUBE_UV";break}return t}function V_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ys:t="ENVMAP_MODE_REFRACTION";break}return t}function W_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case gl:t="ENVMAP_BLENDING_MULTIPLY";break;case Tp:t="ENVMAP_BLENDING_MIX";break;case Ep:t="ENVMAP_BLENDING_ADD";break}return t}function X_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function j_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=H_(e),l=G_(e),u=V_(e),h=W_(e),d=X_(e),f=D_(e),g=z_(r),x=s.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(wr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(wr).join(`
`),p.length>0&&(p+=`
`)):(m=[rh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wr).join(`
`),p=[rh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bi?"#define TONE_MAPPING":"",e.toneMapping!==Bi?$t.tonemapping_pars_fragment:"",e.toneMapping!==Bi?I_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,P_("linearToOutputTexel",e.outputColorSpace),L_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(wr).join(`
`)),a=Qc(a),a=nh(a,e),a=ih(a,e),o=Qc(o),o=nh(o,e),o=ih(o,e),a=sh(a),o=sh(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===xu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+m+a,_=y+p+o,A=Qu(s,s.VERTEX_SHADER,v),w=Qu(s,s.FRAGMENT_SHADER,_);s.attachShader(x,A),s.attachShader(x,w),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(I){if(i.debug.checkShaderErrors){const X=s.getProgramInfoLog(x).trim(),W=s.getShaderInfoLog(A).trim(),q=s.getShaderInfoLog(w).trim();let M=!0,S=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(M=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,w);else{const R=eh(s,A,"vertex"),T=eh(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+X+`
`+R+`
`+T)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(W===""||q==="")&&(S=!1);S&&(I.diagnostics={runnable:M,programLog:X,vertexShader:{log:W,prefix:m},fragmentShader:{log:q,prefix:p}})}s.deleteShader(A),s.deleteShader(w),z=new Ya(s,x),b=N_(s,x)}let z;this.getUniforms=function(){return z===void 0&&C(this),z};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(x,T_)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=E_++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}let Y_=0;class K_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new q_(t),e.set(t,n)),n}}class q_{constructor(t){this.id=Y_++,this.code=t,this.usedTimes=0}}function Z_(i,t,e,n,s,r,a){const o=new Cl,c=new K_,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,E,I,X,W){const q=X.fog,M=W.geometry,S=b.isMeshStandardMaterial?X.environment:null,R=(b.isMeshStandardMaterial?e:t).get(b.envMap||S),T=R&&R.mapping===io?R.image.height:null,k=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const F=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,P=F!==void 0?F.length:0;let N=0;M.morphAttributes.position!==void 0&&(N=1),M.morphAttributes.normal!==void 0&&(N=2),M.morphAttributes.color!==void 0&&(N=3);let j,H,V,tt;if(k){const ae=Vn[k];j=ae.vertexShader,H=ae.fragmentShader}else j=b.vertexShader,H=b.fragmentShader,c.update(b),V=c.getVertexShaderID(b),tt=c.getFragmentShaderID(b);const Y=i.getRenderTarget(),K=i.state.buffers.depth.getReversed(),it=W.isInstancedMesh===!0,G=W.isBatchedMesh===!0,ct=!!b.map,at=!!b.matcap,mt=!!R,U=!!b.aoMap,xt=!!b.lightMap,ft=!!b.bumpMap,yt=!!b.normalMap,vt=!!b.displacementMap,Bt=!!b.emissiveMap,Et=!!b.metalnessMap,D=!!b.roughnessMap,L=b.anisotropy>0,J=b.clearcoat>0,st=b.dispersion>0,ht=b.iridescence>0,ut=b.sheen>0,At=b.transmission>0,Mt=L&&!!b.anisotropyMap,Dt=J&&!!b.clearcoatMap,dt=J&&!!b.clearcoatNormalMap,pt=J&&!!b.clearcoatRoughnessMap,_t=ht&&!!b.iridescenceMap,Ct=ht&&!!b.iridescenceThicknessMap,Nt=ut&&!!b.sheenColorMap,Tt=ut&&!!b.sheenRoughnessMap,jt=!!b.specularMap,Wt=!!b.specularColorMap,Gt=!!b.specularIntensityMap,Z=At&&!!b.transmissionMap,wt=At&&!!b.thicknessMap,lt=!!b.gradientMap,gt=!!b.alphaMap,It=b.alphaTest>0,Pt=!!b.alphaHash,Yt=!!b.extensions;let Me=Bi;b.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Me=i.toneMapping);const Ue={shaderID:k,shaderType:b.type,shaderName:b.name,vertexShader:j,fragmentShader:H,defines:b.defines,customVertexShaderID:V,customFragmentShaderID:tt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:G,batchingColor:G&&W._colorsTexture!==null,instancing:it,instancingColor:it&&W.instanceColor!==null,instancingMorph:it&&W.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Y===null?i.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:sn,alphaToCoverage:!!b.alphaToCoverage,map:ct,matcap:at,envMap:mt,envMapMode:mt&&R.mapping,envMapCubeUVHeight:T,aoMap:U,lightMap:xt,bumpMap:ft,normalMap:yt,displacementMap:d&&vt,emissiveMap:Bt,normalMapObjectSpace:yt&&b.normalMapType===Bp,normalMapTangentSpace:yt&&b.normalMapType===El,metalnessMap:Et,roughnessMap:D,anisotropy:L,anisotropyMap:Mt,clearcoat:J,clearcoatMap:Dt,clearcoatNormalMap:dt,clearcoatRoughnessMap:pt,dispersion:st,iridescence:ht,iridescenceMap:_t,iridescenceThicknessMap:Ct,sheen:ut,sheenColorMap:Nt,sheenRoughnessMap:Tt,specularMap:jt,specularColorMap:Wt,specularIntensityMap:Gt,transmission:At,transmissionMap:Z,thicknessMap:wt,gradientMap:lt,opaque:b.transparent===!1&&b.blending===Bs&&b.alphaToCoverage===!1,alphaMap:gt,alphaTest:It,alphaHash:Pt,combine:b.combine,mapUv:ct&&x(b.map.channel),aoMapUv:U&&x(b.aoMap.channel),lightMapUv:xt&&x(b.lightMap.channel),bumpMapUv:ft&&x(b.bumpMap.channel),normalMapUv:yt&&x(b.normalMap.channel),displacementMapUv:vt&&x(b.displacementMap.channel),emissiveMapUv:Bt&&x(b.emissiveMap.channel),metalnessMapUv:Et&&x(b.metalnessMap.channel),roughnessMapUv:D&&x(b.roughnessMap.channel),anisotropyMapUv:Mt&&x(b.anisotropyMap.channel),clearcoatMapUv:Dt&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:dt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&x(b.sheenRoughnessMap.channel),specularMapUv:jt&&x(b.specularMap.channel),specularColorMapUv:Wt&&x(b.specularColorMap.channel),specularIntensityMapUv:Gt&&x(b.specularIntensityMap.channel),transmissionMapUv:Z&&x(b.transmissionMap.channel),thicknessMapUv:wt&&x(b.thicknessMap.channel),alphaMapUv:gt&&x(b.alphaMap.channel),vertexTangents:!!M.attributes.tangent&&(yt||L),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!M.attributes.uv&&(ct||gt),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:K,skinning:W.isSkinnedMesh===!0,morphTargets:M.morphAttributes.position!==void 0,morphNormals:M.morphAttributes.normal!==void 0,morphColors:M.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:N,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Me,decodeVideoTexture:ct&&b.map.isVideoTexture===!0&&ie.getTransfer(b.map.colorSpace)===me,decodeVideoTextureEmissive:Bt&&b.emissiveMap.isVideoTexture===!0&&ie.getTransfer(b.emissiveMap.colorSpace)===me,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===en,flipSided:b.side===nn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Yt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&b.extensions.multiDraw===!0||G)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function p(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)E.push(I),E.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(E,b),v(E,b),E.push(i.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function y(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function v(b,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),b.push(o.mask)}function _(b){const E=g[b.type];let I;if(E){const X=Vn[E];I=Dm.clone(X.uniforms)}else I=b.uniforms;return I}function A(b,E){let I;for(let X=0,W=u.length;X<W;X++){const q=u[X];if(q.cacheKey===E){I=q,++I.usedTimes;break}}return I===void 0&&(I=new j_(i,E,b,r),u.push(I)),I}function w(b){if(--b.usedTimes===0){const E=u.indexOf(b);u[E]=u[u.length-1],u.pop(),b.destroy()}}function C(b){c.remove(b)}function z(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:A,releaseProgram:w,releaseShaderCache:C,programs:u,dispose:z}}function $_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function J_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ah(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function oh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h,d,f,g,x,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=x,p.group=m),t++,p}function o(h,d,f,g,x,m){const p=a(h,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(h,d,f,g,x,m){const p=a(h,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(h,d){e.length>1&&e.sort(h||J_),n.length>1&&n.sort(d||ah),s.length>1&&s.sort(d||ah)}function u(){for(let h=t,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function Q_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new oh,i.set(n,[a])):s>=r.length?(a=new oh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function tv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new zt};break;case"SpotLight":e={position:new B,direction:new B,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new B,halfWidth:new B,halfHeight:new B};break}return i[t.id]=e,e}}}function ev(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let nv=0;function iv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function sv(i){const t=new tv,e=ev(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const s=new B,r=new Ut,a=new Ut;function o(l){let u=0,h=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,y=0,v=0,_=0,A=0,w=0,C=0;l.sort(iv);for(let b=0,E=l.length;b<E;b++){const I=l[b],X=I.color,W=I.intensity,q=I.distance,M=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=X.r*W,h+=X.g*W,d+=X.b*W;else if(I.isLightProbe){for(let S=0;S<9;S++)n.probe[S].addScaledVector(I.sh.coefficients[S],W);C++}else if(I.isDirectionalLight){const S=t.get(I);if(S.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const R=I.shadow,T=e.get(I);T.shadowIntensity=R.intensity,T.shadowBias=R.bias,T.shadowNormalBias=R.normalBias,T.shadowRadius=R.radius,T.shadowMapSize=R.mapSize,n.directionalShadow[f]=T,n.directionalShadowMap[f]=M,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=S,f++}else if(I.isSpotLight){const S=t.get(I);S.position.setFromMatrixPosition(I.matrixWorld),S.color.copy(X).multiplyScalar(W),S.distance=q,S.coneCos=Math.cos(I.angle),S.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),S.decay=I.decay,n.spot[x]=S;const R=I.shadow;if(I.map&&(n.spotLightMap[A]=I.map,A++,R.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[x]=R.matrix,I.castShadow){const T=e.get(I);T.shadowIntensity=R.intensity,T.shadowBias=R.bias,T.shadowNormalBias=R.normalBias,T.shadowRadius=R.radius,T.shadowMapSize=R.mapSize,n.spotShadow[x]=T,n.spotShadowMap[x]=M,_++}x++}else if(I.isRectAreaLight){const S=t.get(I);S.color.copy(X).multiplyScalar(W),S.halfWidth.set(I.width*.5,0,0),S.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=S,m++}else if(I.isPointLight){const S=t.get(I);if(S.color.copy(I.color).multiplyScalar(I.intensity),S.distance=I.distance,S.decay=I.decay,I.castShadow){const R=I.shadow,T=e.get(I);T.shadowIntensity=R.intensity,T.shadowBias=R.bias,T.shadowNormalBias=R.normalBias,T.shadowRadius=R.radius,T.shadowMapSize=R.mapSize,T.shadowCameraNear=R.camera.near,T.shadowCameraFar=R.camera.far,n.pointShadow[g]=T,n.pointShadowMap[g]=M,n.pointShadowMatrix[g]=I.shadow.matrix,v++}n.point[g]=S,g++}else if(I.isHemisphereLight){const S=t.get(I);S.skyColor.copy(I.color).multiplyScalar(W),S.groundColor.copy(I.groundColor).multiplyScalar(W),n.hemi[p]=S,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Rt.LTC_FLOAT_1,n.rectAreaLTC2=Rt.LTC_FLOAT_2):(n.rectAreaLTC1=Rt.LTC_HALF_1,n.rectAreaLTC2=Rt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const z=n.hash;(z.directionalLength!==f||z.pointLength!==g||z.spotLength!==x||z.rectAreaLength!==m||z.hemiLength!==p||z.numDirectionalShadows!==y||z.numPointShadows!==v||z.numSpotShadows!==_||z.numSpotMaps!==A||z.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,z.directionalLength=f,z.pointLength=g,z.spotLength=x,z.rectAreaLength=m,z.hemiLength=p,z.numDirectionalShadows=y,z.numPointShadows=v,z.numSpotShadows=_,z.numSpotMaps=A,z.numLightProbes=C,n.version=nv++)}function c(l,u){let h=0,d=0,f=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const v=l[p];if(v.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(v.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function ch(i){const t=new sv(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function rv(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new ch(i),t.set(s,[o])):r>=a.length?(o=new ch(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Il extends Un{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Fp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class av extends Un{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ov=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cv=`uniform sampler2D shadow_pass;
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
}`;function lv(i,t,e){let n=new Yr;const s=new St,r=new St,a=new ee,o=new Il({depthPacking:Tl}),c=new av,l={},u=e.maxTextureSize,h={[mi]:nn,[nn]:mi,[en]:en},d=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:ov,fragmentShader:cv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new le;g.setAttribute("position",new xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ne(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ml;let p=this.type;this.render=function(w,C,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const b=i.getRenderTarget(),E=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),X=i.state;X.setBlending(Fi),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const W=p!==ai&&this.type===ai,q=p===ai&&this.type!==ai;for(let M=0,S=w.length;M<S;M++){const R=w[M],T=R.shadow;if(T===void 0){console.warn("THREE.WebGLShadowMap:",R,"has no shadow.");continue}if(T.autoUpdate===!1&&T.needsUpdate===!1)continue;s.copy(T.mapSize);const k=T.getFrameExtents();if(s.multiply(k),r.copy(T.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/k.x),s.x=r.x*k.x,T.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/k.y),s.y=r.y*k.y,T.mapSize.y=r.y)),T.map===null||W===!0||q===!0){const P=this.type!==ai?{minFilter:Ye,magFilter:Ye}:{};T.map!==null&&T.map.dispose(),T.map=new gi(s.x,s.y,P),T.map.texture.name=R.name+".shadowMap",T.camera.updateProjectionMatrix()}i.setRenderTarget(T.map),i.clear();const F=T.getViewportCount();for(let P=0;P<F;P++){const N=T.getViewport(P);a.set(r.x*N.x,r.y*N.y,r.x*N.z,r.y*N.w),X.viewport(a),T.updateMatrices(R,P),n=T.getFrustum(),_(C,z,T.camera,R,this.type)}T.isPointLightShadow!==!0&&this.type===ai&&y(T,z),T.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,E,I)};function y(w,C){const z=t.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new gi(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,z,d,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,z,f,x,null)}function v(w,C,z,b){let E=null;const I=z.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)E=I;else if(E=z.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const X=E.uuid,W=C.uuid;let q=l[X];q===void 0&&(q={},l[X]=q);let M=q[W];M===void 0&&(M=E.clone(),q[W]=M,C.addEventListener("dispose",A)),E=M}if(E.visible=C.visible,E.wireframe=C.wireframe,b===ai?E.side=C.shadowSide!==null?C.shadowSide:C.side:E.side=C.shadowSide!==null?C.shadowSide:h[C.side],E.alphaMap=C.alphaMap,E.alphaTest=C.alphaTest,E.map=C.map,E.clipShadows=C.clipShadows,E.clippingPlanes=C.clippingPlanes,E.clipIntersection=C.clipIntersection,E.displacementMap=C.displacementMap,E.displacementScale=C.displacementScale,E.displacementBias=C.displacementBias,E.wireframeLinewidth=C.wireframeLinewidth,E.linewidth=C.linewidth,z.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const X=i.properties.get(E);X.light=z}return E}function _(w,C,z,b,E){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===ai)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld);const W=t.update(w),q=w.material;if(Array.isArray(q)){const M=W.groups;for(let S=0,R=M.length;S<R;S++){const T=M[S],k=q[T.materialIndex];if(k&&k.visible){const F=v(w,k,b,E);w.onBeforeShadow(i,w,C,z,W,F,T),i.renderBufferDirect(z,null,W,F,w,T),w.onAfterShadow(i,w,C,z,W,F,T)}}}else if(q.visible){const M=v(w,q,b,E);w.onBeforeShadow(i,w,C,z,W,M,null),i.renderBufferDirect(z,null,W,M,w,null),w.onAfterShadow(i,w,C,z,W,M,null)}}const X=w.children;for(let W=0,q=X.length;W<q;W++)_(X[W],C,z,b,E)}function A(w){w.target.removeEventListener("dispose",A);for(const z in l){const b=l[z],E=w.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}const uv={[gc]:xc,[_c]:Mc,[vc]:bc,[Xs]:yc,[xc]:gc,[Mc]:_c,[bc]:vc,[yc]:Xs};function hv(i,t){function e(){let Z=!1;const wt=new ee;let lt=null;const gt=new ee(0,0,0,0);return{setMask:function(It){lt!==It&&!Z&&(i.colorMask(It,It,It,It),lt=It)},setLocked:function(It){Z=It},setClear:function(It,Pt,Yt,Me,Ue){Ue===!0&&(It*=Me,Pt*=Me,Yt*=Me),wt.set(It,Pt,Yt,Me),gt.equals(wt)===!1&&(i.clearColor(It,Pt,Yt,Me),gt.copy(wt))},reset:function(){Z=!1,lt=null,gt.set(-1,0,0,0)}}}function n(){let Z=!1,wt=!1,lt=null,gt=null,It=null;return{setReversed:function(Pt){if(wt!==Pt){const Yt=t.get("EXT_clip_control");wt?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT);const Me=It;It=null,this.setClear(Me)}wt=Pt},getReversed:function(){return wt},setTest:function(Pt){Pt?Y(i.DEPTH_TEST):K(i.DEPTH_TEST)},setMask:function(Pt){lt!==Pt&&!Z&&(i.depthMask(Pt),lt=Pt)},setFunc:function(Pt){if(wt&&(Pt=uv[Pt]),gt!==Pt){switch(Pt){case gc:i.depthFunc(i.NEVER);break;case xc:i.depthFunc(i.ALWAYS);break;case _c:i.depthFunc(i.LESS);break;case Xs:i.depthFunc(i.LEQUAL);break;case vc:i.depthFunc(i.EQUAL);break;case yc:i.depthFunc(i.GEQUAL);break;case Mc:i.depthFunc(i.GREATER);break;case bc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}gt=Pt}},setLocked:function(Pt){Z=Pt},setClear:function(Pt){It!==Pt&&(wt&&(Pt=1-Pt),i.clearDepth(Pt),It=Pt)},reset:function(){Z=!1,lt=null,gt=null,It=null,wt=!1}}}function s(){let Z=!1,wt=null,lt=null,gt=null,It=null,Pt=null,Yt=null,Me=null,Ue=null;return{setTest:function(ae){Z||(ae?Y(i.STENCIL_TEST):K(i.STENCIL_TEST))},setMask:function(ae){wt!==ae&&!Z&&(i.stencilMask(ae),wt=ae)},setFunc:function(ae,Sn,$n){(lt!==ae||gt!==Sn||It!==$n)&&(i.stencilFunc(ae,Sn,$n),lt=ae,gt=Sn,It=$n)},setOp:function(ae,Sn,$n){(Pt!==ae||Yt!==Sn||Me!==$n)&&(i.stencilOp(ae,Sn,$n),Pt=ae,Yt=Sn,Me=$n)},setLocked:function(ae){Z=ae},setClear:function(ae){Ue!==ae&&(i.clearStencil(ae),Ue=ae)},reset:function(){Z=!1,wt=null,lt=null,gt=null,It=null,Pt=null,Yt=null,Me=null,Ue=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,y=null,v=null,_=null,A=null,w=null,C=new zt(0,0,0),z=0,b=!1,E=null,I=null,X=null,W=null,q=null;const M=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let S=!1,R=0;const T=i.getParameter(i.VERSION);T.indexOf("WebGL")!==-1?(R=parseFloat(/^WebGL (\d)/.exec(T)[1]),S=R>=1):T.indexOf("OpenGL ES")!==-1&&(R=parseFloat(/^OpenGL ES (\d)/.exec(T)[1]),S=R>=2);let k=null,F={};const P=i.getParameter(i.SCISSOR_BOX),N=i.getParameter(i.VIEWPORT),j=new ee().fromArray(P),H=new ee().fromArray(N);function V(Z,wt,lt,gt){const It=new Uint8Array(4),Pt=i.createTexture();i.bindTexture(Z,Pt),i.texParameteri(Z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Yt=0;Yt<lt;Yt++)Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?i.texImage3D(wt,0,i.RGBA,1,1,gt,0,i.RGBA,i.UNSIGNED_BYTE,It):i.texImage2D(wt+Yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,It);return Pt}const tt={};tt[i.TEXTURE_2D]=V(i.TEXTURE_2D,i.TEXTURE_2D,1),tt[i.TEXTURE_CUBE_MAP]=V(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[i.TEXTURE_2D_ARRAY]=V(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),tt[i.TEXTURE_3D]=V(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(i.DEPTH_TEST),a.setFunc(Xs),ft(!1),yt(hu),Y(i.CULL_FACE),U(Fi);function Y(Z){u[Z]!==!0&&(i.enable(Z),u[Z]=!0)}function K(Z){u[Z]!==!1&&(i.disable(Z),u[Z]=!1)}function it(Z,wt){return h[Z]!==wt?(i.bindFramebuffer(Z,wt),h[Z]=wt,Z===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=wt),Z===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=wt),!0):!1}function G(Z,wt){let lt=f,gt=!1;if(Z){lt=d.get(wt),lt===void 0&&(lt=[],d.set(wt,lt));const It=Z.textures;if(lt.length!==It.length||lt[0]!==i.COLOR_ATTACHMENT0){for(let Pt=0,Yt=It.length;Pt<Yt;Pt++)lt[Pt]=i.COLOR_ATTACHMENT0+Pt;lt.length=It.length,gt=!0}}else lt[0]!==i.BACK&&(lt[0]=i.BACK,gt=!0);gt&&i.drawBuffers(lt)}function ct(Z){return g!==Z?(i.useProgram(Z),g=Z,!0):!1}const at={[rs]:i.FUNC_ADD,[lp]:i.FUNC_SUBTRACT,[up]:i.FUNC_REVERSE_SUBTRACT};at[hp]=i.MIN,at[fp]=i.MAX;const mt={[dp]:i.ZERO,[pp]:i.ONE,[mp]:i.SRC_COLOR,[pc]:i.SRC_ALPHA,[Mp]:i.SRC_ALPHA_SATURATE,[vp]:i.DST_COLOR,[xp]:i.DST_ALPHA,[gp]:i.ONE_MINUS_SRC_COLOR,[mc]:i.ONE_MINUS_SRC_ALPHA,[yp]:i.ONE_MINUS_DST_COLOR,[_p]:i.ONE_MINUS_DST_ALPHA,[bp]:i.CONSTANT_COLOR,[Sp]:i.ONE_MINUS_CONSTANT_COLOR,[Ap]:i.CONSTANT_ALPHA,[wp]:i.ONE_MINUS_CONSTANT_ALPHA};function U(Z,wt,lt,gt,It,Pt,Yt,Me,Ue,ae){if(Z===Fi){x===!0&&(K(i.BLEND),x=!1);return}if(x===!1&&(Y(i.BLEND),x=!0),Z!==cp){if(Z!==m||ae!==b){if((p!==rs||_!==rs)&&(i.blendEquation(i.FUNC_ADD),p=rs,_=rs),ae)switch(Z){case Bs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fu:i.blendFunc(i.ONE,i.ONE);break;case du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case pu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}else switch(Z){case Bs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case pu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}y=null,v=null,A=null,w=null,C.set(0,0,0),z=0,m=Z,b=ae}return}It=It||wt,Pt=Pt||lt,Yt=Yt||gt,(wt!==p||It!==_)&&(i.blendEquationSeparate(at[wt],at[It]),p=wt,_=It),(lt!==y||gt!==v||Pt!==A||Yt!==w)&&(i.blendFuncSeparate(mt[lt],mt[gt],mt[Pt],mt[Yt]),y=lt,v=gt,A=Pt,w=Yt),(Me.equals(C)===!1||Ue!==z)&&(i.blendColor(Me.r,Me.g,Me.b,Ue),C.copy(Me),z=Ue),m=Z,b=!1}function xt(Z,wt){Z.side===en?K(i.CULL_FACE):Y(i.CULL_FACE);let lt=Z.side===nn;wt&&(lt=!lt),ft(lt),Z.blending===Bs&&Z.transparent===!1?U(Fi):U(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),a.setFunc(Z.depthFunc),a.setTest(Z.depthTest),a.setMask(Z.depthWrite),r.setMask(Z.colorWrite);const gt=Z.stencilWrite;o.setTest(gt),gt&&(o.setMask(Z.stencilWriteMask),o.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),o.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),Bt(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?Y(i.SAMPLE_ALPHA_TO_COVERAGE):K(i.SAMPLE_ALPHA_TO_COVERAGE)}function ft(Z){E!==Z&&(Z?i.frontFace(i.CW):i.frontFace(i.CCW),E=Z)}function yt(Z){Z!==ap?(Y(i.CULL_FACE),Z!==I&&(Z===hu?i.cullFace(i.BACK):Z===op?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):K(i.CULL_FACE),I=Z}function vt(Z){Z!==X&&(S&&i.lineWidth(Z),X=Z)}function Bt(Z,wt,lt){Z?(Y(i.POLYGON_OFFSET_FILL),(W!==wt||q!==lt)&&(i.polygonOffset(wt,lt),W=wt,q=lt)):K(i.POLYGON_OFFSET_FILL)}function Et(Z){Z?Y(i.SCISSOR_TEST):K(i.SCISSOR_TEST)}function D(Z){Z===void 0&&(Z=i.TEXTURE0+M-1),k!==Z&&(i.activeTexture(Z),k=Z)}function L(Z,wt,lt){lt===void 0&&(k===null?lt=i.TEXTURE0+M-1:lt=k);let gt=F[lt];gt===void 0&&(gt={type:void 0,texture:void 0},F[lt]=gt),(gt.type!==Z||gt.texture!==wt)&&(k!==lt&&(i.activeTexture(lt),k=lt),i.bindTexture(Z,wt||tt[Z]),gt.type=Z,gt.texture=wt)}function J(){const Z=F[k];Z!==void 0&&Z.type!==void 0&&(i.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function st(){try{i.compressedTexImage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ht(){try{i.compressedTexImage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ut(){try{i.texSubImage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function At(){try{i.texSubImage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Mt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Dt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function dt(){try{i.texStorage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function pt(){try{i.texStorage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function _t(){try{i.texImage2D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Ct(){try{i.texImage3D.apply(i,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Nt(Z){j.equals(Z)===!1&&(i.scissor(Z.x,Z.y,Z.z,Z.w),j.copy(Z))}function Tt(Z){H.equals(Z)===!1&&(i.viewport(Z.x,Z.y,Z.z,Z.w),H.copy(Z))}function jt(Z,wt){let lt=l.get(wt);lt===void 0&&(lt=new WeakMap,l.set(wt,lt));let gt=lt.get(Z);gt===void 0&&(gt=i.getUniformBlockIndex(wt,Z.name),lt.set(Z,gt))}function Wt(Z,wt){const gt=l.get(wt).get(Z);c.get(wt)!==gt&&(i.uniformBlockBinding(wt,gt,Z.__bindingPointIndex),c.set(wt,gt))}function Gt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},k=null,F={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,y=null,v=null,_=null,A=null,w=null,C=new zt(0,0,0),z=0,b=!1,E=null,I=null,X=null,W=null,q=null,j.set(0,0,i.canvas.width,i.canvas.height),H.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Y,disable:K,bindFramebuffer:it,drawBuffers:G,useProgram:ct,setBlending:U,setMaterial:xt,setFlipSided:ft,setCullFace:yt,setLineWidth:vt,setPolygonOffset:Bt,setScissorTest:Et,activeTexture:D,bindTexture:L,unbindTexture:J,compressedTexImage2D:st,compressedTexImage3D:ht,texImage2D:_t,texImage3D:Ct,updateUBOMapping:jt,uniformBlockBinding:Wt,texStorage2D:dt,texStorage3D:pt,texSubImage2D:ut,texSubImage3D:At,compressedTexSubImage2D:Mt,compressedTexSubImage3D:Dt,scissor:Nt,viewport:Tt,reset:Gt}}function lh(i,t,e,n){const s=fv(n);switch(e){case Jf:return i*t;case td:return i*t;case ed:return i*t*2;case yl:return i*t/s.components*s.byteLength;case Ml:return i*t/s.components*s.byteLength;case nd:return i*t*2/s.components*s.byteLength;case bl:return i*t*2/s.components*s.byteLength;case Qf:return i*t*3/s.components*s.byteLength;case Xe:return i*t*4/s.components*s.byteLength;case Sl:return i*t*4/s.components*s.byteLength;case Ga:case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Wa:case Xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Tc:case Rc:return Math.max(i,16)*Math.max(t,8)/4;case wc:case Ec:return Math.max(i,8)*Math.max(t,8)/2;case Cc:case Pc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ic:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Dc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case zc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Nc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Uc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case kc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Oc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Fc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Bc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Gc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Vc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Wc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Xc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ja:case jc:case Yc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case id:case Kc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case qc:case Zc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function fv(i){switch(i){case Mn:case qf:return{byteLength:1,components:1};case Or:case Zf:case nr:return{byteLength:2,components:1};case _l:case vl:return{byteLength:2,components:4};case ls:case xl:case yn:return{byteLength:4,components:1};case $f:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function dv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new St,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,L){return f?new OffscreenCanvas(D,L):Hr("canvas")}function x(D,L,J){let st=1;const ht=Et(D);if((ht.width>J||ht.height>J)&&(st=J/Math.max(ht.width,ht.height)),st<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ut=Math.floor(st*ht.width),At=Math.floor(st*ht.height);h===void 0&&(h=g(ut,At));const Mt=L?g(ut,At):h;return Mt.width=ut,Mt.height=At,Mt.getContext("2d").drawImage(D,0,0,ut,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ht.width+"x"+ht.height+") to ("+ut+"x"+At+")."),Mt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ht.width+"x"+ht.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){i.generateMipmap(D)}function y(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(D,L,J,st,ht=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ut=L;if(L===i.RED&&(J===i.FLOAT&&(ut=i.R32F),J===i.HALF_FLOAT&&(ut=i.R16F),J===i.UNSIGNED_BYTE&&(ut=i.R8)),L===i.RED_INTEGER&&(J===i.UNSIGNED_BYTE&&(ut=i.R8UI),J===i.UNSIGNED_SHORT&&(ut=i.R16UI),J===i.UNSIGNED_INT&&(ut=i.R32UI),J===i.BYTE&&(ut=i.R8I),J===i.SHORT&&(ut=i.R16I),J===i.INT&&(ut=i.R32I)),L===i.RG&&(J===i.FLOAT&&(ut=i.RG32F),J===i.HALF_FLOAT&&(ut=i.RG16F),J===i.UNSIGNED_BYTE&&(ut=i.RG8)),L===i.RG_INTEGER&&(J===i.UNSIGNED_BYTE&&(ut=i.RG8UI),J===i.UNSIGNED_SHORT&&(ut=i.RG16UI),J===i.UNSIGNED_INT&&(ut=i.RG32UI),J===i.BYTE&&(ut=i.RG8I),J===i.SHORT&&(ut=i.RG16I),J===i.INT&&(ut=i.RG32I)),L===i.RGB_INTEGER&&(J===i.UNSIGNED_BYTE&&(ut=i.RGB8UI),J===i.UNSIGNED_SHORT&&(ut=i.RGB16UI),J===i.UNSIGNED_INT&&(ut=i.RGB32UI),J===i.BYTE&&(ut=i.RGB8I),J===i.SHORT&&(ut=i.RGB16I),J===i.INT&&(ut=i.RGB32I)),L===i.RGBA_INTEGER&&(J===i.UNSIGNED_BYTE&&(ut=i.RGBA8UI),J===i.UNSIGNED_SHORT&&(ut=i.RGBA16UI),J===i.UNSIGNED_INT&&(ut=i.RGBA32UI),J===i.BYTE&&(ut=i.RGBA8I),J===i.SHORT&&(ut=i.RGBA16I),J===i.INT&&(ut=i.RGBA32I)),L===i.RGB&&J===i.UNSIGNED_INT_5_9_9_9_REV&&(ut=i.RGB9_E5),L===i.RGBA){const At=ht?so:ie.getTransfer(st);J===i.FLOAT&&(ut=i.RGBA32F),J===i.HALF_FLOAT&&(ut=i.RGBA16F),J===i.UNSIGNED_BYTE&&(ut=At===me?i.SRGB8_ALPHA8:i.RGBA8),J===i.UNSIGNED_SHORT_4_4_4_4&&(ut=i.RGBA4),J===i.UNSIGNED_SHORT_5_5_5_1&&(ut=i.RGB5_A1)}return(ut===i.R16F||ut===i.R32F||ut===i.RG16F||ut===i.RG32F||ut===i.RGBA16F||ut===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ut}function _(D,L){let J;return D?L===null||L===ls||L===Ks?J=i.DEPTH24_STENCIL8:L===yn?J=i.DEPTH32F_STENCIL8:L===Or&&(J=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):L===null||L===ls||L===Ks?J=i.DEPTH_COMPONENT24:L===yn?J=i.DEPTH_COMPONENT32F:L===Or&&(J=i.DEPTH_COMPONENT16),J}function A(D,L){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==Ye&&D.minFilter!==Fe?Math.log2(Math.max(L.width,L.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?L.mipmaps.length:1}function w(D){const L=D.target;L.removeEventListener("dispose",w),z(L),L.isVideoTexture&&u.delete(L)}function C(D){const L=D.target;L.removeEventListener("dispose",C),E(L)}function z(D){const L=n.get(D);if(L.__webglInit===void 0)return;const J=D.source,st=d.get(J);if(st){const ht=st[L.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&b(D),Object.keys(st).length===0&&d.delete(J)}n.remove(D)}function b(D){const L=n.get(D);i.deleteTexture(L.__webglTexture);const J=D.source,st=d.get(J);delete st[L.__cacheKey],a.memory.textures--}function E(D){const L=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(L.__webglFramebuffer[st]))for(let ht=0;ht<L.__webglFramebuffer[st].length;ht++)i.deleteFramebuffer(L.__webglFramebuffer[st][ht]);else i.deleteFramebuffer(L.__webglFramebuffer[st]);L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer[st])}else{if(Array.isArray(L.__webglFramebuffer))for(let st=0;st<L.__webglFramebuffer.length;st++)i.deleteFramebuffer(L.__webglFramebuffer[st]);else i.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&i.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let st=0;st<L.__webglColorRenderbuffer.length;st++)L.__webglColorRenderbuffer[st]&&i.deleteRenderbuffer(L.__webglColorRenderbuffer[st]);L.__webglDepthRenderbuffer&&i.deleteRenderbuffer(L.__webglDepthRenderbuffer)}const J=D.textures;for(let st=0,ht=J.length;st<ht;st++){const ut=n.get(J[st]);ut.__webglTexture&&(i.deleteTexture(ut.__webglTexture),a.memory.textures--),n.remove(J[st])}n.remove(D)}let I=0;function X(){I=0}function W(){const D=I;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),I+=1,D}function q(D){const L=[];return L.push(D.wrapS),L.push(D.wrapT),L.push(D.wrapR||0),L.push(D.magFilter),L.push(D.minFilter),L.push(D.anisotropy),L.push(D.internalFormat),L.push(D.format),L.push(D.type),L.push(D.generateMipmaps),L.push(D.premultiplyAlpha),L.push(D.flipY),L.push(D.unpackAlignment),L.push(D.colorSpace),L.join()}function M(D,L){const J=n.get(D);if(D.isVideoTexture&&vt(D),D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){const st=D.image;if(st===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(J,D,L);return}}e.bindTexture(i.TEXTURE_2D,J.__webglTexture,i.TEXTURE0+L)}function S(D,L){const J=n.get(D);if(D.version>0&&J.__version!==D.version){H(J,D,L);return}e.bindTexture(i.TEXTURE_2D_ARRAY,J.__webglTexture,i.TEXTURE0+L)}function R(D,L){const J=n.get(D);if(D.version>0&&J.__version!==D.version){H(J,D,L);return}e.bindTexture(i.TEXTURE_3D,J.__webglTexture,i.TEXTURE0+L)}function T(D,L){const J=n.get(D);if(D.version>0&&J.__version!==D.version){V(J,D,L);return}e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture,i.TEXTURE0+L)}const k={[Wi]:i.REPEAT,[Wn]:i.CLAMP_TO_EDGE,[qa]:i.MIRRORED_REPEAT},F={[Ye]:i.NEAREST,[Kf]:i.NEAREST_MIPMAP_NEAREST,[Sr]:i.NEAREST_MIPMAP_LINEAR,[Fe]:i.LINEAR,[Ha]:i.LINEAR_MIPMAP_NEAREST,[pn]:i.LINEAR_MIPMAP_LINEAR},P={[Hp]:i.NEVER,[Yp]:i.ALWAYS,[Gp]:i.LESS,[rd]:i.LEQUAL,[Vp]:i.EQUAL,[jp]:i.GEQUAL,[Wp]:i.GREATER,[Xp]:i.NOTEQUAL};function N(D,L){if(L.type===yn&&t.has("OES_texture_float_linear")===!1&&(L.magFilter===Fe||L.magFilter===Ha||L.magFilter===Sr||L.magFilter===pn||L.minFilter===Fe||L.minFilter===Ha||L.minFilter===Sr||L.minFilter===pn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,k[L.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,k[L.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,k[L.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,F[L.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,F[L.minFilter]),L.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,P[L.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(L.magFilter===Ye||L.minFilter!==Sr&&L.minFilter!==pn||L.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(L.anisotropy>1||n.get(L).__currentAnisotropy){const J=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(L.anisotropy,s.getMaxAnisotropy())),n.get(L).__currentAnisotropy=L.anisotropy}}}function j(D,L){let J=!1;D.__webglInit===void 0&&(D.__webglInit=!0,L.addEventListener("dispose",w));const st=L.source;let ht=d.get(st);ht===void 0&&(ht={},d.set(st,ht));const ut=q(L);if(ut!==D.__cacheKey){ht[ut]===void 0&&(ht[ut]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,J=!0),ht[ut].usedTimes++;const At=ht[D.__cacheKey];At!==void 0&&(ht[D.__cacheKey].usedTimes--,At.usedTimes===0&&b(L)),D.__cacheKey=ut,D.__webglTexture=ht[ut].texture}return J}function H(D,L,J){let st=i.TEXTURE_2D;(L.isDataArrayTexture||L.isCompressedArrayTexture)&&(st=i.TEXTURE_2D_ARRAY),L.isData3DTexture&&(st=i.TEXTURE_3D);const ht=j(D,L),ut=L.source;e.bindTexture(st,D.__webglTexture,i.TEXTURE0+J);const At=n.get(ut);if(ut.version!==At.__version||ht===!0){e.activeTexture(i.TEXTURE0+J);const Mt=ie.getPrimaries(ie.workingColorSpace),Dt=L.colorSpace===Ni?null:ie.getPrimaries(L.colorSpace),dt=L.colorSpace===Ni||Mt===Dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,L.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,L.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);let pt=x(L.image,!1,s.maxTextureSize);pt=Bt(L,pt);const _t=r.convert(L.format,L.colorSpace),Ct=r.convert(L.type);let Nt=v(L.internalFormat,_t,Ct,L.colorSpace,L.isVideoTexture);N(st,L);let Tt;const jt=L.mipmaps,Wt=L.isVideoTexture!==!0,Gt=At.__version===void 0||ht===!0,Z=ut.dataReady,wt=A(L,pt);if(L.isDepthTexture)Nt=_(L.format===qs,L.type),Gt&&(Wt?e.texStorage2D(i.TEXTURE_2D,1,Nt,pt.width,pt.height):e.texImage2D(i.TEXTURE_2D,0,Nt,pt.width,pt.height,0,_t,Ct,null));else if(L.isDataTexture)if(jt.length>0){Wt&&Gt&&e.texStorage2D(i.TEXTURE_2D,wt,Nt,jt[0].width,jt[0].height);for(let lt=0,gt=jt.length;lt<gt;lt++)Tt=jt[lt],Wt?Z&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,Tt.width,Tt.height,_t,Ct,Tt.data):e.texImage2D(i.TEXTURE_2D,lt,Nt,Tt.width,Tt.height,0,_t,Ct,Tt.data);L.generateMipmaps=!1}else Wt?(Gt&&e.texStorage2D(i.TEXTURE_2D,wt,Nt,pt.width,pt.height),Z&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt.width,pt.height,_t,Ct,pt.data)):e.texImage2D(i.TEXTURE_2D,0,Nt,pt.width,pt.height,0,_t,Ct,pt.data);else if(L.isCompressedTexture)if(L.isCompressedArrayTexture){Wt&&Gt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Nt,jt[0].width,jt[0].height,pt.depth);for(let lt=0,gt=jt.length;lt<gt;lt++)if(Tt=jt[lt],L.format!==Xe)if(_t!==null)if(Wt){if(Z)if(L.layerUpdates.size>0){const It=lh(Tt.width,Tt.height,L.format,L.type);for(const Pt of L.layerUpdates){const Yt=Tt.data.subarray(Pt*It/Tt.data.BYTES_PER_ELEMENT,(Pt+1)*It/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,Pt,Tt.width,Tt.height,1,_t,Yt)}L.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,Tt.width,Tt.height,pt.depth,_t,Tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,lt,Nt,Tt.width,Tt.height,pt.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?Z&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,Tt.width,Tt.height,pt.depth,_t,Ct,Tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,lt,Nt,Tt.width,Tt.height,pt.depth,0,_t,Ct,Tt.data)}else{Wt&&Gt&&e.texStorage2D(i.TEXTURE_2D,wt,Nt,jt[0].width,jt[0].height);for(let lt=0,gt=jt.length;lt<gt;lt++)Tt=jt[lt],L.format!==Xe?_t!==null?Wt?Z&&e.compressedTexSubImage2D(i.TEXTURE_2D,lt,0,0,Tt.width,Tt.height,_t,Tt.data):e.compressedTexImage2D(i.TEXTURE_2D,lt,Nt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?Z&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,Tt.width,Tt.height,_t,Ct,Tt.data):e.texImage2D(i.TEXTURE_2D,lt,Nt,Tt.width,Tt.height,0,_t,Ct,Tt.data)}else if(L.isDataArrayTexture)if(Wt){if(Gt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Nt,pt.width,pt.height,pt.depth),Z)if(L.layerUpdates.size>0){const lt=lh(pt.width,pt.height,L.format,L.type);for(const gt of L.layerUpdates){const It=pt.data.subarray(gt*lt/pt.data.BYTES_PER_ELEMENT,(gt+1)*lt/pt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,gt,pt.width,pt.height,1,_t,Ct,It)}L.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,pt.width,pt.height,pt.depth,_t,Ct,pt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Nt,pt.width,pt.height,pt.depth,0,_t,Ct,pt.data);else if(L.isData3DTexture)Wt?(Gt&&e.texStorage3D(i.TEXTURE_3D,wt,Nt,pt.width,pt.height,pt.depth),Z&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,pt.width,pt.height,pt.depth,_t,Ct,pt.data)):e.texImage3D(i.TEXTURE_3D,0,Nt,pt.width,pt.height,pt.depth,0,_t,Ct,pt.data);else if(L.isFramebufferTexture){if(Gt)if(Wt)e.texStorage2D(i.TEXTURE_2D,wt,Nt,pt.width,pt.height);else{let lt=pt.width,gt=pt.height;for(let It=0;It<wt;It++)e.texImage2D(i.TEXTURE_2D,It,Nt,lt,gt,0,_t,Ct,null),lt>>=1,gt>>=1}}else if(jt.length>0){if(Wt&&Gt){const lt=Et(jt[0]);e.texStorage2D(i.TEXTURE_2D,wt,Nt,lt.width,lt.height)}for(let lt=0,gt=jt.length;lt<gt;lt++)Tt=jt[lt],Wt?Z&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,_t,Ct,Tt):e.texImage2D(i.TEXTURE_2D,lt,Nt,_t,Ct,Tt);L.generateMipmaps=!1}else if(Wt){if(Gt){const lt=Et(pt);e.texStorage2D(i.TEXTURE_2D,wt,Nt,lt.width,lt.height)}Z&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Ct,pt)}else e.texImage2D(i.TEXTURE_2D,0,Nt,_t,Ct,pt);m(L)&&p(st),At.__version=ut.version,L.onUpdate&&L.onUpdate(L)}D.__version=L.version}function V(D,L,J){if(L.image.length!==6)return;const st=j(D,L),ht=L.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+J);const ut=n.get(ht);if(ht.version!==ut.__version||st===!0){e.activeTexture(i.TEXTURE0+J);const At=ie.getPrimaries(ie.workingColorSpace),Mt=L.colorSpace===Ni?null:ie.getPrimaries(L.colorSpace),Dt=L.colorSpace===Ni||At===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,L.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,L.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);const dt=L.isCompressedTexture||L.image[0].isCompressedTexture,pt=L.image[0]&&L.image[0].isDataTexture,_t=[];for(let gt=0;gt<6;gt++)!dt&&!pt?_t[gt]=x(L.image[gt],!0,s.maxCubemapSize):_t[gt]=pt?L.image[gt].image:L.image[gt],_t[gt]=Bt(L,_t[gt]);const Ct=_t[0],Nt=r.convert(L.format,L.colorSpace),Tt=r.convert(L.type),jt=v(L.internalFormat,Nt,Tt,L.colorSpace),Wt=L.isVideoTexture!==!0,Gt=ut.__version===void 0||st===!0,Z=ht.dataReady;let wt=A(L,Ct);N(i.TEXTURE_CUBE_MAP,L);let lt;if(dt){Wt&&Gt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,jt,Ct.width,Ct.height);for(let gt=0;gt<6;gt++){lt=_t[gt].mipmaps;for(let It=0;It<lt.length;It++){const Pt=lt[It];L.format!==Xe?Nt!==null?Wt?Z&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It,0,0,Pt.width,Pt.height,Nt,Pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It,jt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It,0,0,Pt.width,Pt.height,Nt,Tt,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It,jt,Pt.width,Pt.height,0,Nt,Tt,Pt.data)}}}else{if(lt=L.mipmaps,Wt&&Gt){lt.length>0&&wt++;const gt=Et(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,jt,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(pt){Wt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,_t[gt].width,_t[gt].height,Nt,Tt,_t[gt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,jt,_t[gt].width,_t[gt].height,0,Nt,Tt,_t[gt].data);for(let It=0;It<lt.length;It++){const Yt=lt[It].image[gt].image;Wt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It+1,0,0,Yt.width,Yt.height,Nt,Tt,Yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It+1,jt,Yt.width,Yt.height,0,Nt,Tt,Yt.data)}}else{Wt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Nt,Tt,_t[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,jt,Nt,Tt,_t[gt]);for(let It=0;It<lt.length;It++){const Pt=lt[It];Wt?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It+1,0,0,Nt,Tt,Pt.image[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It+1,jt,Nt,Tt,Pt.image[gt])}}}m(L)&&p(i.TEXTURE_CUBE_MAP),ut.__version=ht.version,L.onUpdate&&L.onUpdate(L)}D.__version=L.version}function tt(D,L,J,st,ht,ut){const At=r.convert(J.format,J.colorSpace),Mt=r.convert(J.type),Dt=v(J.internalFormat,At,Mt,J.colorSpace),dt=n.get(L),pt=n.get(J);if(pt.__renderTarget=L,!dt.__hasExternalTextures){const _t=Math.max(1,L.width>>ut),Ct=Math.max(1,L.height>>ut);ht===i.TEXTURE_3D||ht===i.TEXTURE_2D_ARRAY?e.texImage3D(ht,ut,Dt,_t,Ct,L.depth,0,At,Mt,null):e.texImage2D(ht,ut,Dt,_t,Ct,0,At,Mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),yt(L)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,st,ht,pt.__webglTexture,0,ft(L)):(ht===i.TEXTURE_2D||ht>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,st,ht,pt.__webglTexture,ut),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Y(D,L,J){if(i.bindRenderbuffer(i.RENDERBUFFER,D),L.depthBuffer){const st=L.depthTexture,ht=st&&st.isDepthTexture?st.type:null,ut=_(L.stencilBuffer,ht),At=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=ft(L);yt(L)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt,ut,L.width,L.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,ut,L.width,L.height):i.renderbufferStorage(i.RENDERBUFFER,ut,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,D)}else{const st=L.textures;for(let ht=0;ht<st.length;ht++){const ut=st[ht],At=r.convert(ut.format,ut.colorSpace),Mt=r.convert(ut.type),Dt=v(ut.internalFormat,At,Mt,ut.colorSpace),dt=ft(L);J&&yt(L)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,Dt,L.width,L.height):yt(L)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,dt,Dt,L.width,L.height):i.renderbufferStorage(i.RENDERBUFFER,Dt,L.width,L.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function K(D,L){if(L&&L.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(L.depthTexture&&L.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const st=n.get(L.depthTexture);st.__renderTarget=L,(!st.__webglTexture||L.depthTexture.image.width!==L.width||L.depthTexture.image.height!==L.height)&&(L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0),M(L.depthTexture,0);const ht=st.__webglTexture,ut=ft(L);if(L.depthTexture.format===Hs)yt(L)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ht,0,ut):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ht,0);else if(L.depthTexture.format===qs)yt(L)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ht,0,ut):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ht,0);else throw new Error("Unknown depthTexture format")}function it(D){const L=n.get(D),J=D.isWebGLCubeRenderTarget===!0;if(L.__boundDepthTexture!==D.depthTexture){const st=D.depthTexture;if(L.__depthDisposeCallback&&L.__depthDisposeCallback(),st){const ht=()=>{delete L.__boundDepthTexture,delete L.__depthDisposeCallback,st.removeEventListener("dispose",ht)};st.addEventListener("dispose",ht),L.__depthDisposeCallback=ht}L.__boundDepthTexture=st}if(D.depthTexture&&!L.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");K(L.__webglFramebuffer,D)}else if(J){L.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(e.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer[st]),L.__webglDepthbuffer[st]===void 0)L.__webglDepthbuffer[st]=i.createRenderbuffer(),Y(L.__webglDepthbuffer[st],D,!1);else{const ht=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=L.__webglDepthbuffer[st];i.bindRenderbuffer(i.RENDERBUFFER,ut),i.framebufferRenderbuffer(i.FRAMEBUFFER,ht,i.RENDERBUFFER,ut)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer),L.__webglDepthbuffer===void 0)L.__webglDepthbuffer=i.createRenderbuffer(),Y(L.__webglDepthbuffer,D,!1);else{const st=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=L.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,ht)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function G(D,L,J){const st=n.get(D);L!==void 0&&tt(st.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),J!==void 0&&it(D)}function ct(D){const L=D.texture,J=n.get(D),st=n.get(L);D.addEventListener("dispose",C);const ht=D.textures,ut=D.isWebGLCubeRenderTarget===!0,At=ht.length>1;if(At||(st.__webglTexture===void 0&&(st.__webglTexture=i.createTexture()),st.__version=L.version,a.memory.textures++),ut){J.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(L.mipmaps&&L.mipmaps.length>0){J.__webglFramebuffer[Mt]=[];for(let Dt=0;Dt<L.mipmaps.length;Dt++)J.__webglFramebuffer[Mt][Dt]=i.createFramebuffer()}else J.__webglFramebuffer[Mt]=i.createFramebuffer()}else{if(L.mipmaps&&L.mipmaps.length>0){J.__webglFramebuffer=[];for(let Mt=0;Mt<L.mipmaps.length;Mt++)J.__webglFramebuffer[Mt]=i.createFramebuffer()}else J.__webglFramebuffer=i.createFramebuffer();if(At)for(let Mt=0,Dt=ht.length;Mt<Dt;Mt++){const dt=n.get(ht[Mt]);dt.__webglTexture===void 0&&(dt.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&yt(D)===!1){J.__webglMultisampledFramebuffer=i.createFramebuffer(),J.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Mt=0;Mt<ht.length;Mt++){const Dt=ht[Mt];J.__webglColorRenderbuffer[Mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,J.__webglColorRenderbuffer[Mt]);const dt=r.convert(Dt.format,Dt.colorSpace),pt=r.convert(Dt.type),_t=v(Dt.internalFormat,dt,pt,Dt.colorSpace,D.isXRRenderTarget===!0),Ct=ft(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,_t,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,J.__webglColorRenderbuffer[Mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(J.__webglDepthRenderbuffer=i.createRenderbuffer(),Y(J.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ut){e.bindTexture(i.TEXTURE_CUBE_MAP,st.__webglTexture),N(i.TEXTURE_CUBE_MAP,L);for(let Mt=0;Mt<6;Mt++)if(L.mipmaps&&L.mipmaps.length>0)for(let Dt=0;Dt<L.mipmaps.length;Dt++)tt(J.__webglFramebuffer[Mt][Dt],D,L,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Dt);else tt(J.__webglFramebuffer[Mt],D,L,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);m(L)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let Mt=0,Dt=ht.length;Mt<Dt;Mt++){const dt=ht[Mt],pt=n.get(dt);e.bindTexture(i.TEXTURE_2D,pt.__webglTexture),N(i.TEXTURE_2D,dt),tt(J.__webglFramebuffer,D,dt,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,0),m(dt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let Mt=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Mt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Mt,st.__webglTexture),N(Mt,L),L.mipmaps&&L.mipmaps.length>0)for(let Dt=0;Dt<L.mipmaps.length;Dt++)tt(J.__webglFramebuffer[Dt],D,L,i.COLOR_ATTACHMENT0,Mt,Dt);else tt(J.__webglFramebuffer,D,L,i.COLOR_ATTACHMENT0,Mt,0);m(L)&&p(Mt),e.unbindTexture()}D.depthBuffer&&it(D)}function at(D){const L=D.textures;for(let J=0,st=L.length;J<st;J++){const ht=L[J];if(m(ht)){const ut=y(D),At=n.get(ht).__webglTexture;e.bindTexture(ut,At),p(ut),e.unbindTexture()}}}const mt=[],U=[];function xt(D){if(D.samples>0){if(yt(D)===!1){const L=D.textures,J=D.width,st=D.height;let ht=i.COLOR_BUFFER_BIT;const ut=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(D),Mt=L.length>1;if(Mt)for(let Dt=0;Dt<L.length;Dt++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Dt=0;Dt<L.length;Dt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ht|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ht|=i.STENCIL_BUFFER_BIT)),Mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[Dt]);const dt=n.get(L[Dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,dt,0)}i.blitFramebuffer(0,0,J,st,0,0,J,st,ht,i.NEAREST),c===!0&&(mt.length=0,U.length=0,mt.push(i.COLOR_ATTACHMENT0+Dt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(mt.push(ut),U.push(ut),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,mt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Mt)for(let Dt=0;Dt<L.length;Dt++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,At.__webglColorRenderbuffer[Dt]);const dt=n.get(L[Dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,dt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const L=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[L])}}}function ft(D){return Math.min(s.maxSamples,D.samples)}function yt(D){const L=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&L.__useRenderToTexture!==!1}function vt(D){const L=a.render.frame;u.get(D)!==L&&(u.set(D,L),D.update())}function Bt(D,L){const J=D.colorSpace,st=D.format,ht=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||J!==sn&&J!==Ni&&(ie.getTransfer(J)===me?(st!==Xe||ht!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),L}function Et(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=X,this.setTexture2D=M,this.setTexture2DArray=S,this.setTexture3D=R,this.setTextureCube=T,this.rebindTextures=G,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=yt}function pv(i,t){function e(n,s=Ni){let r;const a=ie.getTransfer(s);if(n===Mn)return i.UNSIGNED_BYTE;if(n===_l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===vl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$f)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qf)return i.BYTE;if(n===Zf)return i.SHORT;if(n===Or)return i.UNSIGNED_SHORT;if(n===xl)return i.INT;if(n===ls)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===nr)return i.HALF_FLOAT;if(n===Jf)return i.ALPHA;if(n===Qf)return i.RGB;if(n===Xe)return i.RGBA;if(n===td)return i.LUMINANCE;if(n===ed)return i.LUMINANCE_ALPHA;if(n===Hs)return i.DEPTH_COMPONENT;if(n===qs)return i.DEPTH_STENCIL;if(n===yl)return i.RED;if(n===Ml)return i.RED_INTEGER;if(n===nd)return i.RG;if(n===bl)return i.RG_INTEGER;if(n===Sl)return i.RGBA_INTEGER;if(n===Ga||n===Va||n===Wa||n===Xa)if(a===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ga)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ga)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Va)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wc||n===Tc||n===Ec||n===Rc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Tc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ec)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Rc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Cc||n===Pc||n===Ic)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Cc||n===Pc)return a===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ic)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Lc||n===Dc||n===zc||n===Nc||n===Uc||n===kc||n===Oc||n===Fc||n===Bc||n===Hc||n===Gc||n===Vc||n===Wc||n===Xc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Lc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Dc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===zc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Nc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===kc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Hc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Gc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ja||n===jc||n===Yc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ja)return a===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===id||n===Kc||n===qc||n===Zc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ja)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Kc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ks?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class mv extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ce extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gv={type:"move"};class Go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ce,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ce,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ce,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gv)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ce;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const xv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_v=`
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

}`;class vv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Be,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new kn({vertexShader:xv,fragmentShader:_v,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ne(new bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class yv extends ji{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const x=new vv,m=e.getContextAttributes();let p=null,y=null;const v=[],_=[],A=new St;let w=null;const C=new tn;C.viewport=new ee;const z=new tn;z.viewport=new ee;const b=[C,z],E=new mv;let I=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let V=v[H];return V===void 0&&(V=new Go,v[H]=V),V.getTargetRaySpace()},this.getControllerGrip=function(H){let V=v[H];return V===void 0&&(V=new Go,v[H]=V),V.getGripSpace()},this.getHand=function(H){let V=v[H];return V===void 0&&(V=new Go,v[H]=V),V.getHandSpace()};function W(H){const V=_.indexOf(H.inputSource);if(V===-1)return;const tt=v[V];tt!==void 0&&(tt.update(H.inputSource,H.frame,l||a),tt.dispatchEvent({type:H.type,data:H.inputSource}))}function q(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",M);for(let H=0;H<v.length;H++){const V=_[H];V!==null&&(_[H]=null,v[H].disconnect(V))}I=null,X=null,x.reset(),t.setRenderTarget(p),f=null,d=null,h=null,s=null,y=null,j.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",q),s.addEventListener("inputsourceschange",M),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(A),s.renderState.layers===void 0){const V={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,V),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new gi(f.framebufferWidth,f.framebufferHeight,{format:Xe,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let V=null,tt=null,Y=null;m.depth&&(Y=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,V=m.stencil?qs:Hs,tt=m.stencil?Ks:ls);const K={colorFormat:e.RGBA8,depthFormat:Y,scaleFactor:r};h=new XRWebGLBinding(s,e),d=h.createProjectionLayer(K),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new gi(d.textureWidth,d.textureHeight,{format:Xe,type:Mn,depthTexture:new gd(d.textureWidth,d.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),j.setContext(s),j.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function M(H){for(let V=0;V<H.removed.length;V++){const tt=H.removed[V],Y=_.indexOf(tt);Y>=0&&(_[Y]=null,v[Y].disconnect(tt))}for(let V=0;V<H.added.length;V++){const tt=H.added[V];let Y=_.indexOf(tt);if(Y===-1){for(let it=0;it<v.length;it++)if(it>=_.length){_.push(tt),Y=it;break}else if(_[it]===null){_[it]=tt,Y=it;break}if(Y===-1)break}const K=v[Y];K&&K.connect(tt)}}const S=new B,R=new B;function T(H,V,tt){S.setFromMatrixPosition(V.matrixWorld),R.setFromMatrixPosition(tt.matrixWorld);const Y=S.distanceTo(R),K=V.projectionMatrix.elements,it=tt.projectionMatrix.elements,G=K[14]/(K[10]-1),ct=K[14]/(K[10]+1),at=(K[9]+1)/K[5],mt=(K[9]-1)/K[5],U=(K[8]-1)/K[0],xt=(it[8]+1)/it[0],ft=G*U,yt=G*xt,vt=Y/(-U+xt),Bt=vt*-U;if(V.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Bt),H.translateZ(vt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),K[10]===-1)H.projectionMatrix.copy(V.projectionMatrix),H.projectionMatrixInverse.copy(V.projectionMatrixInverse);else{const Et=G+vt,D=ct+vt,L=ft-Bt,J=yt+(Y-Bt),st=at*ct/D*Et,ht=mt*ct/D*Et;H.projectionMatrix.makePerspective(L,J,st,ht,Et,D),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function k(H,V){V===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(V.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let V=H.near,tt=H.far;x.texture!==null&&(x.depthNear>0&&(V=x.depthNear),x.depthFar>0&&(tt=x.depthFar)),E.near=z.near=C.near=V,E.far=z.far=C.far=tt,(I!==E.near||X!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),I=E.near,X=E.far),C.layers.mask=H.layers.mask|2,z.layers.mask=H.layers.mask|4,E.layers.mask=C.layers.mask|z.layers.mask;const Y=H.parent,K=E.cameras;k(E,Y);for(let it=0;it<K.length;it++)k(K[it],Y);K.length===2?T(E,C,z):E.projectionMatrix.copy(C.projectionMatrix),F(H,E,Y)};function F(H,V,tt){tt===null?H.matrix.copy(V.matrixWorld):(H.matrix.copy(tt.matrixWorld),H.matrix.invert(),H.matrix.multiply(V.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(V.projectionMatrix),H.projectionMatrixInverse.copy(V.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Zs*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(H){c=H,d!==null&&(d.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(E)};let P=null;function N(H,V){if(u=V.getViewerPose(l||a),g=V,u!==null){const tt=u.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Y=!1;tt.length!==E.cameras.length&&(E.cameras.length=0,Y=!0);for(let it=0;it<tt.length;it++){const G=tt[it];let ct=null;if(f!==null)ct=f.getViewport(G);else{const mt=h.getViewSubImage(d,G);ct=mt.viewport,it===0&&(t.setRenderTargetTextures(y,mt.colorTexture,d.ignoreDepthValues?void 0:mt.depthStencilTexture),t.setRenderTarget(y))}let at=b[it];at===void 0&&(at=new tn,at.layers.enable(it),at.viewport=new ee,b[it]=at),at.matrix.fromArray(G.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(G.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(ct.x,ct.y,ct.width,ct.height),it===0&&(E.matrix.copy(at.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Y===!0&&E.cameras.push(at)}const K=s.enabledFeatures;if(K&&K.includes("depth-sensing")){const it=h.getDepthInformation(tt[0]);it&&it.isValid&&it.texture&&x.init(t,it,s.renderState)}}for(let tt=0;tt<v.length;tt++){const Y=_[tt],K=v[tt];Y!==null&&K!==void 0&&K.update(Y,V,l||a)}P&&P(H,V),V.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:V}),g=null}const j=new md;j.setAnimationLoop(N),this.setAnimationLoop=function(H){P=H},this.dispose=function(){}}}const Qi=new rn,Mv=new Ut;function bv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,fd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,v,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,y,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),v=y.envMap,_=y.envMapRotation;v&&(m.envMap.value=v,Qi.copy(_),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),m.envMapRotation.value.setFromMatrix4(Mv.makeRotationFromEuler(Qi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Sv(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const _=v.program;n.uniformBlockBinding(y,_)}function l(y,v){let _=s[y.id];_===void 0&&(g(y),_=u(y),s[y.id]=_,y.addEventListener("dispose",m));const A=v.program;n.updateUBOMapping(y,A);const w=t.render.frame;r[y.id]!==w&&(d(y),r[y.id]=w)}function u(y){const v=h();y.__bindingPointIndex=v;const _=i.createBuffer(),A=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const v=s[y.id],_=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,C=_.length;w<C;w++){const z=Array.isArray(_[w])?_[w]:[_[w]];for(let b=0,E=z.length;b<E;b++){const I=z[b];if(f(I,w,b,A)===!0){const X=I.__offset,W=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let M=0;M<W.length;M++){const S=W[M],R=x(S);typeof S=="number"||typeof S=="boolean"?(I.__data[0]=S,i.bufferSubData(i.UNIFORM_BUFFER,X+q,I.__data)):S.isMatrix3?(I.__data[0]=S.elements[0],I.__data[1]=S.elements[1],I.__data[2]=S.elements[2],I.__data[3]=0,I.__data[4]=S.elements[3],I.__data[5]=S.elements[4],I.__data[6]=S.elements[5],I.__data[7]=0,I.__data[8]=S.elements[6],I.__data[9]=S.elements[7],I.__data[10]=S.elements[8],I.__data[11]=0):(S.toArray(I.__data,q),q+=R.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,X,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,v,_,A){const w=y.value,C=v+"_"+_;if(A[C]===void 0)return typeof w=="number"||typeof w=="boolean"?A[C]=w:A[C]=w.clone(),!0;{const z=A[C];if(typeof w=="number"||typeof w=="boolean"){if(z!==w)return A[C]=w,!0}else if(z.equals(w)===!1)return z.copy(w),!0}return!1}function g(y){const v=y.uniforms;let _=0;const A=16;for(let C=0,z=v.length;C<z;C++){const b=Array.isArray(v[C])?v[C]:[v[C]];for(let E=0,I=b.length;E<I;E++){const X=b[E],W=Array.isArray(X.value)?X.value:[X.value];for(let q=0,M=W.length;q<M;q++){const S=W[q],R=x(S),T=_%A,k=T%R.boundary,F=T+k;_+=k,F!==0&&A-F<R.storage&&(_+=A-F),X.__data=new Float32Array(R.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=_,_+=R.storage}}}const w=_%A;return w>0&&(_+=A-w),y.__size=_,y.__cache={},this}function x(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const _=a.indexOf(v.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Av{constructor(t={}){const{canvas:e=um(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ne,this.toneMapping=Bi,this.toneMappingExposure=1;const _=this;let A=!1,w=0,C=0,z=null,b=-1,E=null;const I=new ee,X=new ee;let W=null;const q=new zt(0);let M=0,S=e.width,R=e.height,T=1,k=null,F=null;const P=new ee(0,0,S,R),N=new ee(0,0,S,R);let j=!1;const H=new Yr;let V=!1,tt=!1;const Y=new Ut,K=new Ut,it=new B,G=new ee,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function mt(){return z===null?T:1}let U=n;function xt(O,et){return e.getContext(O,et)}try{const O={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${pl}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",It,!1),e.addEventListener("webglcontextcreationerror",Pt,!1),U===null){const et="webgl2";if(U=xt(et,O),U===null)throw xt(et)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(O){throw console.error("THREE.WebGLRenderer: "+O.message),O}let ft,yt,vt,Bt,Et,D,L,J,st,ht,ut,At,Mt,Dt,dt,pt,_t,Ct,Nt,Tt,jt,Wt,Gt,Z;function wt(){ft=new Px(U),ft.init(),Wt=new pv(U,ft),yt=new Ax(U,ft,t,Wt),vt=new hv(U,ft),yt.reverseDepthBuffer&&d&&vt.buffers.depth.setReversed(!0),Bt=new Dx(U),Et=new $_,D=new dv(U,ft,vt,Et,yt,Wt,Bt),L=new Tx(_),J=new Cx(_),st=new Bm(U),Gt=new bx(U,st),ht=new Ix(U,st,Bt,Gt),ut=new Nx(U,ht,st,Bt),Nt=new zx(U,yt,D),pt=new wx(Et),At=new Z_(_,L,J,ft,yt,Gt,pt),Mt=new bv(_,Et),Dt=new Q_,dt=new rv(ft),Ct=new Mx(_,L,J,vt,ut,f,c),_t=new lv(_,ut,yt),Z=new Sv(U,Bt,yt,vt),Tt=new Sx(U,ft,Bt),jt=new Lx(U,ft,Bt),Bt.programs=At.programs,_.capabilities=yt,_.extensions=ft,_.properties=Et,_.renderLists=Dt,_.shadowMap=_t,_.state=vt,_.info=Bt}wt();const lt=new yv(_,U);this.xr=lt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const O=ft.get("WEBGL_lose_context");O&&O.loseContext()},this.forceContextRestore=function(){const O=ft.get("WEBGL_lose_context");O&&O.restoreContext()},this.getPixelRatio=function(){return T},this.setPixelRatio=function(O){O!==void 0&&(T=O,this.setSize(S,R,!1))},this.getSize=function(O){return O.set(S,R)},this.setSize=function(O,et,rt=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}S=O,R=et,e.width=Math.floor(O*T),e.height=Math.floor(et*T),rt===!0&&(e.style.width=O+"px",e.style.height=et+"px"),this.setViewport(0,0,O,et)},this.getDrawingBufferSize=function(O){return O.set(S*T,R*T).floor()},this.setDrawingBufferSize=function(O,et,rt){S=O,R=et,T=rt,e.width=Math.floor(O*rt),e.height=Math.floor(et*rt),this.setViewport(0,0,O,et)},this.getCurrentViewport=function(O){return O.copy(I)},this.getViewport=function(O){return O.copy(P)},this.setViewport=function(O,et,rt,ot){O.isVector4?P.set(O.x,O.y,O.z,O.w):P.set(O,et,rt,ot),vt.viewport(I.copy(P).multiplyScalar(T).round())},this.getScissor=function(O){return O.copy(N)},this.setScissor=function(O,et,rt,ot){O.isVector4?N.set(O.x,O.y,O.z,O.w):N.set(O,et,rt,ot),vt.scissor(X.copy(N).multiplyScalar(T).round())},this.getScissorTest=function(){return j},this.setScissorTest=function(O){vt.setScissorTest(j=O)},this.setOpaqueSort=function(O){k=O},this.setTransparentSort=function(O){F=O},this.getClearColor=function(O){return O.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor.apply(Ct,arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha.apply(Ct,arguments)},this.clear=function(O=!0,et=!0,rt=!0){let ot=0;if(O){let nt=!1;if(z!==null){const bt=z.texture.format;nt=bt===Sl||bt===bl||bt===Ml}if(nt){const bt=z.texture.type,Lt=bt===Mn||bt===ls||bt===Or||bt===Ks||bt===_l||bt===vl,kt=Ct.getClearColor(),Ot=Ct.getClearAlpha(),Kt=kt.r,Zt=kt.g,Ft=kt.b;Lt?(g[0]=Kt,g[1]=Zt,g[2]=Ft,g[3]=Ot,U.clearBufferuiv(U.COLOR,0,g)):(x[0]=Kt,x[1]=Zt,x[2]=Ft,x[3]=Ot,U.clearBufferiv(U.COLOR,0,x))}else ot|=U.COLOR_BUFFER_BIT}et&&(ot|=U.DEPTH_BUFFER_BIT),rt&&(ot|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",It,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),Dt.dispose(),dt.dispose(),Et.dispose(),L.dispose(),J.dispose(),ut.dispose(),Gt.dispose(),Z.dispose(),At.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",iu),lt.removeEventListener("sessionend",su),Yi.stop()};function gt(O){O.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function It(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const O=Bt.autoReset,et=_t.enabled,rt=_t.autoUpdate,ot=_t.needsUpdate,nt=_t.type;wt(),Bt.autoReset=O,_t.enabled=et,_t.autoUpdate=rt,_t.needsUpdate=ot,_t.type=nt}function Pt(O){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",O.statusMessage)}function Yt(O){const et=O.target;et.removeEventListener("dispose",Yt),Me(et)}function Me(O){Ue(O),Et.remove(O)}function Ue(O){const et=Et.get(O).programs;et!==void 0&&(et.forEach(function(rt){At.releaseProgram(rt)}),O.isShaderMaterial&&At.releaseShaderCache(O))}this.renderBufferDirect=function(O,et,rt,ot,nt,bt){et===null&&(et=ct);const Lt=nt.isMesh&&nt.matrixWorld.determinant()<0,kt=ip(O,et,rt,ot,nt);vt.setMaterial(ot,Lt);let Ot=rt.index,Kt=1;if(ot.wireframe===!0){if(Ot=ht.getWireframeAttribute(rt),Ot===void 0)return;Kt=2}const Zt=rt.drawRange,Ft=rt.attributes.position;let oe=Zt.start*Kt,ve=(Zt.start+Zt.count)*Kt;bt!==null&&(oe=Math.max(oe,bt.start*Kt),ve=Math.min(ve,(bt.start+bt.count)*Kt)),Ot!==null?(oe=Math.max(oe,0),ve=Math.min(ve,Ot.count)):Ft!=null&&(oe=Math.max(oe,0),ve=Math.min(ve,Ft.count));const be=ve-oe;if(be<0||be===1/0)return;Gt.setup(nt,ot,kt,rt,Ot);let an,ue=Tt;if(Ot!==null&&(an=st.get(Ot),ue=jt,ue.setIndex(an)),nt.isMesh)ot.wireframe===!0?(vt.setLineWidth(ot.wireframeLinewidth*mt()),ue.setMode(U.LINES)):ue.setMode(U.TRIANGLES);else if(nt.isLine){let Ht=ot.linewidth;Ht===void 0&&(Ht=1),vt.setLineWidth(Ht*mt()),nt.isLineSegments?ue.setMode(U.LINES):nt.isLineLoop?ue.setMode(U.LINE_LOOP):ue.setMode(U.LINE_STRIP)}else nt.isPoints?ue.setMode(U.POINTS):nt.isSprite&&ue.setMode(U.TRIANGLES);if(nt.isBatchedMesh)if(nt._multiDrawInstances!==null)ue.renderMultiDrawInstances(nt._multiDrawStarts,nt._multiDrawCounts,nt._multiDrawCount,nt._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))ue.renderMultiDraw(nt._multiDrawStarts,nt._multiDrawCounts,nt._multiDrawCount);else{const Ht=nt._multiDrawStarts,Jn=nt._multiDrawCounts,he=nt._multiDrawCount,An=Ot?st.get(Ot).bytesPerElement:1,ds=Et.get(ot).currentProgram.getUniforms();for(let un=0;un<he;un++)ds.setValue(U,"_gl_DrawID",un),ue.render(Ht[un]/An,Jn[un])}else if(nt.isInstancedMesh)ue.renderInstances(oe,be,nt.count);else if(rt.isInstancedBufferGeometry){const Ht=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Jn=Math.min(rt.instanceCount,Ht);ue.renderInstances(oe,be,Jn)}else ue.render(oe,be)};function ae(O,et,rt){O.transparent===!0&&O.side===en&&O.forceSinglePass===!1?(O.side=nn,O.needsUpdate=!0,$r(O,et,rt),O.side=mi,O.needsUpdate=!0,$r(O,et,rt),O.side=en):$r(O,et,rt)}this.compile=function(O,et,rt=null){rt===null&&(rt=O),p=dt.get(rt),p.init(et),v.push(p),rt.traverseVisible(function(nt){nt.isLight&&nt.layers.test(et.layers)&&(p.pushLight(nt),nt.castShadow&&p.pushShadow(nt))}),O!==rt&&O.traverseVisible(function(nt){nt.isLight&&nt.layers.test(et.layers)&&(p.pushLight(nt),nt.castShadow&&p.pushShadow(nt))}),p.setupLights();const ot=new Set;return O.traverse(function(nt){if(!(nt.isMesh||nt.isPoints||nt.isLine||nt.isSprite))return;const bt=nt.material;if(bt)if(Array.isArray(bt))for(let Lt=0;Lt<bt.length;Lt++){const kt=bt[Lt];ae(kt,rt,nt),ot.add(kt)}else ae(bt,rt,nt),ot.add(bt)}),v.pop(),p=null,ot},this.compileAsync=function(O,et,rt=null){const ot=this.compile(O,et,rt);return new Promise(nt=>{function bt(){if(ot.forEach(function(Lt){Et.get(Lt).currentProgram.isReady()&&ot.delete(Lt)}),ot.size===0){nt(O);return}setTimeout(bt,10)}ft.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let Sn=null;function $n(O){Sn&&Sn(O)}function iu(){Yi.stop()}function su(){Yi.start()}const Yi=new md;Yi.setAnimationLoop($n),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(O){Sn=O,lt.setAnimationLoop(O),O===null?Yi.stop():Yi.start()},lt.addEventListener("sessionstart",iu),lt.addEventListener("sessionend",su),this.render=function(O,et){if(et!==void 0&&et.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),et.parent===null&&et.matrixWorldAutoUpdate===!0&&et.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(et),et=lt.getCamera()),O.isScene===!0&&O.onBeforeRender(_,O,et,z),p=dt.get(O,v.length),p.init(et),v.push(p),K.multiplyMatrices(et.projectionMatrix,et.matrixWorldInverse),H.setFromProjectionMatrix(K),tt=this.localClippingEnabled,V=pt.init(this.clippingPlanes,tt),m=Dt.get(O,y.length),m.init(),y.push(m),lt.enabled===!0&&lt.isPresenting===!0){const bt=_.xr.getDepthSensingMesh();bt!==null&&po(bt,et,-1/0,_.sortObjects)}po(O,et,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(k,F),at=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,at&&Ct.addToRenderList(m,O),this.info.render.frame++,V===!0&&pt.beginShadows();const rt=p.state.shadowsArray;_t.render(rt,O,et),V===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();const ot=m.opaque,nt=m.transmissive;if(p.setupLights(),et.isArrayCamera){const bt=et.cameras;if(nt.length>0)for(let Lt=0,kt=bt.length;Lt<kt;Lt++){const Ot=bt[Lt];au(ot,nt,O,Ot)}at&&Ct.render(O);for(let Lt=0,kt=bt.length;Lt<kt;Lt++){const Ot=bt[Lt];ru(m,O,Ot,Ot.viewport)}}else nt.length>0&&au(ot,nt,O,et),at&&Ct.render(O),ru(m,O,et);z!==null&&(D.updateMultisampleRenderTarget(z),D.updateRenderTargetMipmap(z)),O.isScene===!0&&O.onAfterRender(_,O,et),Gt.resetDefaultState(),b=-1,E=null,v.pop(),v.length>0?(p=v[v.length-1],V===!0&&pt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function po(O,et,rt,ot){if(O.visible===!1)return;if(O.layers.test(et.layers)){if(O.isGroup)rt=O.renderOrder;else if(O.isLOD)O.autoUpdate===!0&&O.update(et);else if(O.isLight)p.pushLight(O),O.castShadow&&p.pushShadow(O);else if(O.isSprite){if(!O.frustumCulled||H.intersectsSprite(O)){ot&&G.setFromMatrixPosition(O.matrixWorld).applyMatrix4(K);const Lt=ut.update(O),kt=O.material;kt.visible&&m.push(O,Lt,kt,rt,G.z,null)}}else if((O.isMesh||O.isLine||O.isPoints)&&(!O.frustumCulled||H.intersectsObject(O))){const Lt=ut.update(O),kt=O.material;if(ot&&(O.boundingSphere!==void 0?(O.boundingSphere===null&&O.computeBoundingSphere(),G.copy(O.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),G.copy(Lt.boundingSphere.center)),G.applyMatrix4(O.matrixWorld).applyMatrix4(K)),Array.isArray(kt)){const Ot=Lt.groups;for(let Kt=0,Zt=Ot.length;Kt<Zt;Kt++){const Ft=Ot[Kt],oe=kt[Ft.materialIndex];oe&&oe.visible&&m.push(O,Lt,oe,rt,G.z,Ft)}}else kt.visible&&m.push(O,Lt,kt,rt,G.z,null)}}const bt=O.children;for(let Lt=0,kt=bt.length;Lt<kt;Lt++)po(bt[Lt],et,rt,ot)}function ru(O,et,rt,ot){const nt=O.opaque,bt=O.transmissive,Lt=O.transparent;p.setupLightsView(rt),V===!0&&pt.setGlobalState(_.clippingPlanes,rt),ot&&vt.viewport(I.copy(ot)),nt.length>0&&Zr(nt,et,rt),bt.length>0&&Zr(bt,et,rt),Lt.length>0&&Zr(Lt,et,rt),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function au(O,et,rt,ot){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ot.id]===void 0&&(p.state.transmissionRenderTarget[ot.id]=new gi(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?nr:Mn,minFilter:pn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace}));const bt=p.state.transmissionRenderTarget[ot.id],Lt=ot.viewport||I;bt.setSize(Lt.z,Lt.w);const kt=_.getRenderTarget();_.setRenderTarget(bt),_.getClearColor(q),M=_.getClearAlpha(),M<1&&_.setClearColor(16777215,.5),_.clear(),at&&Ct.render(rt);const Ot=_.toneMapping;_.toneMapping=Bi;const Kt=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),p.setupLightsView(ot),V===!0&&pt.setGlobalState(_.clippingPlanes,ot),Zr(O,rt,ot),D.updateMultisampleRenderTarget(bt),D.updateRenderTargetMipmap(bt),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let Ft=0,oe=et.length;Ft<oe;Ft++){const ve=et[Ft],be=ve.object,an=ve.geometry,ue=ve.material,Ht=ve.group;if(ue.side===en&&be.layers.test(ot.layers)){const Jn=ue.side;ue.side=nn,ue.needsUpdate=!0,ou(be,rt,ot,an,ue,Ht),ue.side=Jn,ue.needsUpdate=!0,Zt=!0}}Zt===!0&&(D.updateMultisampleRenderTarget(bt),D.updateRenderTargetMipmap(bt))}_.setRenderTarget(kt),_.setClearColor(q,M),Kt!==void 0&&(ot.viewport=Kt),_.toneMapping=Ot}function Zr(O,et,rt){const ot=et.isScene===!0?et.overrideMaterial:null;for(let nt=0,bt=O.length;nt<bt;nt++){const Lt=O[nt],kt=Lt.object,Ot=Lt.geometry,Kt=ot===null?Lt.material:ot,Zt=Lt.group;kt.layers.test(rt.layers)&&ou(kt,et,rt,Ot,Kt,Zt)}}function ou(O,et,rt,ot,nt,bt){O.onBeforeRender(_,et,rt,ot,nt,bt),O.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,O.matrixWorld),O.normalMatrix.getNormalMatrix(O.modelViewMatrix),nt.onBeforeRender(_,et,rt,ot,O,bt),nt.transparent===!0&&nt.side===en&&nt.forceSinglePass===!1?(nt.side=nn,nt.needsUpdate=!0,_.renderBufferDirect(rt,et,ot,nt,O,bt),nt.side=mi,nt.needsUpdate=!0,_.renderBufferDirect(rt,et,ot,nt,O,bt),nt.side=en):_.renderBufferDirect(rt,et,ot,nt,O,bt),O.onAfterRender(_,et,rt,ot,nt,bt)}function $r(O,et,rt){et.isScene!==!0&&(et=ct);const ot=Et.get(O),nt=p.state.lights,bt=p.state.shadowsArray,Lt=nt.state.version,kt=At.getParameters(O,nt.state,bt,et,rt),Ot=At.getProgramCacheKey(kt);let Kt=ot.programs;ot.environment=O.isMeshStandardMaterial?et.environment:null,ot.fog=et.fog,ot.envMap=(O.isMeshStandardMaterial?J:L).get(O.envMap||ot.environment),ot.envMapRotation=ot.environment!==null&&O.envMap===null?et.environmentRotation:O.envMapRotation,Kt===void 0&&(O.addEventListener("dispose",Yt),Kt=new Map,ot.programs=Kt);let Zt=Kt.get(Ot);if(Zt!==void 0){if(ot.currentProgram===Zt&&ot.lightsStateVersion===Lt)return lu(O,kt),Zt}else kt.uniforms=At.getUniforms(O),O.onBeforeCompile(kt,_),Zt=At.acquireProgram(kt,Ot),Kt.set(Ot,Zt),ot.uniforms=kt.uniforms;const Ft=ot.uniforms;return(!O.isShaderMaterial&&!O.isRawShaderMaterial||O.clipping===!0)&&(Ft.clippingPlanes=pt.uniform),lu(O,kt),ot.needsLights=rp(O),ot.lightsStateVersion=Lt,ot.needsLights&&(Ft.ambientLightColor.value=nt.state.ambient,Ft.lightProbe.value=nt.state.probe,Ft.directionalLights.value=nt.state.directional,Ft.directionalLightShadows.value=nt.state.directionalShadow,Ft.spotLights.value=nt.state.spot,Ft.spotLightShadows.value=nt.state.spotShadow,Ft.rectAreaLights.value=nt.state.rectArea,Ft.ltc_1.value=nt.state.rectAreaLTC1,Ft.ltc_2.value=nt.state.rectAreaLTC2,Ft.pointLights.value=nt.state.point,Ft.pointLightShadows.value=nt.state.pointShadow,Ft.hemisphereLights.value=nt.state.hemi,Ft.directionalShadowMap.value=nt.state.directionalShadowMap,Ft.directionalShadowMatrix.value=nt.state.directionalShadowMatrix,Ft.spotShadowMap.value=nt.state.spotShadowMap,Ft.spotLightMatrix.value=nt.state.spotLightMatrix,Ft.spotLightMap.value=nt.state.spotLightMap,Ft.pointShadowMap.value=nt.state.pointShadowMap,Ft.pointShadowMatrix.value=nt.state.pointShadowMatrix),ot.currentProgram=Zt,ot.uniformsList=null,Zt}function cu(O){if(O.uniformsList===null){const et=O.currentProgram.getUniforms();O.uniformsList=Ya.seqWithValue(et.seq,O.uniforms)}return O.uniformsList}function lu(O,et){const rt=Et.get(O);rt.outputColorSpace=et.outputColorSpace,rt.batching=et.batching,rt.batchingColor=et.batchingColor,rt.instancing=et.instancing,rt.instancingColor=et.instancingColor,rt.instancingMorph=et.instancingMorph,rt.skinning=et.skinning,rt.morphTargets=et.morphTargets,rt.morphNormals=et.morphNormals,rt.morphColors=et.morphColors,rt.morphTargetsCount=et.morphTargetsCount,rt.numClippingPlanes=et.numClippingPlanes,rt.numIntersection=et.numClipIntersection,rt.vertexAlphas=et.vertexAlphas,rt.vertexTangents=et.vertexTangents,rt.toneMapping=et.toneMapping}function ip(O,et,rt,ot,nt){et.isScene!==!0&&(et=ct),D.resetTextureUnits();const bt=et.fog,Lt=ot.isMeshStandardMaterial?et.environment:null,kt=z===null?_.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:sn,Ot=(ot.isMeshStandardMaterial?J:L).get(ot.envMap||Lt),Kt=ot.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,Zt=!!rt.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),Ft=!!rt.morphAttributes.position,oe=!!rt.morphAttributes.normal,ve=!!rt.morphAttributes.color;let be=Bi;ot.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(be=_.toneMapping);const an=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,ue=an!==void 0?an.length:0,Ht=Et.get(ot),Jn=p.state.lights;if(V===!0&&(tt===!0||O!==E)){const mn=O===E&&ot.id===b;pt.setState(ot,O,mn)}let he=!1;ot.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==Jn.state.version||Ht.outputColorSpace!==kt||nt.isBatchedMesh&&Ht.batching===!1||!nt.isBatchedMesh&&Ht.batching===!0||nt.isBatchedMesh&&Ht.batchingColor===!0&&nt.colorTexture===null||nt.isBatchedMesh&&Ht.batchingColor===!1&&nt.colorTexture!==null||nt.isInstancedMesh&&Ht.instancing===!1||!nt.isInstancedMesh&&Ht.instancing===!0||nt.isSkinnedMesh&&Ht.skinning===!1||!nt.isSkinnedMesh&&Ht.skinning===!0||nt.isInstancedMesh&&Ht.instancingColor===!0&&nt.instanceColor===null||nt.isInstancedMesh&&Ht.instancingColor===!1&&nt.instanceColor!==null||nt.isInstancedMesh&&Ht.instancingMorph===!0&&nt.morphTexture===null||nt.isInstancedMesh&&Ht.instancingMorph===!1&&nt.morphTexture!==null||Ht.envMap!==Ot||ot.fog===!0&&Ht.fog!==bt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==pt.numPlanes||Ht.numIntersection!==pt.numIntersection)||Ht.vertexAlphas!==Kt||Ht.vertexTangents!==Zt||Ht.morphTargets!==Ft||Ht.morphNormals!==oe||Ht.morphColors!==ve||Ht.toneMapping!==be||Ht.morphTargetsCount!==ue)&&(he=!0):(he=!0,Ht.__version=ot.version);let An=Ht.currentProgram;he===!0&&(An=$r(ot,et,nt));let ds=!1,un=!1,lr=!1;const Se=An.getUniforms(),On=Ht.uniforms;if(vt.useProgram(An.program)&&(ds=!0,un=!0,lr=!0),ot.id!==b&&(b=ot.id,un=!0),ds||E!==O){vt.buffers.depth.getReversed()?(Y.copy(O.projectionMatrix),fm(Y),dm(Y),Se.setValue(U,"projectionMatrix",Y)):Se.setValue(U,"projectionMatrix",O.projectionMatrix),Se.setValue(U,"viewMatrix",O.matrixWorldInverse);const vi=Se.map.cameraPosition;vi!==void 0&&vi.setValue(U,it.setFromMatrixPosition(O.matrixWorld)),yt.logarithmicDepthBuffer&&Se.setValue(U,"logDepthBufFC",2/(Math.log(O.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Se.setValue(U,"isOrthographic",O.isOrthographicCamera===!0),E!==O&&(E=O,un=!0,lr=!0)}if(nt.isSkinnedMesh){Se.setOptional(U,nt,"bindMatrix"),Se.setOptional(U,nt,"bindMatrixInverse");const mn=nt.skeleton;mn&&(mn.boneTexture===null&&mn.computeBoneTexture(),Se.setValue(U,"boneTexture",mn.boneTexture,D))}nt.isBatchedMesh&&(Se.setOptional(U,nt,"batchingTexture"),Se.setValue(U,"batchingTexture",nt._matricesTexture,D),Se.setOptional(U,nt,"batchingIdTexture"),Se.setValue(U,"batchingIdTexture",nt._indirectTexture,D),Se.setOptional(U,nt,"batchingColorTexture"),nt._colorsTexture!==null&&Se.setValue(U,"batchingColorTexture",nt._colorsTexture,D));const ur=rt.morphAttributes;if((ur.position!==void 0||ur.normal!==void 0||ur.color!==void 0)&&Nt.update(nt,rt,An),(un||Ht.receiveShadow!==nt.receiveShadow)&&(Ht.receiveShadow=nt.receiveShadow,Se.setValue(U,"receiveShadow",nt.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(On.envMap.value=Ot,On.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&et.environment!==null&&(On.envMapIntensity.value=et.environmentIntensity),un&&(Se.setValue(U,"toneMappingExposure",_.toneMappingExposure),Ht.needsLights&&sp(On,lr),bt&&ot.fog===!0&&Mt.refreshFogUniforms(On,bt),Mt.refreshMaterialUniforms(On,ot,T,R,p.state.transmissionRenderTarget[O.id]),Ya.upload(U,cu(Ht),On,D)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(Ya.upload(U,cu(Ht),On,D),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Se.setValue(U,"center",nt.center),Se.setValue(U,"modelViewMatrix",nt.modelViewMatrix),Se.setValue(U,"normalMatrix",nt.normalMatrix),Se.setValue(U,"modelMatrix",nt.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){const mn=ot.uniformsGroups;for(let vi=0,yi=mn.length;vi<yi;vi++){const uu=mn[vi];Z.update(uu,An),Z.bind(uu,An)}}return An}function sp(O,et){O.ambientLightColor.needsUpdate=et,O.lightProbe.needsUpdate=et,O.directionalLights.needsUpdate=et,O.directionalLightShadows.needsUpdate=et,O.pointLights.needsUpdate=et,O.pointLightShadows.needsUpdate=et,O.spotLights.needsUpdate=et,O.spotLightShadows.needsUpdate=et,O.rectAreaLights.needsUpdate=et,O.hemisphereLights.needsUpdate=et}function rp(O){return O.isMeshLambertMaterial||O.isMeshToonMaterial||O.isMeshPhongMaterial||O.isMeshStandardMaterial||O.isShadowMaterial||O.isShaderMaterial&&O.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(O,et,rt){Et.get(O.texture).__webglTexture=et,Et.get(O.depthTexture).__webglTexture=rt;const ot=Et.get(O);ot.__hasExternalTextures=!0,ot.__autoAllocateDepthBuffer=rt===void 0,ot.__autoAllocateDepthBuffer||ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ot.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(O,et){const rt=Et.get(O);rt.__webglFramebuffer=et,rt.__useDefaultFramebuffer=et===void 0},this.setRenderTarget=function(O,et=0,rt=0){z=O,w=et,C=rt;let ot=!0,nt=null,bt=!1,Lt=!1;if(O){const Ot=Et.get(O);if(Ot.__useDefaultFramebuffer!==void 0)vt.bindFramebuffer(U.FRAMEBUFFER,null),ot=!1;else if(Ot.__webglFramebuffer===void 0)D.setupRenderTarget(O);else if(Ot.__hasExternalTextures)D.rebindTextures(O,Et.get(O.texture).__webglTexture,Et.get(O.depthTexture).__webglTexture);else if(O.depthBuffer){const Ft=O.depthTexture;if(Ot.__boundDepthTexture!==Ft){if(Ft!==null&&Et.has(Ft)&&(O.width!==Ft.image.width||O.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(O)}}const Kt=O.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Lt=!0);const Zt=Et.get(O).__webglFramebuffer;O.isWebGLCubeRenderTarget?(Array.isArray(Zt[et])?nt=Zt[et][rt]:nt=Zt[et],bt=!0):O.samples>0&&D.useMultisampledRTT(O)===!1?nt=Et.get(O).__webglMultisampledFramebuffer:Array.isArray(Zt)?nt=Zt[rt]:nt=Zt,I.copy(O.viewport),X.copy(O.scissor),W=O.scissorTest}else I.copy(P).multiplyScalar(T).floor(),X.copy(N).multiplyScalar(T).floor(),W=j;if(vt.bindFramebuffer(U.FRAMEBUFFER,nt)&&ot&&vt.drawBuffers(O,nt),vt.viewport(I),vt.scissor(X),vt.setScissorTest(W),bt){const Ot=Et.get(O.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ot.__webglTexture,rt)}else if(Lt){const Ot=Et.get(O.texture),Kt=et||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ot.__webglTexture,rt||0,Kt)}b=-1},this.readRenderTargetPixels=function(O,et,rt,ot,nt,bt,Lt){if(!(O&&O.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=Et.get(O).__webglFramebuffer;if(O.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){vt.bindFramebuffer(U.FRAMEBUFFER,kt);try{const Ot=O.texture,Kt=Ot.format,Zt=Ot.type;if(!yt.textureFormatReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}et>=0&&et<=O.width-ot&&rt>=0&&rt<=O.height-nt&&U.readPixels(et,rt,ot,nt,Wt.convert(Kt),Wt.convert(Zt),bt)}finally{const Ot=z!==null?Et.get(z).__webglFramebuffer:null;vt.bindFramebuffer(U.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(O,et,rt,ot,nt,bt,Lt){if(!(O&&O.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=Et.get(O).__webglFramebuffer;if(O.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){const Ot=O.texture,Kt=Ot.format,Zt=Ot.type;if(!yt.textureFormatReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(et>=0&&et<=O.width-ot&&rt>=0&&rt<=O.height-nt){vt.bindFramebuffer(U.FRAMEBUFFER,kt);const Ft=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ft),U.bufferData(U.PIXEL_PACK_BUFFER,bt.byteLength,U.STREAM_READ),U.readPixels(et,rt,ot,nt,Wt.convert(Kt),Wt.convert(Zt),0);const oe=z!==null?Et.get(z).__webglFramebuffer:null;vt.bindFramebuffer(U.FRAMEBUFFER,oe);const ve=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await hm(U,ve,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ft),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,bt),U.deleteBuffer(Ft),U.deleteSync(ve),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(O,et=null,rt=0){O.isTexture!==!0&&(Ar("WebGLRenderer: copyFramebufferToTexture function signature has changed."),et=arguments[0]||null,O=arguments[1]);const ot=Math.pow(2,-rt),nt=Math.floor(O.image.width*ot),bt=Math.floor(O.image.height*ot),Lt=et!==null?et.x:0,kt=et!==null?et.y:0;D.setTexture2D(O,0),U.copyTexSubImage2D(U.TEXTURE_2D,rt,0,0,Lt,kt,nt,bt),vt.unbindTexture()},this.copyTextureToTexture=function(O,et,rt=null,ot=null,nt=0){O.isTexture!==!0&&(Ar("WebGLRenderer: copyTextureToTexture function signature has changed."),ot=arguments[0]||null,O=arguments[1],et=arguments[2],nt=arguments[3]||0,rt=null);let bt,Lt,kt,Ot,Kt,Zt,Ft,oe,ve;const be=O.isCompressedTexture?O.mipmaps[nt]:O.image;rt!==null?(bt=rt.max.x-rt.min.x,Lt=rt.max.y-rt.min.y,kt=rt.isBox3?rt.max.z-rt.min.z:1,Ot=rt.min.x,Kt=rt.min.y,Zt=rt.isBox3?rt.min.z:0):(bt=be.width,Lt=be.height,kt=be.depth||1,Ot=0,Kt=0,Zt=0),ot!==null?(Ft=ot.x,oe=ot.y,ve=ot.z):(Ft=0,oe=0,ve=0);const an=Wt.convert(et.format),ue=Wt.convert(et.type);let Ht;et.isData3DTexture?(D.setTexture3D(et,0),Ht=U.TEXTURE_3D):et.isDataArrayTexture||et.isCompressedArrayTexture?(D.setTexture2DArray(et,0),Ht=U.TEXTURE_2D_ARRAY):(D.setTexture2D(et,0),Ht=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,et.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,et.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,et.unpackAlignment);const Jn=U.getParameter(U.UNPACK_ROW_LENGTH),he=U.getParameter(U.UNPACK_IMAGE_HEIGHT),An=U.getParameter(U.UNPACK_SKIP_PIXELS),ds=U.getParameter(U.UNPACK_SKIP_ROWS),un=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,be.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,be.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ot),U.pixelStorei(U.UNPACK_SKIP_ROWS,Kt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Zt);const lr=O.isDataArrayTexture||O.isData3DTexture,Se=et.isDataArrayTexture||et.isData3DTexture;if(O.isRenderTargetTexture||O.isDepthTexture){const On=Et.get(O),ur=Et.get(et),mn=Et.get(On.__renderTarget),vi=Et.get(ur.__renderTarget);vt.bindFramebuffer(U.READ_FRAMEBUFFER,mn.__webglFramebuffer),vt.bindFramebuffer(U.DRAW_FRAMEBUFFER,vi.__webglFramebuffer);for(let yi=0;yi<kt;yi++)lr&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Et.get(O).__webglTexture,nt,Zt+yi),O.isDepthTexture?(Se&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Et.get(et).__webglTexture,nt,ve+yi),U.blitFramebuffer(Ot,Kt,bt,Lt,Ft,oe,bt,Lt,U.DEPTH_BUFFER_BIT,U.NEAREST)):Se?U.copyTexSubImage3D(Ht,nt,Ft,oe,ve+yi,Ot,Kt,bt,Lt):U.copyTexSubImage2D(Ht,nt,Ft,oe,ve+yi,Ot,Kt,bt,Lt);vt.bindFramebuffer(U.READ_FRAMEBUFFER,null),vt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Se?O.isDataTexture||O.isData3DTexture?U.texSubImage3D(Ht,nt,Ft,oe,ve,bt,Lt,kt,an,ue,be.data):et.isCompressedArrayTexture?U.compressedTexSubImage3D(Ht,nt,Ft,oe,ve,bt,Lt,kt,an,be.data):U.texSubImage3D(Ht,nt,Ft,oe,ve,bt,Lt,kt,an,ue,be):O.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,nt,Ft,oe,bt,Lt,an,ue,be.data):O.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,nt,Ft,oe,be.width,be.height,an,be.data):U.texSubImage2D(U.TEXTURE_2D,nt,Ft,oe,bt,Lt,an,ue,be);U.pixelStorei(U.UNPACK_ROW_LENGTH,Jn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,he),U.pixelStorei(U.UNPACK_SKIP_PIXELS,An),U.pixelStorei(U.UNPACK_SKIP_ROWS,ds),U.pixelStorei(U.UNPACK_SKIP_IMAGES,un),nt===0&&et.generateMipmaps&&U.generateMipmap(Ht),vt.unbindTexture()},this.copyTextureToTexture3D=function(O,et,rt=null,ot=null,nt=0){return O.isTexture!==!0&&(Ar("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,ot=arguments[1]||null,O=arguments[2],et=arguments[3],nt=arguments[4]||0),Ar('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(O,et,rt,ot,nt)},this.initRenderTarget=function(O){Et.get(O).__webglFramebuffer===void 0&&D.setupRenderTarget(O)},this.initTexture=function(O){O.isCubeTexture?D.setTextureCube(O,0):O.isData3DTexture?D.setTexture3D(O,0):O.isDataArrayTexture||O.isCompressedArrayTexture?D.setTexture2DArray(O,0):D.setTexture2D(O,0),vt.unbindTexture()},this.resetState=function(){w=0,C=0,z=null,vt.reset(),Gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}}class Ll{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new Ll(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ka extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Md{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Jc,this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $e=new B;class Gr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new xe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Gr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const uh=new B,hh=new ee,fh=new ee,wv=new B,dh=new Ut,va=new B,Vo=new ln,ph=new Ut,Wo=new ir;class Tv extends ne{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=mu,this.bindMatrix=new Ut,this.bindMatrixInverse=new Ut,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new _i),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,va),this.boundingBox.expandByPoint(va)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ln),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,va),this.boundingSphere.expandByPoint(va)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vo.copy(this.boundingSphere),Vo.applyMatrix4(s),t.ray.intersectsSphere(Vo)!==!1&&(ph.copy(s).invert(),Wo.copy(t.ray).applyMatrix4(ph),!(this.boundingBox!==null&&Wo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Wo)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ee,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===mu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;hh.fromBufferAttribute(s.attributes.skinIndex,t),fh.fromBufferAttribute(s.attributes.skinWeight,t),uh.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const a=fh.getComponent(r);if(a!==0){const o=hh.getComponent(r);dh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(wv.copy(uh).applyMatrix4(dh),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class bd extends Te{constructor(){super(),this.isBone=!0,this.type="Bone"}}class hs extends Be{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Ye,u=Ye,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const mh=new Ut,Ev=new Ut;class Dl{constructor(t=[],e=[]){this.uuid=Nn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ut)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Ut;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=t.length;r<a;r++){const o=t[r]?t[r].matrixWorld:Ev;mh.multiplyMatrices(o,e[r]),mh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Dl(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new hs(e,t,t,Xe,yn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let a=e[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new bd),this.bones.push(a),this.boneInverses.push(new Ut().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const a=e[s];t.bones.push(a.uuid);const o=n[s];t.boneInverses.push(o.toArray())}return t}}class ui extends xe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Rs=new Ut,gh=new Ut,ya=[],xh=new _i,Rv=new Ut,mr=new ne,gr=new ln;class rr extends ne{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ui(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Rv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new _i),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),xh.copy(t.boundingBox).applyMatrix4(Rs),this.boundingBox.union(xh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ln),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),gr.copy(t.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(gr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(mr.geometry=this.geometry,mr.material=this.material,mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gr.copy(this.boundingSphere),gr.applyMatrix4(n),t.ray.intersectsSphere(gr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Rs),gh.multiplyMatrices(n,Rs),mr.matrixWorld=gh,mr.raycast(t,ya);for(let a=0,o=ya.length;a<o;a++){const c=ya[a];c.instanceId=r,c.object=this,e.push(c)}ya.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ui(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hs(new Float32Array(s*this.count),s,this.count,yl,yn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Sd extends Un{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ja=new B,Qa=new B,_h=new Ut,xr=new ir,Ma=new ln,Xo=new B,vh=new B;class zl extends Te{constructor(t=new le,e=new Sd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ja.fromBufferAttribute(e,s-1),Qa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ja.distanceTo(Qa);t.setAttribute("lineDistance",new Vt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ma.copy(n.boundingSphere),Ma.applyMatrix4(s),Ma.radius+=r,t.ray.intersectsSphere(Ma)===!1)return;_h.copy(s).invert(),xr.copy(t.ray).applyMatrix4(_h);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=u.getX(x),y=u.getX(x+1),v=ba(this,t,xr,c,p,y);v&&e.push(v)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(f),p=ba(this,t,xr,c,x,m);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=ba(this,t,xr,c,x,x+1);p&&e.push(p)}if(this.isLineLoop){const x=ba(this,t,xr,c,g-1,f);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ba(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(Ja.fromBufferAttribute(a,s),Qa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ja,Qa,Xo,vh)>n)return;Xo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Xo);if(!(c<t.near||c>t.far))return{distance:c,point:vh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const yh=new B,Mh=new B;class Cv extends zl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)yh.fromBufferAttribute(e,s),Mh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+yh.distanceTo(Mh);t.setAttribute("lineDistance",new Vt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Pv extends zl{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Ad extends Un{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const bh=new Ut,tl=new ir,Sa=new ln,Aa=new B;class Iv extends Te{constructor(t=new le,e=new Ad){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sa.copy(n.boundingSphere),Sa.applyMatrix4(s),Sa.radius+=r,t.ray.intersectsSphere(Sa)===!1)return;bh.copy(s).invert(),tl.copy(t.ray).applyMatrix4(bh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,x=f;g<x;g++){const m=l.getX(g);Aa.fromBufferAttribute(h,m),Sh(Aa,m,c,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,x=f;g<x;g++)Aa.fromBufferAttribute(h,g),Sh(Aa,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Sh(i,t,e,n,s,r,a){const o=tl.distanceSqToPoint(i);if(o<e){const c=new B;tl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Lv extends Be{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Kn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(a-u)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new St:new B);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new B,s=[],r=[],a=[],o=new B,c=new Ut;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new B)}r[0]=new B,a[0]=new B;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ie(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ie(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Nl extends Kn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new St){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Dv extends Nl{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ul(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const wa=new B,jo=new Ul,Yo=new Ul,Ko=new Ul;class zv extends Kn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new B){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(wa.subVectors(s[0],s[1]).add(s[0]),l=wa);const h=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(wa.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=wa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),jo.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,x,m),Yo.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,x,m),Ko.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(jo.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Yo.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Ko.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(jo.calc(c),Yo.calc(c),Ko.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new B().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ah(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function Nv(i,t){const e=1-i;return e*e*t}function Uv(i,t){return 2*(1-i)*i*t}function kv(i,t){return i*i*t}function Ir(i,t,e,n){return Nv(i,t)+Uv(i,e)+kv(i,n)}function Ov(i,t){const e=1-i;return e*e*e*t}function Fv(i,t){const e=1-i;return 3*e*e*i*t}function Bv(i,t){return 3*(1-i)*i*i*t}function Hv(i,t){return i*i*i*t}function Lr(i,t,e,n,s){return Ov(i,t)+Fv(i,e)+Bv(i,n)+Hv(i,s)}class wd extends Kn{constructor(t=new St,e=new St,n=new St,s=new St){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new St){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Lr(t,s.x,r.x,a.x,o.x),Lr(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gv extends Kn{constructor(t=new B,e=new B,n=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new B){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Lr(t,s.x,r.x,a.x,o.x),Lr(t,s.y,r.y,a.y,o.y),Lr(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Td extends Kn{constructor(t=new St,e=new St){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new St){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new St){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vv extends Kn{constructor(t=new B,e=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new B){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new B){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ed extends Kn{constructor(t=new St,e=new St,n=new St){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new St){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ir(t,s.x,r.x,a.x),Ir(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wv extends Kn{constructor(t=new B,e=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new B){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ir(t,s.x,r.x,a.x),Ir(t,s.y,r.y,a.y),Ir(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rd extends Kn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new St){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Ah(o,c.x,l.x,u.x,h.x),Ah(o,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new St().fromArray(s))}return this}}var wh=Object.freeze({__proto__:null,ArcCurve:Dv,CatmullRomCurve3:zv,CubicBezierCurve:wd,CubicBezierCurve3:Gv,EllipseCurve:Nl,LineCurve:Td,LineCurve3:Vv,QuadraticBezierCurve:Ed,QuadraticBezierCurve3:Wv,SplineCurve:Rd});class Xv extends Kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new wh[s.type]().fromJSON(s))}return this}}class jv extends Xv{constructor(t){super(),this.type="Path",this.currentPoint=new St,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Td(this.currentPoint.clone(),new St(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Ed(this.currentPoint.clone(),new St(t,e),new St(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new wd(this.currentPoint.clone(),new St(t,e),new St(n,s),new St(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Rd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){const l=new Nl(t,e,n,s,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class kl extends le{constructor(t=[new St(0,-.5),new St(.5,0),new St(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ie(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/e,h=new B,d=new St,f=new B,g=new B,x=new B;let m=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let y=0;y<=e;y++){const v=n+y*u*s,_=Math.sin(v),A=Math.cos(v);for(let w=0;w<=t.length-1;w++){h.x=t[w].x*_,h.y=t[w].y,h.z=t[w].x*A,a.push(h.x,h.y,h.z),d.x=y/e,d.y=w/(t.length-1),o.push(d.x,d.y);const C=c[3*w+0]*_,z=c[3*w+1],b=c[3*w+0]*A;l.push(C,z,b)}}for(let y=0;y<e;y++)for(let v=0;v<t.length-1;v++){const _=v+y*t.length,A=_,w=_+t.length,C=_+t.length+1,z=_+1;r.push(A,w,z),r.push(C,z,w)}this.setIndex(r),this.setAttribute("position",new Vt(a,3)),this.setAttribute("uv",new Vt(o,2)),this.setAttribute("normal",new Vt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kl(t.points,t.segments,t.phiStart,t.phiLength)}}class Ol extends kl{constructor(t=1,e=1,n=4,s=8){const r=new jv;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Ol(t.radius,t.length,t.capSegments,t.radialSegments)}}class Fl extends le{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new B,u=new St;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const f=n+h/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/t+1)/2,u.y=(a[d+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(o,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ve extends le{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const x=[],m=n/2;let p=0;y(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Vt(h,3)),this.setAttribute("normal",new Vt(d,3)),this.setAttribute("uv",new Vt(f,2));function y(){const _=new B,A=new B;let w=0;const C=(e-t)/n;for(let z=0;z<=r;z++){const b=[],E=z/r,I=E*(e-t)+t;for(let X=0;X<=s;X++){const W=X/s,q=W*c+o,M=Math.sin(q),S=Math.cos(q);A.x=I*M,A.y=-E*n+m,A.z=I*S,h.push(A.x,A.y,A.z),_.set(M,C,S).normalize(),d.push(_.x,_.y,_.z),f.push(W,1-E),b.push(g++)}x.push(b)}for(let z=0;z<s;z++)for(let b=0;b<r;b++){const E=x[b][z],I=x[b+1][z],X=x[b+1][z+1],W=x[b][z+1];(t>0||b!==0)&&(u.push(E,I,W),w+=3),(e>0||b!==r-1)&&(u.push(I,X,W),w+=3)}l.addGroup(p,w,0),p+=w}function v(_){const A=g,w=new St,C=new B;let z=0;const b=_===!0?t:e,E=_===!0?1:-1;for(let X=1;X<=s;X++)h.push(0,m*E,0),d.push(0,E,0),f.push(.5,.5),g++;const I=g;for(let X=0;X<=s;X++){const q=X/s*c+o,M=Math.cos(q),S=Math.sin(q);C.x=b*S,C.y=m*E,C.z=b*M,h.push(C.x,C.y,C.z),d.push(0,E,0),w.x=M*.5+.5,w.y=S*.5*E+.5,f.push(w.x,w.y),g++}for(let X=0;X<s;X++){const W=A+X,q=I+X;_===!0?u.push(q,q+1,W):u.push(q+1,q,W),z+=3}l.addGroup(p,z,_===!0?1:2),p+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ve(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Js extends Ve{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Js(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class oo extends le{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(r.slice(),3)),this.setAttribute("uv",new Vt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const v=new B,_=new B,A=new B;for(let w=0;w<e.length;w+=3)f(e[w+0],v),f(e[w+1],_),f(e[w+2],A),c(v,_,A,y)}function c(y,v,_,A){const w=A+1,C=[];for(let z=0;z<=w;z++){C[z]=[];const b=y.clone().lerp(_,z/w),E=v.clone().lerp(_,z/w),I=w-z;for(let X=0;X<=I;X++)X===0&&z===w?C[z][X]=b:C[z][X]=b.clone().lerp(E,X/I)}for(let z=0;z<w;z++)for(let b=0;b<2*(w-z)-1;b++){const E=Math.floor(b/2);b%2===0?(d(C[z][E+1]),d(C[z+1][E]),d(C[z][E])):(d(C[z][E+1]),d(C[z+1][E+1]),d(C[z+1][E]))}}function l(y){const v=new B;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(y),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function u(){const y=new B;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const _=m(y)/2/Math.PI+.5,A=p(y)/Math.PI+.5;a.push(_,1-A)}g(),h()}function h(){for(let y=0;y<a.length;y+=6){const v=a[y+0],_=a[y+2],A=a[y+4],w=Math.max(v,_,A),C=Math.min(v,_,A);w>.9&&C<.1&&(v<.2&&(a[y+0]+=1),_<.2&&(a[y+2]+=1),A<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,v){const _=y*3;v.x=t[_+0],v.y=t[_+1],v.z=t[_+2]}function g(){const y=new B,v=new B,_=new B,A=new B,w=new St,C=new St,z=new St;for(let b=0,E=0;b<r.length;b+=9,E+=6){y.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),w.set(a[E+0],a[E+1]),C.set(a[E+2],a[E+3]),z.set(a[E+4],a[E+5]),A.copy(y).add(v).add(_).divideScalar(3);const I=m(A);x(w,E+0,y,I),x(C,E+2,v,I),x(z,E+4,_,I)}}function x(y,v,_,A){A<0&&y.x===1&&(a[v]=y.x-1),_.x===0&&_.z===0&&(a[v]=A/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oo(t.vertices,t.indices,t.radius,t.details)}}class Bl extends oo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Bl(t.radius,t.detail)}}class Xi extends oo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Xi(t.radius,t.detail)}}class co extends le{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let h=t;const d=(e-t)/s,f=new B,g=new St;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}h+=d}for(let x=0;x<s;x++){const m=x*(n+1);for(let p=0;p<n;p++){const y=p+m,v=y,_=y+n+1,A=y+n+2,w=y+1;o.push(v,_,w),o.push(_,A,w)}}this.setIndex(o),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new co(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class lo extends le{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new B,d=new B,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const y=[],v=p/n;let _=0;p===0&&a===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let A=0;A<=e;A++){const w=A/e;h.x=-t*Math.cos(s+w*r)*Math.sin(a+v*o),h.y=t*Math.cos(a+v*o),h.z=t*Math.sin(s+w*r)*Math.sin(a+v*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(w+_,1-v),y.push(l++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const v=u[p][y+1],_=u[p][y],A=u[p+1][y],w=u[p+1][y+1];(p!==0||a>0)&&f.push(v,_,w),(p!==n-1||c<Math.PI)&&f.push(_,A,w)}this.setIndex(f),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Hl extends Un{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=El,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class qn extends Hl{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new St(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ie(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new zt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new zt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new zt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Yn extends Un{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=El,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function Ta(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Yv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Kv(i){function t(s,r){return i[s]-i[r]}const e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function Th(i,t,e){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=e[r]*t;for(let c=0;c!==t;++c)s[a++]=i[o+c]}return s}function Cd(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push.apply(e,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=i[s++];while(r!==void 0)}class Kr{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break e}a=e.length;break n}if(!(t>=r)){const o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class qv extends Kr{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ds,endingEnd:Ds}}intervalChanged_(t,e,n){const s=this.parameterPositions;let r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case zs:r=t,o=2*e-n;break;case Za:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case zs:a=t,c=2*n-e;break;case Za:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}const l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,y=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,v=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let A=0;A!==o;++A)r[A]=p*a[u+A]+y*a[l+A]+v*a[c+A]+_*a[h+A];return r}}class Pd extends Kr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class Zv extends Kr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class Zn{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ta(e,this.TimeBufferType),this.values=Ta(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ta(t.times,Array),values:Ta(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Zv(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Pd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new qv(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Fr:e=this.InterpolantFactoryMethodDiscrete;break;case Br:e=this.InterpolantFactoryMethodLinear;break;case mo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fr;case this.InterpolantFactoryMethodLinear:return Br;case this.InterpolantFactoryMethodSmooth:return mo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Yv(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===mo,r=t.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const x=e[h+g];if(x!==e[d+g]||x!==e[f+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}}Zn.prototype.TimeBufferType=Float32Array;Zn.prototype.ValueBufferType=Float32Array;Zn.prototype.DefaultInterpolation=Br;class ar extends Zn{constructor(t,e,n){super(t,e,n)}}ar.prototype.ValueTypeName="bool";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=Fr;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;class Id extends Zn{}Id.prototype.ValueTypeName="color";class Qs extends Zn{}Qs.prototype.ValueTypeName="number";class $v extends Kr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e);let l=t*o;for(let u=l+o;l!==u;l+=4)_e.slerpFlat(r,0,a,l-o,a,l,c);return r}}class tr extends Zn{InterpolantFactoryMethodLinear(t){return new $v(this.times,this.values,this.getValueSize(),t)}}tr.prototype.ValueTypeName="quaternion";tr.prototype.InterpolantFactoryMethodSmooth=void 0;class or extends Zn{constructor(t,e,n){super(t,e,n)}}or.prototype.ValueTypeName="string";or.prototype.ValueBufferType=Array;or.prototype.DefaultInterpolation=Fr;or.prototype.InterpolantFactoryMethodLinear=void 0;or.prototype.InterpolantFactoryMethodSmooth=void 0;class er extends Zn{}er.prototype.ValueTypeName="vector";class us{constructor(t="",e=-1,n=[],s=wl){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Nn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,s=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(Qv(n[a]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,a=n.length;r!==a;++r)e.push(Zn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){const r=e.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=Kv(c);c=Th(c,1,u),l=Th(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Qs(".morphTargetInfluences["+e[o].name+"]",c,l).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=t.length;o<c;o++){const l=t[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],e,n));return a}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,x){if(f.length!==0){const m=[],p=[];Cd(f,m,p,g),m.length!==0&&x.push(new h(d,m,p))}},s=[],r=t.name||"default",a=t.fps||30,o=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(const x in f){const m=[],p=[];for(let y=0;y!==d[g].morphTargets.length;++y){const v=d[g];m.push(v.time),p.push(v.morphTarget===x?1:0)}s.push(new Qs(".morphTargetInfluence["+x+"]",m,p))}c=f.length*a}else{const f=".bones["+e[h].name+"]";n(er,f+".position",d,"pos",s),n(tr,f+".quaternion",d,"rot",s),n(er,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,s=t.length;n!==s;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Jv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Qs;case"vector":case"vector2":case"vector3":case"vector4":return er;case"color":return Id;case"quaternion":return tr;case"bool":case"boolean":return ar;case"string":return or}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Qv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Jv(i.type);if(i.times===void 0){const e=[],n=[];Cd(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}const ki={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class ty{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const ey=new ty;class cr{constructor(t){this.manager=t!==void 0?t:ey,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}cr.DEFAULT_MATERIAL_NAME="__DEFAULT";const si={};class ny extends Error{constructor(t,e){super(t),this.response=e}}class Ld extends cr{constructor(t){super(t)}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=ki.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(si[t]!==void 0){si[t].push({onLoad:e,onProgress:n,onError:s});return}si[t]=[],si[t].push({onLoad:e,onProgress:n,onError:s});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=si[t],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let x=0;const m=new ReadableStream({start(p){y();function y(){h.read().then(({done:v,value:_})=>{if(v)p.close();else{x+=_.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let w=0,C=u.length;w<C;w++){const z=u[w];z.onProgress&&z.onProgress(A)}p.enqueue(_),y()}},v=>{p.error(v)})}}});return new Response(m)}else throw new ny(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{ki.add(t,l);const u=si[t];delete si[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=si[t];if(u===void 0)throw this.manager.itemError(t),l;delete si[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class iy extends cr{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=ki.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=Hr("img");function c(){u(),ki.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(h){u(),s&&s(h),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class sy extends cr{constructor(t){super(t)}load(t,e,n,s){const r=new Be,a=new iy(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class uo extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Dd extends uo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const qo=new Ut,Eh=new B,Rh=new B;class Gl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yr,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Eh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Eh),Rh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rh),e.updateMatrixWorld(),qo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class ry extends Gl{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Zs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class ay extends uo{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new ry}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Ch=new Ut,_r=new B,Zo=new B;class oy extends Gl{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new St(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),_r.setFromMatrixPosition(t.matrixWorld),n.position.copy(_r),Zo.copy(n.position),Zo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Zo),n.updateMatrixWorld(),s.makeTranslation(-_r.x,-_r.y,-_r.z),Ch.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ch)}}class cy extends uo{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new oy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class ly extends Gl{constructor(){super(new ro(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vl extends uo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new ly}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Dr{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,s=t.length;n<s;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class el extends le{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class uy extends cr{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=ki.get(t);if(a!==void 0){if(r.manager.itemStart(t),a.then){a.then(l=>{e&&e(l),r.manager.itemEnd(t)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(t,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ki.add(t,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),ki.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});ki.add(t,c),r.manager.itemStart(t)}}class hy{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ph(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ph();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ph(){return performance.now()}class fy{constructor(t,e,n){this.binding=t,this.valueSize=n;let s,r,a;switch(e){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,s=this.valueSize,r=t*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,s,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,s=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=e*this._origIndex;this._mixBufferRegion(n,s,c,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*e,1,e);for(let c=e,l=e+e;c!==l;++c)if(n[c]!==n[c+e]){o.setValue(n,s);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,s=n*this._origIndex;t.getValue(e,s);for(let r=n,a=s;r!==a;++r)e[r]=e[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)t[e+a]=t[n+a]}_slerp(t,e,n,s){_e.slerpFlat(t,e,t,e,t,n,s)}_slerpAdditive(t,e,n,s,r){const a=this._workIndex*r;_e.multiplyQuaternionsFlat(t,a,t,e,t,n),_e.slerpFlat(t,e,t,e,t,a,s)}_lerp(t,e,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const c=e+o;t[c]=t[c]*a+t[n+o]*s}}_lerpAdditive(t,e,n,s,r){for(let a=0;a!==r;++a){const o=e+a;t[o]=t[o]+t[n+a]*s}}}const Wl="\\[\\]\\.:\\/",dy=new RegExp("["+Wl+"]","g"),Xl="[^"+Wl+"]",py="[^"+Wl.replace("\\.","")+"]",my=/((?:WC+[\/:])*)/.source.replace("WC",Xl),gy=/(WCOD+)?/.source.replace("WCOD",py),xy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xl),_y=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xl),vy=new RegExp("^"+my+gy+xy+_y+"$"),yy=["material","materials","bones","map"];class My{constructor(t,e,n){const s=n||fe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class fe{constructor(t,e,n){this.path=e,this.parsedPath=n||fe.parseTrackName(e),this.node=fe.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new fe.Composite(t,e,n):new fe(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(dy,"")}static parseTrackName(t){const e=vy.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);yy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===e||o.uuid===e)return o;const c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=fe.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const a=t[s];if(a===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}fe.Composite=My;fe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};fe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};fe.prototype.GetterByBindingType=[fe.prototype._getValue_direct,fe.prototype._getValue_array,fe.prototype._getValue_arrayElement,fe.prototype._getValue_toArray];fe.prototype.SetterByBindingTypeAndVersioning=[[fe.prototype._setValue_direct,fe.prototype._setValue_direct_setNeedsUpdate,fe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_array,fe.prototype._setValue_array_setNeedsUpdate,fe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_arrayElement,fe.prototype._setValue_arrayElement_setNeedsUpdate,fe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_fromArray,fe.prototype._setValue_fromArray_setNeedsUpdate,fe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class by{constructor(t,e,n=null,s=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=s;const r=e.tracks,a=r.length,o=new Array(a),c={endingStart:Ds,endingEnd:Ds};for(let l=0;l!==a;++l){const u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Np,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const s=this._clip.duration,r=t._clip.duration,a=r/s,o=s/r;t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=t/a,l[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,s){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const c=(t-r)*n;c<0||n===0?e=0:(this._startTime=null,e=n*c)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case kp:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case wl:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulate(s,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let s=this.time+t,r=this._loopCount;const a=n===Up;if(t===0)return r===-1?s:a&&(r&1)===1?e-s:s;if(n===Al){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(s>=e)s=e;else if(s<0)s=0;else{this.time=s;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=e||s<0){const o=Math.floor(s/e);s-=e*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=t>0?e:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return e-s}return s}_setEndings(t,e,n){const s=this._interpolantSettings;n?(s.endingStart=zs,s.endingEnd=zs):(t?s.endingStart=this.zeroSlopeAtStart?zs:Ds:s.endingStart=Za,e?s.endingEnd=this.zeroSlopeAtEnd?zs:Ds:s.endingEnd=Za)}_scheduleFading(t,e,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=e,o[1]=r+t,c[1]=n,this}}const Sy=new Float32Array(1);class jl extends ji{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,s=t._clip.tracks,r=s.length,a=t._propertyBindings,o=t._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){const d=s[h],f=d.name;let g=u[f];if(g!==void 0)++g.referenceCount,a[h]=g;else{if(g=a[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}const x=e&&e._propertyBindings[h].binding.parsedPath;g=new fy(fe.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),a[h]=g}o[h].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,s=t._clip.uuid,r=this._actionsByClip[s];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,s,n)}const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const s=this._actions,r=this._actionsByClip;let a=r[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=s.length,s.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],s=t._cacheIndex;n._cacheIndex=s,e[s]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=t._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),t._byClipCacheIndex=null;const h=o.actionByRoot,d=(t._localRoot||this._root).uuid;delete h[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,s=this._nActiveActions++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,s=--this._nActiveActions,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[e];a===void 0&&(a={},s[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=e[e.length-1],l=t._cacheIndex;c._cacheIndex=l,e[l]=c,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,s=this._nActiveBindings++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,s=--this._nActiveBindings,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Pd(new Float32Array(2),new Float32Array(2),1,Sy),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,s=--this._nActiveControlInterpolants,r=e[s];t.__cacheIndex=s,e[s]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const s=e||this._root,r=s.uuid;let a=typeof t=="string"?us.findByName(s,t):t;const o=a!==null?a.uuid:t,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=wl),c!==void 0){const h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const u=new by(this,a,e,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(t,e){const n=e||this._root,s=n.uuid,r=typeof t=="string"?us.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,s=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(s,t,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const u=l._cacheIndex,h=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,e[u]=h,e.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[e];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[e];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Ay extends Md{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const Ih=new Ut;class wy{constructor(t,e,n=0,s=1/0){this.ray=new ir(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Cl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ih.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ih),this}intersectObject(t,e=!0,n=[]){return nl(t,this,n,e),n.sort(Lh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)nl(t[s],this,n,e);return n.sort(Lh),n}}function Lh(i,t){return i.distance-t.distance}function nl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)nl(r[a],t,e,!0)}}class Dh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ie(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Ty extends ji{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pl);const zh={type:"change"},Yl={type:"start"},zd={type:"end"},Ea=new ir,Nh=new zi,Ey=Math.cos(70*di.DEG2RAD),ke=new B,on=2*Math.PI,ge={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$o=1e-6;class Ry extends Ty{constructor(t,e=null){super(t,e),this.state=ge.NONE,this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Fs.ROTATE,MIDDLE:Fs.DOLLY,RIGHT:Fs.PAN},this.touches={ONE:Ui.ROTATE,TWO:Ui.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new _e,this._lastTargetPosition=new B,this._quat=new _e().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Dh,this._sphericalDelta=new Dh,this._scale=1,this._panOffset=new B,this._rotateStart=new St,this._rotateEnd=new St,this._rotateDelta=new St,this._panStart=new St,this._panEnd=new St,this._panDelta=new St,this._dollyStart=new St,this._dollyEnd=new St,this._dollyDelta=new St,this._dollyDirection=new B,this._mouse=new St,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Py.bind(this),this._onPointerDown=Cy.bind(this),this._onPointerUp=Iy.bind(this),this._onContextMenu=Oy.bind(this),this._onMouseWheel=zy.bind(this),this._onKeyDown=Ny.bind(this),this._onTouchStart=Uy.bind(this),this._onTouchMove=ky.bind(this),this._onMouseDown=Ly.bind(this),this._onMouseMove=Dy.bind(this),this._interceptControlDown=Fy.bind(this),this._interceptControlUp=By.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zh),this.update(),this.state=ge.NONE}update(t=null){const e=this.object.position;ke.copy(e).sub(this.target),ke.applyQuaternion(this._quat),this._spherical.setFromVector3(ke),this.autoRotate&&this.state===ge.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=on:n>Math.PI&&(n-=on),s<-Math.PI?s+=on:s>Math.PI&&(s-=on),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ke.setFromSpherical(this._spherical),ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ke.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new B(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ea.origin.copy(this.object.position),Ea.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ea.direction))<Ey?this.object.lookAt(this.target):(Nh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ea.intersectPlane(Nh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>$o||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$o||this._lastTargetPosition.distanceToSquared(this.target)>$o?(this.dispatchEvent(zh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?on/60*this.autoRotateSpeed*t:on/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ke.setFromMatrixColumn(e,0),ke.multiplyScalar(-t),this._panOffset.add(ke)}_panUp(t,e){this.screenSpacePanning===!0?ke.setFromMatrixColumn(e,1):(ke.setFromMatrixColumn(e,0),ke.crossVectors(this.object.up,ke)),ke.multiplyScalar(t),this._panOffset.add(ke)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ke.copy(s).sub(this.target);let r=ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(on*this._rotateDelta.x/e.clientHeight),this._rotateUp(on*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(on*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-on*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(on*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-on*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(on*this._rotateDelta.x/e.clientHeight),this._rotateUp(on*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new St,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Cy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Py(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Iy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(zd),this.state=ge.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ly(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Fs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ge.DOLLY;break;case Fs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ge.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ge.ROTATE}break;case Fs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ge.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ge.PAN}break;default:this.state=ge.NONE}this.state!==ge.NONE&&this.dispatchEvent(Yl)}function Dy(i){switch(this.state){case ge.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ge.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ge.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function zy(i){this.enabled===!1||this.enableZoom===!1||this.state!==ge.NONE||(i.preventDefault(),this.dispatchEvent(Yl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(zd))}function Ny(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Uy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ui.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ge.TOUCH_ROTATE;break;case Ui.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ge.TOUCH_PAN;break;default:this.state=ge.NONE}break;case 2:switch(this.touches.TWO){case Ui.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ge.TOUCH_DOLLY_PAN;break;case Ui.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ge.TOUCH_DOLLY_ROTATE;break;default:this.state=ge.NONE}break;default:this.state=ge.NONE}this.state!==ge.NONE&&this.dispatchEvent(Yl)}function ky(i){switch(this._trackPointer(i),this.state){case ge.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ge.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ge.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ge.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ge.NONE}}function Oy(i){this.enabled!==!1&&i.preventDefault()}function Fy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function By(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function fs(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new le;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(t){let f;if(e)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(e){let u=0;const h=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=i[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Uh(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let x=0;x<a[u].length;++x)f.push(a[u][x][d]);const g=Uh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Uh(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const a=new t(r),o=new xe(a,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<e;g++){const x=u.getComponent(d,g);o.setComponent(d+h,g,x)}}else a.set(u.array,c);c+=u.count*e}return s!==void 0&&(o.gpuType=s),o}function kh(i,t){if(t===Op)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===$c||t===sd){let e=i.getIndex();if(e===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=e.count-2,s=[];if(t===$c)for(let a=1;a<=n;a++)s.push(e.getX(0)),s.push(e.getX(a)),s.push(e.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(e.getX(a)),s.push(e.getX(a+1)),s.push(e.getX(a+2))):(s.push(e.getX(a+2)),s.push(e.getX(a+1)),s.push(e.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}class il extends cr{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Xy(e)}),this.register(function(e){return new jy(e)}),this.register(function(e){return new e1(e)}),this.register(function(e){return new n1(e)}),this.register(function(e){return new i1(e)}),this.register(function(e){return new Ky(e)}),this.register(function(e){return new qy(e)}),this.register(function(e){return new Zy(e)}),this.register(function(e){return new $y(e)}),this.register(function(e){return new Wy(e)}),this.register(function(e){return new Jy(e)}),this.register(function(e){return new Yy(e)}),this.register(function(e){return new t1(e)}),this.register(function(e){return new Qy(e)}),this.register(function(e){return new Gy(e)}),this.register(function(e){return new s1(e)}),this.register(function(e){return new r1(e)})}load(t,e,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Dr.extractUrlBase(t);a=Dr.resolveURL(l,this.path)}else a=Dr.extractUrlBase(t);this.manager.itemStart(t);const o=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new Ld(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,a,function(u){e(u),r.manager.itemEnd(t)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Nd){try{a[te.KHR_BINARY_GLTF]=new a1(t)}catch(h){s&&s(h);return}r=JSON.parse(a[te.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new v1(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case te.KHR_MATERIALS_UNLIT:a[h]=new Vy;break;case te.KHR_DRACO_MESH_COMPRESSION:a[h]=new o1(r,this.dracoLoader);break;case te.KHR_TEXTURE_TRANSFORM:a[h]=new c1;break;case te.KHR_MESH_QUANTIZATION:a[h]=new l1;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(t,e){const n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}}function Hy(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}const te={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Gy{constructor(t){this.parser=t,this.name=te.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let s=e.cache.get(n);if(s)return s;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new zt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],sn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Vl(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new cy(u),l.distance=h;break;case"spot":l=new ay(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,oi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(e.cache,o,c)})}}class Vy{constructor(){this.name=te.KHR_MATERIALS_UNLIT}getMaterialType(){return je}extendParams(t,e,n){const s=[];t.color=new zt(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;t.color.setRGB(a[0],a[1],a[2],sn),t.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,Ne))}return Promise.all(s)}}class Wy{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}}class Xy{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(e.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new St(o,o)}return Promise.all(r)}}class jy{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Yy{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(e.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(e.iridescenceIOR=a.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Ky{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];e.sheenColor=new zt(0,0,0),e.sheenRoughness=0,e.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;e.sheenColor.setRGB(o[0],o[1],o[2],sn)}return a.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",a.sheenColorTexture,Ne)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class qy{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(e.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class Zy{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];e.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",a.thicknessTexture)),e.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return e.attenuationColor=new zt().setRGB(o[0],o[1],o[2],sn),Promise.all(r)}}class $y{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Jy{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];e.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return e.specularColor=new zt().setRGB(o[0],o[1],o[2],sn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",a.specularColorTexture,Ne)),Promise.all(r)}}class Qy{constructor(t){this.parser=t,this.name=te.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return e.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",a.bumpTexture)),Promise.all(r)}}class t1{constructor(t){this.parser=t,this.name=te.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(e.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(e.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class e1{constructor(t){this.parser=t,this.name=te.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,a)}}class n1{constructor(t){this.parser=t,this.name=te.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class i1{constructor(t){this.parser=t,this.name=te.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class s1{constructor(t){this.name=te.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}}class r1{constructor(t){this.name=te.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=e.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==_n.TRIANGLES&&l.mode!==_n.TRIANGLE_STRIP&&l.mode!==_n.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(t)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const g of h){const x=new Ut,m=new B,p=new _e,y=new B(1,1,1),v=new rr(g.geometry,g.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&y.fromBufferAttribute(c.SCALE,_),v.setMatrixAt(_,x.compose(m,p,y));for(const _ in c)if(_==="_COLOR_0"){const A=c[_];v.instanceColor=new ui(A.array,A.itemSize,A.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);Te.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),f.push(v)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const Nd="glTF",vr=12,Oh={JSON:1313821514,BIN:5130562};class a1{constructor(t){this.name=te.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,vr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Nd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-vr,r=new DataView(t,vr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===Oh.JSON){const l=new Uint8Array(t,vr+a,o);this.content=n.decode(l)}else if(c===Oh.BIN){const l=vr+a;this.body=t.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class o1{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=te.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,a=t.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=sl[u]||u.toLowerCase();o[h]=a[u]}for(const u in t.attributes){const h=sl[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[t.attributes[u]],f=Vs[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(const g in f.attributes){const x=f.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}h(f)},o,l,sn,d)})})}}class c1{constructor(){this.name=te.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class l1{constructor(){this.name=te.KHR_MESH_QUANTIZATION}}class Ud extends Kr{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let a=0;a!==s;a++)e[a]=n[r+a];return e}interpolate_(t,e,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-e,h=(n-e)/u,d=h*h,f=d*h,g=t*l,x=g-l,m=-2*f+3*d,p=f-d,y=1-m,v=p-d+h;for(let _=0;_!==o;_++){const A=a[x+_+o],w=a[x+_+c]*u,C=a[g+_+o],z=a[g+_]*u;r[_]=y*A+v*w+m*C+p*z}return r}}const u1=new _e;class h1 extends Ud{interpolate_(t,e,n,s){const r=super.interpolate_(t,e,n,s);return u1.fromArray(r).normalize().toArray(r),r}}const _n={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Vs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Fh={9728:Ye,9729:Fe,9984:Kf,9985:Ha,9986:Sr,9987:pn},Bh={33071:Wn,33648:qa,10497:Wi},Jo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},sl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ei={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},f1={CUBICSPLINE:void 0,LINEAR:Br,STEP:Fr},Qo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function d1(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Hl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:mi})),i.DefaultMaterial}function ts(i,t,e){for(const n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function oi(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function p1(i,t,e){let n=!1,s=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const h=t[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];if(n){const d=h.POSITION!==void 0?e.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?e.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?e.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function m1(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function g1(i){let t;const e=i.extensions&&i.extensions[te.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+tc(e.attributes):t=i.indices+":"+tc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+tc(i.targets[n]);return t}function tc(i){let t="";const e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function rl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function x1(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const _1=new Ut;class v1{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new Hy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new sy(this.options.manager):this.textureLoader=new uy(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ld(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ts(r,o,s),oi(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();t(o)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const a=e[s].joints;for(let o=0,c=a.length;o<c;o++)t[a[o]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const a=t[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const s=t(e[n]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,a){return n.getDependency(t,a)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[te.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(Dr.resolveURL(e.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){const e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const a=Jo[s.type],o=Vs[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new xe(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=Jo[s.type],l=Vs[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let x,m;if(f&&f!==h){const p=Math.floor(d/f),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let v=e.cache.get(y);v||(x=new l(o,p*f,s.count*f/u),v=new Md(x,f/u),e.cache.add(y,v)),m=new Gr(v,c,d%f/u,g)}else o===null?x=new l(s.count*c):x=new l(o,d,s.count*c),m=new xe(x,c,g);if(s.sparse!==void 0){const p=Jo.SCALAR,y=Vs[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,A=new y(a[1],v,s.sparse.count*p),w=new l(a[2],_,s.sparse.count*c);o!==null&&(m=new xe(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,z=A.length;C<z;C++){const b=A[C];if(m.setX(b,w[C*c]),c>=2&&m.setY(b,w[C*c+1]),c>=3&&m.setZ(b,w[C*c+2]),c>=4&&m.setW(b,w[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,a=e.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(t,r,o)}loadTextureImage(t,e,n){const s=this,r=this.json,a=r.textures[t],o=r.images[e],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=Fh[d.magFilter]||Fe,u.minFilter=Fh[d.minFilter]||pn,u.wrapS=Bh[d.wrapS]||Wi,u.wrapT=Bh[d.wrapT]||Wi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Ye&&u.minFilter!==Fe,s.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(h=>h.clone());const a=s.images[t],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let g=d;e.isImageBitmapLoader===!0&&(g=function(x){const m=new Be(x);m.needsUpdate=!0,d(m)}),e.load(Dr.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),oi(h,a),h.userData.mimeType=a.mimeType||x1(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[t]=u,u}assignTexture(t,e,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[te.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[te.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[te.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),t[e]=a,a})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(t.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Ad,Un.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(t.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Sd,Un.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return Hl}loadMaterial(t){const e=this,n=this.json,s=this.extensions,r=n.materials[t];let a;const o={},c=r.extensions||{},l=[];if(c[te.KHR_MATERIALS_UNLIT]){const h=s[te.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,e))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new zt(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],sn),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(e.assignTexture(o,"map",h.baseColorTexture,Ne)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(e.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,o)})))}r.doubleSided===!0&&(o.side=en);const u=r.alphaMode||Qo.OPAQUE;if(u===Qo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Qo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==je&&(l.push(e.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new St(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==je&&(l.push(e.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==je){const h=r.emissiveFactor;o.emissive=new zt().setRGB(h[0],h[1],h[2],sn)}return r.emissiveTexture!==void 0&&a!==je&&l.push(e.assignTexture(o,"emissiveMap",r.emissiveTexture,Ne)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),oi(h,r),e.associations.set(h,{materials:t}),r.extensions&&ts(s,h,r),h})}createUniqueName(t){const e=fe.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[te.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(c){return Hh(c,o,e)})}const a=[];for(let o=0,c=t.length;o<c;o++){const l=t[o],u=g1(l),h=s[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[te.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Hh(new le,l,e),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(t){const e=this,n=this.json,s=this.extensions,r=n.meshes[t],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?d1(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(e.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,g=u.length;f<g;f++){const x=u[f],m=a[f];let p;const y=l[f];if(m.mode===_n.TRIANGLES||m.mode===_n.TRIANGLE_STRIP||m.mode===_n.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Tv(x,y):new ne(x,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===_n.TRIANGLE_STRIP?p.geometry=kh(p.geometry,sd):m.mode===_n.TRIANGLE_FAN&&(p.geometry=kh(p.geometry,$c));else if(m.mode===_n.LINES)p=new Cv(x,y);else if(m.mode===_n.LINE_STRIP)p=new zl(x,y);else if(m.mode===_n.LINE_LOOP)p=new Pv(x,y);else if(m.mode===_n.POINTS)p=new Iv(x,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&m1(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),oi(p,r),m.extensions&&ts(s,p,m),e.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)e.associations.set(h[f],{meshes:t,primitives:f});if(h.length===1)return r.extensions&&ts(s,h[0],r),h[0];const d=new Ce;r.extensions&&ts(s,d,r),e.associations.set(d,{meshes:t});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new tn(di.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new ro(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),oi(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new Ut;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Dl(o,c)})}loadAnimation(t){const e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],g=s.samplers[f.sampler],x=f.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,y=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",y)),l.push(g),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],g=h[2],x=h[3],m=h[4],p=[];for(let y=0,v=d.length;y<v;y++){const _=d[y],A=f[y],w=g[y],C=x[y],z=m[y];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const b=n._createAnimationTracks(_,A,w,C,z);if(b)for(let E=0;E<b.length;E++)p.push(b[E])}return new us(r,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(t){const e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,_1)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(t){const e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){o.push(l)}),this.nodeCache[t]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new bd:l.length>1?u=new Ce:l.length===1?u=l[0]:u=new Te,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),oi(u,r),r.extensions&&ts(n,u,r),r.matrix!==void 0){const h=new Ut;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],s=this,r=new Ce;n.name&&(r.name=s.createUniqueName(n.name)),oi(r,n),n.extensions&&ts(e,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof Un||d instanceof Be)&&h.set(d,f);return u.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(t,e,n,s,r){const a=[],o=t.name?t.name:t.uuid,c=[];Ei[r.path]===Ei.weights?t.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Ei[r.path]){case Ei.weights:l=Qs;break;case Ei.rotation:l=tr;break;case Ei.position:case Ei.scale:l=er;break;default:switch(n.itemSize){case 1:l=Qs;break;case 2:case 3:default:l=er;break}break}const u=s.interpolation!==void 0?f1[s.interpolation]:Br,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+Ei[r.path],e.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=rl(e.constructor),s=new Float32Array(e.length);for(let r=0,a=e.length;r<a;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const s=this instanceof tr?h1:Ud;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function y1(i,t,e){const n=t.attributes,s=new _i;if(n.POSITION!==void 0){const o=e.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),o.normalized){const u=rl(Vs[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const o=new B,c=new B;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=e.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const x=rl(Vs[d.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new ln;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Hh(i,t,e){const n=t.attributes,s=[];function r(a,o){return e.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=sl[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(t.indices!==void 0&&!i.index){const a=e.getDependency("accessor",t.indices).then(function(o){i.setIndex(o)});s.push(a)}return ie.workingColorSpace!==sn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ie.workingColorSpace}" not supported.`),oi(i,t),y1(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?p1(i,t.targets,e):i})}const Kl=["rendah","sedang","tinggi"],kd="pulau-tropis:kualitas",M1={rendah:{maxPixelRatio:1.25,terrainSegments:200,shadows:!1,shadowMapSize:0,softShadows:!1,treeDensity:.75,canopyDetail:0,grass:{radius:70,near:9,density:1.6,blades:4,max:4e3,shadows:!1},caustics:!1,water:{segments:128,detailLayers:1,cloudReflection:!1,wetSand:!1,shoreRes:256}},sedang:{maxPixelRatio:1.5,terrainSegments:256,shadows:!0,shadowMapSize:1024,softShadows:!0,treeDensity:1,canopyDetail:0,grass:{radius:120,near:13,density:2.4,blades:6,max:9e3,shadows:!1},caustics:!0,water:{segments:192,detailLayers:2,cloudReflection:!0,wetSand:!0,shoreRes:512}},tinggi:{maxPixelRatio:2,terrainSegments:384,shadows:!0,shadowMapSize:2048,softShadows:!0,treeDensity:1.5,canopyDetail:1,grass:{radius:170,near:18,density:3.2,blades:8,max:26e3,shadows:!0},caustics:!0,water:{segments:240,detailLayers:2,cloudReflection:!0,wetSand:!0,shoreRes:512}}},Od=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&window.matchMedia("(pointer: coarse)").matches;function b1(){try{return localStorage.getItem(kd)}catch{return null}}function S1(){const i=new URLSearchParams(location.hash.slice(1)).get("kualitas"),t=new URLSearchParams(location.search).get("kualitas");for(const e of[i,t,b1()])if(Kl.includes(e))return e;return Od?"sedang":"tinggi"}const Gh=S1(),Ee={isMobile:Od,level:Gh,levels:Kl,...M1[Gh]};function A1(i){if(Kl.includes(i)){try{localStorage.setItem(kd,i)}catch{}try{const t=new URL(location.href);t.searchParams.delete("kualitas"),t.hash=`kualitas=${i}`,history.replaceState(null,"",t)}catch{location.hash=`kualitas=${i}`}location.reload()}}function Ra(i,t,e){let n=i*374761393+t*668265263+e*2147483647|0;return n=(n^n>>>13)*1274126177|0,n^=n>>>16,(n>>>0)/4294967295}const Vh=i=>i*i*(3-2*i),Ca=(i,t)=>(i%t+t)%t;function w1(i,t,e,n){const s=Math.floor(i),r=Math.floor(t),a=Vh(i-s),o=Vh(t-r),c=Ca(s,e),l=Ca(s+1,e),u=Ca(r,e),h=Ca(r+1,e),d=Ra(c,u,n),f=Ra(l,u,n),g=Ra(c,h,n),x=Ra(l,h,n);return d+(f-d)*a+(g-d)*o+(d-f-g+x)*a*o}function Us(i,t,e,n,s){let r=0,a=.5,o=0,c=e;for(let l=0;l<n;l++)r+=a*w1(i*c,t*c,c,s+l*13),o+=a,a*=.5,c*=2;return r/o}function Fd(i){let t=1/0,e=-1/0;for(const s of i)s<t&&(t=s),s>e&&(e=s);const n=1/Math.max(1e-6,e-t);for(let s=0;s<i.length;s++)i[s]=(i[s]-t)*n}function T1(i,t=256){const e=t*t,n=[new Float32Array(e),new Float32Array(e),new Float32Array(e),new Float32Array(e)];for(let a=0;a<t;a++)for(let o=0;o<t;o++){const c=o/t,l=a/t,u=a*t+o;n[0][u]=Us(c,l,32,3,1),n[1][u]=Us(c,l,8,4,2),n[2][u]=Us(c,l,4,3,3),n[3][u]=1-Math.abs(Us(c,l,6,3,4)*2-1)}n.forEach(Fd);const s=new Uint8Array(e*4);for(let a=0;a<e;a++)for(let o=0;o<4;o++)s[a*4+o]=Math.round(n[o][a]*255);const r=new hs(s,t,t,Xe,Mn);return r.wrapS=r.wrapT=Wi,r.magFilter=Fe,r.minFilter=pn,r.generateMipmaps=!0,r.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),r.needsUpdate=!0,r}function E1(i,t=256){const e=new Float32Array(t*t);for(let o=0;o<t;o++)for(let c=0;c<t;c++){const l=c/t,u=o/t,h=Us(l,u,6,4,21),d=1-Math.abs(Us(l,u,9,3,37)*2-1);e[o*t+c]=h*.6+d*.4}Fd(e);const n=new Uint8Array(t*t*4),s=(o,c)=>e[(c+t)%t*t+(o+t)%t],r=5;for(let o=0;o<t;o++)for(let c=0;c<t;c++){const l=-(s(c+1,o)-s(c-1,o))*r,u=-(s(c,o+1)-s(c,o-1))*r,h=Math.hypot(l,u,1),d=(o*t+c)*4;n[d]=Math.round((l/h*.5+.5)*255),n[d+1]=Math.round((u/h*.5+.5)*255),n[d+2]=Math.round((1/h*.5+.5)*255),n[d+3]=255}const a=new hs(n,t,t,Xe,Mn);return a.wrapS=a.wrapT=Wi,a.magFilter=Fe,a.minFilter=pn,a.generateMipmaps=!0,a.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),a.needsUpdate=!0,a}function Vr(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}const R1=(i,t)=>(Math.imul(i|0,73856093)^Math.imul(t|0,19349663))>>>0,Wh=(i,t)=>(i+32768)*65536+(t+32768);class C1{constructor(t=8){this.cell=t,this.cells=new Map,this.maxRadius=0}add(t,e,n,s){const r=Wh(Math.floor(t/this.cell),Math.floor(e/this.cell));let a=this.cells.get(r);a||this.cells.set(r,a=[]),a.push({x:t,z:e,radius:n,kind:s}),this.maxRadius=Math.max(this.maxRadius,n)}forEachNear(t,e,n,s){const r=n+this.maxRadius,a=Math.floor((t-r)/this.cell),o=Math.floor((t+r)/this.cell),c=Math.floor((e-r)/this.cell),l=Math.floor((e+r)/this.cell);for(let u=a;u<=o;u++)for(let h=c;h<=l;h++){const d=this.cells.get(Wh(u,h));if(d){for(const f of d)if(s(f)===!1)return!1}}return!0}isFree(t,e,n){return this.forEachNear(t,e,n,s=>{const r=s.x-t,a=s.z-e,o=s.radius+n;return r*r+a*a>=o*o})}covered(t,e,n,s=1){return!this.forEachNear(t,e,0,r=>{if(r.kind!==n)return!0;const a=r.x-t,o=r.z-e,c=r.radius*s;return a*a+o*o>=c*c})}}function vn({ground:i,grid:t,kind:e,count:n,seed:s,radius:r,accept:a,area:o=370,cx:c=0,cz:l=0,reserved:u=null}){const h=Vr(s),d=[];for(let f=0;d.length<n&&f<n*150;f++){const g=o*Math.sqrt(h()),x=h()*Math.PI*2,m=c+Math.cos(x)*g,p=l+Math.sin(x)*g,y=i.heightAt(m,p);if(!a(m,p,y,i.slopeAt(m,p),h))continue;const v=typeof r=="function"?r(h):r;if(!t.isFree(m,p,v))continue;t.add(m,p,v,e);const _={x:m,y,z:p,r:v,a:h(),b:h(),c:h()};u!=null&&u(m,p,v)||d.push(_)}return d}function Pa(i,t,e){let n=i*374761393+t*668265263+e*2147483647|0;return n=(n^n>>>13)*1274126177|0,n^=n>>>16,(n>>>0)/4294967295}const Xh=i=>i*i*(3-2*i);function Bd(i,t,e=1){const n=Math.floor(i),s=Math.floor(t),r=Xh(i-n),a=Xh(t-s),o=Pa(n,s,e),c=Pa(n+1,s,e),l=Pa(n,s+1,e),u=Pa(n+1,s+1,e);return o+(c-o)*r+(l-o)*a+(o-c-l+u)*r*a}function Xn(i,t,e=4,n=1){let s=0,r=.5,a=1,o=0;for(let c=0;c<e;c++)s+=r*Bd(i*a,t*a,n+c*17),o+=r,r*=.5,a*=2.03;return s/o}const Oe=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)},we={size:1e3,seaLevel:0,seaFloor:-18,beachTop:2.2,peak:{x:70,z:-60}};function Hd(i,t){const e=Math.hypot(i,t),s=230+(Xn(i*.0035+3.1,t*.0035-7.4,3,7)-.5)*220,r=e/s;let a=we.seaFloor+(we.seaFloor*-1-1.2)*Oe(1.38,1.02,r);a+=3.6*Oe(1.04,.87,r);const o=Oe(.92,.45,r),c=Xn(i*.011+10,t*.011-5,5,3);a+=o*o*c*26;const l=i-we.peak.x,u=t-we.peak.z,h=Math.exp(-(l*l+u*u)/(2*75*75)),d=.7+.6*Xn(i*.03,t*.03,4,11);return a+=o*h*70*d,a+=(Xn(i*.08,t*.08,2,21)-.5)*.8*o,a}const ho=[{id:"kencana",name:"Pulau Kencana",x:-560,z:40,r:255,wobble:.07,hills:7,seed:51},{id:"sawah",name:"Pulau Sawah",x:-660,z:-345,r:100,wobble:.1,hills:3,seed:52},{id:"nelayan",name:"Pulau Nelayan",x:-760,z:360,r:88,wobble:.1,hills:3,seed:53},{id:"pura",name:"Pulau Pura",x:-890,z:110,r:50,wobble:.12,hills:13,seed:54},{id:"wira",name:"Pulau Wira",x:-270,z:470,rx:360,rz:185,r:360,wobble:.05,hills:2,seed:55,forest:.25}],ye={x0:-700,x1:-420,z0:-60,z1:140,y:5.5},P1=[{id:"timur",x:-420,z:40,w:10,axis:"x"},{id:"barat",x:-700,z:110,w:7,axis:"x"},{id:"utara",x:-647,z:-60,w:7,axis:"z"},{id:"selatan",x:-553,z:140,w:8,axis:"z"}],Gd={x0:-689,x1:-602,z0:-1,z1:81,gate:{x:-602,z:40}},jh={x0:-588,x1:-508,z0:-1,z1:81},I1={x0:-500,x1:-430,z0:-50,z1:31,x:-465,z:-10},L1={x0:-500,x1:-430,z0:47,z1:82},Tr={x:-893,z:110,r:21},xi={x0:-490,x1:-50,z0:370,z1:577,y:4.2},Vd=[[-4.6,-3.2],[4.6,-3.2],[4.6,3.2],[-4.6,3.2],[-10.6,-5.3],[0,-5.3],[10.6,-5.3],[-10.6,0],[10.6,0],[-10.6,5.3],[10.6,5.3]],to=[{id:"tenda",x0:-578,x1:-508,z0:392,z1:556},{id:"kandang",x0:-32,x1:34,z0:392,z1:540}],Yh=[[-694,-54],[-426,-54],[-426,134],[-694,134]],D1=[...Yh.map((i,t)=>[...i,...Yh[(t+1)%4],5]),[-694,-29,-504,-29,5],[-694,-5,-504,-5,6],[-694,85,-426,85,6],[-694,110,-426,110,5],[-647,-54,-647,-5,5],[-600,-54,-600,-5,5],[-553,-54,-553,-5,5],[-647,85,-647,134,5],[-600,85,-600,134,5],[-553,85,-553,134,5],[-504,-54,-504,134,6],[-420,40,-508,40,10],[-508,40,-602,40,8],[-420,40,-300,40,7],[-553,134,-553,282,6],[-647,-54,-647,-195,5],[-694,110,-800,110,5],[-730,110,-730,228,5]],z1=[{id:"agung",name:"Jembatan Agung",axis:"x",at:40,from:-360,to:-160,width:7,rise:2.2,stone:!0},{id:"sawah",name:"Jembatan Sawah",axis:"z",at:-646,from:-150,to:-280,width:4.6,rise:1.2},{id:"pura",name:"Jembatan Pura",axis:"x",at:110,from:-770,to:-880,width:4.6,rise:1.2},{id:"nelayan",name:"Jembatan Nelayan",axis:"z",at:-730,from:200,to:300,width:4.6,rise:1.2},{id:"wira",name:"Jembatan Wira",axis:"z",at:-470,from:230,to:360,width:6,rise:1.6}],Kh=i=>ho.find(t=>t.id===i);function Wd(i,t,e,n,s,r){const a=s-e,o=r-n,c=Math.max(0,Math.min(1,((i-e)*a+(t-n)*o)/(a*a+o*o||1)));return Math.hypot(e+a*c-i,n+o*c-t)}function Gi(i,t,e){const n=Math.max(e.x0-i,i-e.x1),s=Math.max(e.z0-t,t-e.z1);return Math.hypot(Math.max(n,0),Math.max(s,0))+Math.min(Math.max(n,s),0)}const zr=(i,t,e,n=0)=>i>=e.x0-n&&i<=e.x1+n&&t>=e.z0-n&&t<=e.z1+n,ks=-18,Ia={x0:-1e3,x1:240,z0:-500,z1:750},Nr=2,N1=8.5,U1=[{...xi,z0:xi.z0-42},...to];function ql(i,t,e){return i.rx?Math.hypot((t-i.x)/i.rx,(e-i.z)/i.rz):Math.sqrt((t-i.x)**2+(e-i.z)**2)/i.r}function k1(i,t,e){let n;if(i.rx){const a=ql(i,t,e);if(a>(1+i.wobble)*1.38)return ks;const o=Xn(t*.009+i.seed*1.7,e*.009-i.seed,3,i.seed);n=a/(1+(o-.5)*2*i.wobble)}else{const a=t-i.x,o=e-i.z,c=i.r*(1+i.wobble)*1.38,l=a*a+o*o;if(l>c*c)return ks;const u=Xn(t*.009+i.seed*1.7,e*.009-i.seed,3,i.seed);n=Math.sqrt(l)/(i.r*(1+(u-.5)*2*i.wobble))}let s=ks+(-ks-1.2)*Oe(1.38,1.02,n);s+=3.6*Oe(1.04,.87,n);const r=Oe(.92,.45,n);if(s+=r*r*Xn(t*.012+i.seed,e*.012-i.seed*2,4,i.seed+9)*i.hills,s+=(Xn(t*.08,e*.08,2,21+i.seed)-.5)*.5*r,i.id==="kencana"){const a=(1-Oe(8,35,Gi(t,e,ye)))*Oe(.95,.8,n);s+=(ye.y-s)*a}else if(i.id==="pura"){const a=1-Oe(Tr.r*.7,Tr.r*1.25,Math.hypot(t-Tr.x,e-Tr.z));s+=(N1-s)*a}else if(i.id==="wira"){let a=1/0;for(const c of U1)a=Math.min(a,Gi(t,e,c));const o=(1-Oe(6,30,a))*Oe(.95,.82,n);s+=(xi.y-s)*o}return s}function O1(i,t){if(i<Ia.x0||i>Ia.x1||t<Ia.z0||t>Ia.z1)return ks;let e=ks;for(const n of ho)e=Math.max(e,k1(n,i,t));return e}function F1(i){return z1.map(t=>{const e=Math.sign(t.to-t.from),n=a=>t.axis==="x"?i(a,t.at):i(t.at,a);let s=null,r=null;for(let a=t.from;e*(t.to-a)>=0;a+=e*.25){const o=n(a);if(s===null&&o<Nr)s=a;else if(s!==null&&o>=Nr){r=a;break}}if(s===null||r===null)throw new Error(`ujung ${t.name} tidak ditemukan`);return{...t,a:s,b:r,length:Math.abs(r-s)}})}const Xt={minX:-1125,maxX:500,minZ:-500,maxZ:750};Xt.width=Xt.maxX-Xt.minX;Xt.depth=Xt.maxZ-Xt.minZ;const B1=470*470;function H1(i,t){const e=i*i+t*t<B1?Hd(i,t):we.seaFloor;return Math.max(e,O1(i,t))}const G1=(i,t,e=0)=>i>Xt.minX+e&&i<Xt.maxX-e&&t>Xt.minZ+e&&t<Xt.maxZ-e,Oi=(i,t)=>Xn(i*.012+40,t*.012-13,3,31);function Wr(i,t){const e=Math.hypot(i-we.peak.x,t-we.peak.z);return 1-Oe(150,245,e)}function Xd(i){return Oe(16,30,i)*(1-Oe(66,76,i))}function V1(i,t){return{forest:Oi(i,t),patch:Xn(i*.045+7,t*.045-3,2,77)}}function qh(i,t,e,n,s,r){if(s<we.beachTop+1.2||s>76||r>1.15)return 0;const a=Wr(e,n);if(a<=0)return 0;const o=i>.47&&s<44,c=1-Oe(.42,.52,i),l=Math.max(Xd(s)*(o?.35:1),.75*c),u=Oe(.25,.5,t),h=1-Oe(.75,1.15,r),d=Oe(we.beachTop+1.2,we.beachTop+4,s);return a*l*u*h*d}function W1(i,t,e){if(e<we.beachTop)return 0;const n=1-Oe(.42,.52,Oi(i,t)),s=Oi(i,t)>.47&&e<44;return Wr(i,t)*Math.max(Xd(e)*(s?.4:1),.75*n)}const Ur=1e20;function Zh(i,t,e,n,s){let r=0;n[0]=0,s[0]=-Ur,s[1]=Ur;for(let a=1;a<t;a++){let o=(i[a]+a*a-(i[n[r]]+n[r]*n[r]))/(2*a-2*n[r]);for(;o<=s[r];)r--,o=(i[a]+a*a-(i[n[r]]+n[r]*n[r]))/(2*a-2*n[r]);r++,n[r]=a,s[r]=o,s[r+1]=Ur}r=0;for(let a=0;a<t;a++){for(;s[r+1]<a;)r++;e[a]=(a-n[r])*(a-n[r])+i[n[r]]}}function $h(i,t,e){const n=Math.max(t,e),s=new Float64Array(n),r=new Float64Array(n),a=new Int32Array(n),o=new Float64Array(n+1);for(let c=0;c<t;c++){for(let l=0;l<e;l++)s[l]=i[l*t+c];Zh(s,e,r,a,o);for(let l=0;l<e;l++)i[l*t+c]=r[l]}for(let c=0;c<e;c++){for(let l=0;l<t;l++)s[l]=i[c*t+l];Zh(s,t,r,a,o);for(let l=0;l<t;l++)i[c*t+l]=r[l]}}function X1(i,t=512){const e=we.size/t,n=Math.round(Xt.width/e),s=Math.round(Xt.depth/e),r=n*s,a=new Float32Array(r),o=new Float64Array(r),c=new Float64Array(r);for(let f=0;f<s;f++)for(let g=0;g<n;g++){const x=f*n+g,m=i.heightAt(Xt.minX+(g+.5)*e,Xt.minZ+(f+.5)*e);a[x]=m,o[x]=m>0?0:Ur,c[x]=m>0?Ur:0}$h(o,n,s),$h(c,n,s);const l=new Float32Array(r);for(let f=0;f<r;f++)l[f]=a[f]>0?-(Math.sqrt(c[f])-.5)*e:(Math.sqrt(o[f])-.5)*e;for(let f=1;f<s-1;f++)for(let g=1;g<n-1;g++){const x=f*n+g;if(Math.abs(l[x])>3*e)continue;const m=(a[x+1]-a[x-1])/(2*e),p=(a[x+n]-a[x-n])/(2*e),y=Math.hypot(m,p);y>.02&&(l[x]=Math.max(-3*e,Math.min(3*e,-a[x]/y)))}const u=Cm.toHalfFloat,h=new Uint16Array(r*4);for(let f=0;f<s;f++)for(let g=0;g<n;g++){const x=f*n+g,m=l[Math.min(n-1,g+1)+f*n]-l[Math.max(0,g-1)+f*n],p=l[g+Math.min(s-1,f+1)*n]-l[g+Math.max(0,f-1)*n],y=Math.hypot(m,p)||1;h[x*4]=u(a[x]),h[x*4+1]=u(Math.max(-60,Math.min(600,l[x]))),h[x*4+2]=u(m/y),h[x*4+3]=u(p/y)}const d=new hs(h,n,s,Xe,nr);return d.magFilter=Fe,d.minFilter=Fe,d.wrapS=d.wrapT=Wn,d.needsUpdate=!0,{texture:d,width:n,height:s,cell:e,heights:a,distance:l}}const Zl={value:0},$l=`
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
`;function Jh(i,{heightFn:t=H1,rect:e=Xt}={}){const n=we.size/i,s=Math.round((e.maxX-e.minX)/n),r=Math.round((e.maxZ-e.minZ)/n),a=s+1,o=e.minX,c=e.minZ,l=new Float32Array(a*(r+1));for(let v=0;v<=r;v++)for(let _=0;_<=s;_++)l[v*a+_]=t(o+_*n,c+v*n);function u(v,_){const A=(v-o)/n,w=(_-c)/n;if(A<0||w<0||A>=s||w>=r)return t(v,_);const C=Math.floor(A),z=Math.floor(w),b=A-C,E=w-z,I=l[z*a+C],X=l[(z+1)*a+C],W=l[(z+1)*a+C+1],q=l[z*a+C+1];return b+E<=1?I+(q-I)*b+(X-I)*E:W+(X-W)*(1-b)+(q-W)*(1-E)}function h(v,_){const A=u(v,_);return Math.hypot(u(v+1,_)-A,u(v,_+1)-A)}const d=16,f=new Map,g=(v,_)=>(v+32768)*65536+(_+32768);let x=[];function m(v,_,A){const w=_-v.x,C=A-v.z,z=w*v.cos-C*v.sin,b=w*v.sin+C*v.cos;if(Math.abs(z)>v.hx||Math.abs(b)>v.hz)return-1/0;const E=(b+v.hz)/(2*v.hz);return v.y0+(v.y1-v.y0)*E+(v.arch?v.arch*Math.sin(Math.PI*Math.min(1,Math.max(0,(E-v.a0)/(v.a1-v.a0)))):0)}function p(v,_){const A=u(v,_);if(!x.length)return A;const w=f.get(g(Math.floor(v/d),Math.floor(_/d)));if(!w)return A;let C=A;for(const z of w){const b=m(z,v,_);b>C&&(C=b)}return C}function y(v){x=v.map(_=>({a0:0,a1:1,arch:0,..._,cos:Math.cos(_.rot||0),sin:Math.sin(_.rot||0)})),f.clear();for(const _ of x){const A=Math.hypot(_.hx,_.hz);for(let w=Math.floor((_.x-A)/d);w<=Math.floor((_.x+A)/d);w++)for(let C=Math.floor((_.z-A)/d);C<=Math.floor((_.z+A)/d);C++){const z=g(w,C);f.has(z)||f.set(z,[]),f.get(z).push(_)}}}return{step:n,nx:s,nz:r,cols:a,x0:o,z0:c,heights:l,heightAt:u,slopeAt:h,surfaceAt:p,setSurfaces:y,get surfaces(){return x},surfaceHeight:m}}const j1=`
attribute vec2 aSurface; // x = oklusi (gelap di bawah pohon), y = padang rumput
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;
`,Y1=`
uniform sampler2D uNoise;
uniform float uBeachTop;
uniform float uWaveTime;
${$l}
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
`,Cs=64,K1=-12,q1=-18.4;function Z1(i){const{nx:t,nz:e,cols:n,heights:s,step:r}=i,a=new Float32Array(n*(e+1)*3),o=(l,u,h,d)=>{a[l*3]+=u,a[l*3+1]+=h,a[l*3+2]+=d},c=r*r;for(let l=0;l<e;l++)for(let u=0;u<t;u++){const h=l*n+u,d=h+n,f=d+1,g=h+1,x=r*(s[h]-s[g]),m=r*(s[h]-s[d]);o(h,x,c,m),o(d,x,c,m),o(g,x,c,m);const p=r*(s[d]-s[f]),y=r*(s[g]-s[f]);o(d,p,c,y),o(f,p,c,y),o(g,p,c,y)}for(let l=0;l<a.length;l+=3){const u=Math.hypot(a[l],a[l+1],a[l+2])||1;a[l]/=u,a[l+1]/=u,a[l+2]/=u}return a}function $1(i,{noiseTexture:t,quality:e,region:n=null}){const{nx:s,nz:r,cols:a,heights:o,x0:c,z0:l,step:u}=i,h=Z1(i),d=new Float32Array(a*(r+1)*2);for(let v=0;v<=r;v++)for(let _=0;_<=s;_++){const A=v*a+_;d[A*2]=1,d[A*2+1]=W1(c+_*u,l+v*u,o[A])}const f=new Yn({color:16777215});f.defines={},e.water.wetSand&&(f.defines.WAVE_WET_SAND=""),n&&(f.defines.REGION_MASK=""),f.onBeforeCompile=v=>{v.uniforms.uNoise={value:t},v.uniforms.uBeachTop={value:we.beachTop},v.uniforms.uWaveTime=Zl,n&&(v.uniforms.uRegion={value:n.texture},v.uniforms.uRegionRect={value:new ee(n.x0,n.z0,1/n.width,1/n.depth)}),v.vertexShader=j1+v.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
      vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
      vWorldNrm = normalize(mat3(modelMatrix) * objectNormal);
      vSurface = aSurface;`),v.fragmentShader=Y1+v.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb *= terrainColor();`)};const g=new Ce;g.name="terrain";const x=[];for(let v=0;v<r;v+=Cs)for(let _=0;_<s;_+=Cs){const A=Math.min(s,_+Cs),w=Math.min(r,v+Cs),C=A-_+1,z=w-v+1;let b=-1/0;for(let R=v;R<=w;R++)for(let T=_;T<=A;T++)b=Math.max(b,o[R*a+T]);if(b<K1)continue;const E=new Float32Array(C*z*3),I=new Float32Array(C*z*3),X=new Int32Array(C*z);for(let R=v;R<=w;R++)for(let T=_;T<=A;T++){const k=(R-v)*C+(T-_),F=R*a+T;E[k*3]=c+T*u,E[k*3+1]=o[F],E[k*3+2]=l+R*u,I.set(h.subarray(F*3,F*3+3),k*3),X[k]=F}const W=[];for(let R=0;R<z-1;R++)for(let T=0;T<C-1;T++){const k=R*C+T,F=k+C;W.push(k,F,k+1,F,F+1,k+1)}const q=new le;q.setAttribute("position",new xe(E,3)),q.setAttribute("normal",new xe(I,3));const M=new xe(new Float32Array(C*z*2),2);q.setAttribute("aSurface",M),q.setIndex(W),q.computeBoundingSphere();const S=new ne(q,f);S.name=`terrain-${_/Cs}-${v/Cs}`,S.receiveShadow=e.shadows,g.add(S),x.push({surf:M,map:X})}const m=new bn(Xt.width,Xt.depth).rotateX(-Math.PI/2);m.translate(Xt.minX+Xt.width/2,q1,Xt.minZ+Xt.depth/2),m.deleteAttribute("uv"),m.setAttribute("aSurface",new xe(new Float32Array([1,0,1,0,1,0,1,0]),2));const p=new ne(m,f);p.name="dasar-laut",g.add(p);function y(){for(const v of x){const _=v.surf.array;for(let A=0;A<v.map.length;A++)_[A*2]=d[v.map[A]*2],_[A*2+1]=d[v.map[A]*2+1];v.surf.needsUpdate=!0}}return y(),g.userData.applyOcclusion=v=>{for(const _ of v){const A=_.radius,w=Math.max(0,Math.floor((_.x-A-c)/u)),C=Math.min(s,Math.ceil((_.x+A-c)/u)),z=Math.max(0,Math.floor((_.z-A-l)/u)),b=Math.min(r,Math.ceil((_.z+A-l)/u));for(let E=z;E<=b;E++)for(let I=w;I<=C;I++){const X=c+I*u-_.x,W=l+E*u-_.z,q=1-(X*X+W*W)/(A*A);if(q<=0)continue;const M=(E*a+I)*2;d[M]=Math.max(.5,d[M]*(1-_.strength*q*q))}}y()},g.userData.chunks=g.children.length-1,g}const J1=`
uniform sampler2D uShore;
uniform sampler2D uNoise;
uniform float uWaveTime;
uniform vec4 uWorld; // minX, minZ, maxX, maxZ (area data pantai)
varying vec3 vWorld;
varying float vFogDepth;
varying vec2 vLocal; // fase & kekuatan ombak lokal (berubah pelan, cukup per vertex)
${$l}

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
`,Q1=`
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
${$l}

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
`;function Qh(i,t,e,n,s){const r=[];for(let o=n;o>=1;o--)r.push(i-e*(Math.pow(s,o)-1)/(s-1));const a=Math.round((t-i)/e);for(let o=0;o<=a;o++)r.push(i+o*e);for(let o=1;o<=n;o++)r.push(t+e*(Math.pow(s,o)-1)/(s-1));return r}const Ps=48;function tM(i,t){const n=we.size/t;let s=1.01,r=4;for(let y=0;y<60;y++){const v=(s+r)/2;n*(Math.pow(v,12)-1)/(v-1)<5500?s=v:r=v}const a=(s+r)/2,o=Qh(Xt.minX,Xt.maxX,n,12,a),c=Qh(Xt.minZ,Xt.maxZ,n,12,a),l=o.length,u=c.length,h=new Float32Array(l*u*3),d=new Float32Array(l*u);for(let y=0;y<u;y++)for(let v=0;v<l;v++){const _=y*l+v,A=o[v],w=c[y];h[_*3]=A,h[_*3+2]=w,d[_]=A>Xt.minX&&A<Xt.maxX&&w>Xt.minZ&&w<Xt.maxZ?i.heightAt(A,w):-18}const f=l-1-2*12,g=u-1-2*12,x=new Map;for(let y=0;y<u-1;y++)for(let v=0;v<l-1;v++){const _=y*l+v,A=_+1,w=_+l,C=w+1;if(Math.min(d[_],d[A],d[w],d[C])>1.6)continue;const z=v-12,b=y-12,E=z>=0&&b>=0&&z<f&&b<g?`${Math.floor(z/Ps)},${Math.floor(b/Ps)}`:"luar";let I=x.get(E);I||x.set(E,I=[]),I.push(_,w,A,A,w,C)}const m=new xe(h,3),p=[];for(const[y,v]of x){const _=new le;if(_.setAttribute("position",m),_.setIndex(v),y==="luar"){p.push({geometry:_,culled:!1});continue}const[A,w]=y.split(",").map(Number),C=o[12+A*Ps],z=o[Math.min(l-1,12+(A+1)*Ps)],b=c[12+w*Ps],E=c[Math.min(u-1,12+(w+1)*Ps)];_.boundingSphere=new ln(new B((C+z)/2,0,(b+E)/2),Math.hypot(z-C,E-b)/2+2),p.push({geometry:_,culled:!0})}return p}function eM({ground:i,shore:t,env:e,noiseTexture:n,normalTexture:s,quality:r}){const a=r.water,o={DETAIL_LAYERS:a.detailLayers};a.cloudReflection&&(o.CLOUD_REFLECTION=""),r.caustics&&(o.CAUSTICS="");const c=new kn({vertexShader:J1,fragmentShader:Q1,defines:o,transparent:!0,depthWrite:!1,uniforms:{uShore:{value:t.texture},uNoise:{value:n},uNormal:{value:s},uWaveTime:Zl,uWorld:{value:new ee(Xt.minX,Xt.minZ,Xt.maxX,Xt.maxZ)},uShallow:{value:new zt("#3fd6c6")},uDeep:{value:new zt("#0a4a82")},uZenith:{value:e.zenith},uHorizon:{value:e.horizon},uSunDir:{value:e.sunDir},uSunColor:{value:new zt("#fff2d2")},uFogColor:{value:e.fog.color},uFogNear:{value:e.fog.near},uFogFar:{value:e.fog.far}}}),l=new Ce;l.name="laut",l.position.y=we.seaLevel;for(const{geometry:u,culled:h}of tM(i,a.segments)){const d=new ne(u,c);d.frustumCulled=h,d.renderOrder=1,l.add(d)}return l.userData.material=c,l}const nM=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww; // selalu di bidang terjauh
}
`,iM=`
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
`;function sM(i,{noiseTexture:t,quality:e}){const n=new B(.5,.52,.32).normalize(),s=new zt("#d3ecf6"),r=new zt("#3d8bd4");i.fog=new Ll(s.clone(),380,2400),i.background=s.clone();const a={uZenith:{value:r},uHorizon:{value:s},uSunDir:{value:n},uSunColor:{value:new zt("#fff0c8")},uNoise:{value:t},uTime:{value:0}},o=new kn({vertexShader:nM,fragmentShader:iM,side:nn,depthWrite:!1,uniforms:a}),c=new ne(new lo(1,32,16),o);c.name="langit",c.frustumCulled=!1,c.renderOrder=-1,c.onBeforeRender=(m,p,y)=>{c.position.copy(y.position),c.scale.setScalar(y.far*.9),c.updateMatrixWorld()},i.add(c);const l=new Dd("#d6ecff","#5d7a3c",1.1);i.add(l);const u=new Vl("#fff1d6",2.4);u.position.copy(n).multiplyScalar(500),i.add(u,u.target),e.shadows&&(u.castShadow=!0,u.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize),u.shadow.camera.near=1,u.shadow.camera.far=1600,u.shadow.bias=-6e-4,u.shadow.radius=2);const h=new Ut().lookAt(n,new B,new B(0,1,0)),d=h.clone().invert(),f=new B,g=Math.log(1.15);function x(m,p){if(!u.castShadow)return;const y=m.position.distanceTo(p),v=di.clamp(y*.95,45,560),_=Math.exp(Math.ceil(Math.log(v)/g)*g),A=u.shadow.camera;A.right!==_&&(A.left=-_,A.right=_,A.top=_,A.bottom=-_,A.updateProjectionMatrix());const w=2*_/u.shadow.mapSize.x;f.copy(p).lerp(m.position,.25).applyMatrix4(d),f.x=Math.round(f.x/w)*w,f.y=Math.round(f.y/w)*w,f.applyMatrix4(h),u.target.position.copy(f),u.position.copy(f).addScaledVector(n,800),u.shadow.normalBias=w*1.6}return{sunDir:n,zenith:r,horizon:s,fog:i.fog,sun:u,hemi:l,update(m,p,y){a.uTime.value=m,x(p,y)}}}const hi=Math.PI*2,Jl=new B(0,1,0);function Re(i,t,{centers:e=null,dark:n=.62,light:s=1.08,rings:r=0}={}){const a=i.index?i.toNonIndexed():i;a.attributes.uv&&a.deleteAttribute("uv");const o=a.attributes.position;if(e){const f=a.attributes.normal,g=new B,x=new B;for(let m=0;m<o.count;m++){x.set(0,0,0);for(const[p,y]of e)x.addScaledVector(g.fromBufferAttribute(o,m).sub(p).normalize(),y);x.normalize(),f.setXYZ(m,x.x,x.y,x.z)}}a.computeBoundingBox();const{min:c,max:l}=a.boundingBox,u=Math.max(.001,l.y-c.y),h=new zt(t),d=new Float32Array(o.count*3);for(let f=0;f<o.count;f++){const g=o.getY(f);let x=n+(s-n)*((g-c.y)/u);r&&(x*=.88+.12*Math.sin(g*r)),d[f*3]=h.r*x,d[f*3+1]=h.g*x,d[f*3+2]=h.b*x}return a.setAttribute("color",new xe(d,3)),a}function qr(i,t,[e,n,s],r=.82){const a=new Xi(i,t);return a.scale(1,r,1),a.translate(e,n,s),a}function rM(i,t){const n=(g,x)=>x.set(0,i*(.3*g-t*g*g),i*g*(1-.12*g)),s=[],r=[],a=new B,o=new B,c=new B,l=new B,u=new B,h=new B,d=new B;for(let g=-1;g<=1;g+=2)for(let x=0;x<9;x++){const m=.08+.86*x/9,p=m+.86/9*.95,y=1.3*Math.sin(Math.PI*(.16+.76*m));n(m,a),n(p,o),n(Math.min(1,(m+p)/2+.07),l),c.set(l.x+g*y,l.y-.4*y,l.z+.3*y),u.crossVectors(h.subVectors(o,a),d.subVectors(c,a));const v=u.y<0;v&&u.negate(),u.normalize().lerp(Jl,.45).normalize();for(const _ of v?[a,c,o]:[a,o,c])s.push(_.x,_.y,_.z),r.push(u.x,u.y,u.z)}const f=new le;return f.setAttribute("position",new Vt(s,3)),f.setAttribute("normal",new Vt(r,3)),f}function jd(){const i=[],n=new Ve(.2,.36,8,6,5,!0);n.translate(0,8/2,0);const s=n.attributes.position;for(let l=0;l<s.count;l++)s.setX(l,s.getX(l)+.035*s.getY(l)*s.getY(l));i.push(Re(n,"#8d6d48",{dark:.7,light:1.05,rings:9}));const r=.035*8*8,a=8;for(let l=0;l<a;l++){const u=l%4===3,h=rM(u?4:4.5,u?.75:.5);h.rotateX(-.15+l%3*.12),h.rotateY(l/a*hi+l%2*.25),h.translate(r,8-.05,0),i.push(Re(h,u?"#8c9a38":l%2?"#3f8f2f":"#4c9e34",{dark:.8,light:1.05}))}const o=new Xi(.42,0);o.translate(r,8-.15,0),i.push(Re(o,"#6b5a2e"));const c=[[0,.36,.5,"#5f8f23"],[.8,.42,.62,"#6f9c2b"],[1.6,.37,.52,"#c9921f"],[2.5,.43,.66,"#5f8f23"],[3.3,.36,.5,"#7c5a32"],[4.1,.42,.63,"#6f9c2b"],[4.9,.37,.54,"#5f8f23"],[5.7,.43,.67,"#d4a02a"]];for(const[l,u,h,d]of c){const f=new B(r+Math.cos(l)*u,8-h,Math.sin(l)*u),g=new Xi(1,0);g.scale(.21,.26,.21),g.translate(f.x,f.y,f.z),i.push(Re(g,d,{centers:[[f,1]],dark:.7,light:1.12}))}for(const l of[.4,3.6]){const u=new B(r,7.8,0),h=new B(r+Math.cos(l)*.34,8-.6,Math.sin(l)*.34),d=h.clone().sub(u),f=new Ve(.03,.05,d.length(),4,1,!0);f.applyQuaternion(new _e().setFromUnitVectors(Jl,d.normalize())),f.translate((u.x+h.x)/2,(u.y+h.y)/2,(u.z+h.z)/2),i.push(Re(f,"#b8923f",{dark:.85,light:1}))}return fs(i)}function al(i){const t=[],e=new Ve(.3,.55,6.6,6,2,!1);e.translate(0,3.3,0),t.push(Re(e,"#6b4f33",{dark:.55,light:1}));for(const r of[-1,1]){const a=new Ve(.1,.18,2.6,5,1,!0);a.rotateZ(r*.75),a.translate(r*.85,5.6,r*.3),t.push(Re(a,"#6b4f33",{dark:.7,light:1}))}const n=new B(0,7.4,0),s=[[0,7.5,0,3,"#2f7d2a"],[1.7,6.7,.8,2.3,"#3a8c30"],[-1.5,6.8,-.9,2.4,"#2a7027"],[.2,9,-.2,2.1,"#3f9534"]];for(const[r,a,o,c,l]of s){const u=qr(c,i,[r,a,o]);t.push(Re(u,l,{centers:[[n,.65],[new B(r,a,o),.35]],dark:.66,light:1.12}))}return fs(t)}function Yd(i){const t=[],e=new Ve(.3,.6,9,6,3,!1);e.translate(0,4.5,0);const n=e.attributes.position;for(let r=0;r<n.count;r++)n.setX(r,n.getX(r)+.006*n.getY(r)*n.getY(r));t.push(Re(e,"#75593a",{dark:.55,light:1}));for(let r=0;r<3;r++){const a=new Ve(.08,.16,3.4,5,1,!0);a.rotateZ(.9),a.translate(1.3,8.4,0),a.rotateY(r*hi/3+.4),a.translate(.45,0,0),t.push(Re(a,"#75593a",{dark:.75,light:1}))}const s=new B(.5,9.8,0);for(const[r,a,o,c,l,u]of[[.5,9.7,0,4.4,"#3b7f2c",.34],[1.2,10.6,-.6,3,"#468f33",.4],[-1.4,9.9,1.1,2.6,"#357528",.4]]){const h=qr(c,i,[r,a,o],u);t.push(Re(h,l,{centers:[[s,.5],[new B(r,a-1,o),.5]],dark:.66,light:1.15}))}return fs(t)}function eo(i,t){const e=[],n=new B(0,.5,0);for(const[s,r,a,o,c]of[[0,.65,0,.95,"#3f8a2e"],[.75,.5,.3,.7,"#4b9a35"],[-.6,.45,-.4,.65,"#45922f"]]){const l=qr(o,i,[s,r,a],.75);e.push(Re(l,c,{centers:[[n,.6],[new B(s,r,a),.4]],dark:.75,light:1.15}))}return t&&[[.2,1.35,.5],[-.5,1.1,.4],[.9,.95,-.2],[-.2,1.3,-.6],[.5,1.15,.85],[-.9,.8,-.1]].forEach(([r,a,o],c)=>{const l=new Xi(.17,0);l.translate(r,a,o),e.push(Re(l,t[c%t.length],{dark:.9,light:1.1}))}),fs(e)}function aM(i){const t=[],e=new Ve(.85,1.7,9,9,3,!1);e.translate(0,4.5,0),t.push(Re(e,"#5d4a3a",{dark:.5,light:.95}));for(let r=0;r<6;r++){const a=new jn(.35,1.6,2.2);a.translate(0,.6,1.4),a.rotateY(r/6*hi+.3),t.push(Re(a,"#5d4a3a",{dark:.55,light:.9}))}for(let r=0;r<22;r++){const a=r/22*hi+r%3*.37,o=2.6+r%5*.6,c=9.5-r%4*.8,l=new Ve(.05,.1,c,4,1,!0);l.translate(Math.cos(a)*o,c/2,Math.sin(a)*o),t.push(Re(l,"#6e5a46",{dark:.7,light:1}))}const n=new B(0,12.5,0),s=[[0,13.5,0,6.5,"#2c6a26"]];for(let r=0;r<9;r++){const a=r/9*hi;s.push([Math.cos(a)*7.2,11.6+r%2*.8,Math.sin(a)*7.2,4.6,r%2?"#35782d":"#2a6324"])}for(let r=0;r<5;r++){const a=r/5*hi+.6;s.push([Math.cos(a)*3.6,15.6,Math.sin(a)*3.6,3.8,"#3d8433"])}for(const[r,a,o,c,l]of s){const u=qr(c,i,[r,a,o],.62);t.push(Re(u,l,{centers:[[n,.6],[new B(r,a,o),.4]],dark:.6,light:1.1}))}return fs(t)}function oM(){const i=[],t=new Ve(.16,.26,2.2,6,1,!0);t.translate(0,1.1,0),i.push(Re(t,"#8d7c69",{dark:.7,light:1.05}));for(let e=0;e<5;e++){const n=e/5*hi+.4,s=new B(Math.cos(n)*1.7,3.6+e%2*.5,Math.sin(n)*1.7),r=new B(0,2.1,0),a=s.clone().sub(r),o=new Ve(.07,.12,a.length(),5,1,!0);o.applyQuaternion(new _e().setFromUnitVectors(Jl,a.clone().normalize())),o.translate((r.x+s.x)/2,(r.y+s.y)/2,(r.z+s.z)/2),i.push(Re(o,"#8d7c69",{dark:.75,light:1.05}));const c=qr(.95,0,[s.x,s.y+.35,s.z],.6);i.push(Re(c,"#3e8a35",{centers:[[s,1]],dark:.75,light:1.15}));for(let l=0;l<4;l++){const u=new Xi(.14,0);u.translate(s.x+Math.cos(l*1.7)*.6,s.y+.75,s.z+Math.sin(l*1.7)*.6),i.push(Re(u,l%2?"#fbf6e8":"#f6e08a",{dark:.95,light:1.05}))}}return fs(i)}function cM(){const i=[],t=new Ve(.13,.2,2.6,6,1,!0);t.translate(0,1.3,0),i.push(Re(t,"#7f8f3c",{dark:.7,light:1.05}));for(let e=0;e<7;e++){const n=new bn(.75,2.6,1,4),s=n.attributes.position;for(let r=0;r<s.count;r++){const a=(s.getY(r)+1.3)/2.6;s.setY(r,a*2.4),s.setZ(r,a*a*1.6),s.setY(r,s.getY(r)-a*a*1.2)}n.computeVertexNormals(),n.rotateX(-.25),n.rotateY(e/7*hi+e%2*.4),n.translate(0,2.4,0),i.push(Re(n,e%3?"#5ea83a":"#7bbf45",{dark:.8,light:1.1}))}return fs(i)}const Kd={value:0},zn={a:{value:new B},b:{value:new B},r:{value:0}};function qd(i){const t=new Yn({vertexColors:!0,side:en});return t.onBeforeCompile=e=>{e.uniforms.uTime=Kd,e.uniforms.uNoise={value:i},e.uniforms.uSeeA=zn.a,e.uniforms.uSeeB=zn.b,e.uniforms.uSeeR=zn.r,e.vertexShader=`uniform float uTime;
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
      diffuseColor.rgb *= 0.74 + 0.5 * leaf;`)},t}const tf=we.size/3;function Ze(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,toMatrix:a}){const o=new Ce;o.name=i;const c=new Map;for(const h of n){const d=`${Math.floor(h.x/tf)},${Math.floor(h.z/tf)}`;c.has(d)||c.set(d,[]),c.get(d).push(h)}const l=new Ut,u=new zt;for(const h of c.values()){const d=new rr(t,e,h.length);h.forEach((f,g)=>{a(f,l,u),d.setMatrixAt(g,l),d.setColorAt(g,u)}),d.instanceMatrix.needsUpdate=!0,d.computeBoundingSphere(),d.castShadow=s,d.receiveShadow=r,o.add(d)}return o}const ef=new _e,nf=new rn,sf=new B,rf=new B;function In({scaleMin:i,scaleMax:t,tilt:e,tint:n,sink:s=.15}){return(r,a,o)=>{nf.set((r.b-.5)*e,r.a*hi,(r.c-.5)*e),ef.setFromEuler(nf);const c=i+(t-i)*r.b;rf.set(c,c*(.9+.2*r.c),c),sf.set(r.x,r.y-s*c,r.z),a.compose(sf,ef,rf);const l=1-n+n*2*r.c,u=(r.a-.5)*n;o.setRGB(l*(1+u),l,l*(1-u))}}function lM({ground:i,grid:t,quality:e,noiseTexture:n,reserved:s=null}){const r=e.treeDensity,a=e.canopyDetail,{shadows:o}=e,c=vn({ground:i,grid:t,kind:"kelapa",seed:101,radius:1.8,reserved:s,count:Math.round(170*r),accept:(x,m,p,y,v)=>p>.9&&p<4.2&&y<.3&&v()<.55}),l=vn({ground:i,grid:t,kind:"pohon",seed:202,radius:2.3,reserved:s,count:Math.round(900*r),accept:(x,m,p,y)=>p>4&&p<44&&y<.6&&Oi(x,m)>.47}),u=vn({ground:i,grid:t,kind:"pohon",seed:303,radius:4.5,reserved:s,count:Math.round(110*r),accept:(x,m,p,y,v)=>{if(p<5||p>42||y>.45)return!1;const _=Oi(x,m);return _>.34&&_<.49&&v()<.35+.65*Wr(x,m)}}),h=vn({ground:i,grid:t,kind:"semak",seed:404,radius:1.1,reserved:s,count:Math.round(700*r),accept:(x,m,p,y,v)=>{if(p<we.beachTop+.6||p>46||y>.7)return!1;const _=Oi(x,m);return _>.4&&_<.56||v()<.06}}),d=vn({ground:i,grid:t,kind:"semak",seed:505,radius:1,reserved:s,count:Math.round(150*r),accept:(x,m,p,y,v)=>p>we.beachTop+.4&&p<30&&y<.5&&Oi(x,m)<.5&&v()<.5}),f=qd(n),g=new Ce;return g.name="vegetasi",g.add(Ze("kelapa",jd(),f,c,{castShadow:o,receiveShadow:o,toMatrix:In({scaleMin:.8,scaleMax:1.25,tilt:.35,tint:.1})}),Ze("pohon-hutan",al(a),f,l,{castShadow:o,receiveShadow:o,toMatrix:In({scaleMin:.75,scaleMax:1.4,tilt:.12,tint:.16})}),Ze("pohon-payung",Yd(a),f,u,{castShadow:o,receiveShadow:o,toMatrix:In({scaleMin:.8,scaleMax:1.2,tilt:.08,tint:.12})}),Ze("semak",eo(0,null),f,h,{castShadow:o&&e.level==="tinggi",receiveShadow:o,toMatrix:In({scaleMin:.7,scaleMax:1.5,tilt:.2,tint:.2,sink:.1})}),Ze("semak-bunga",eo(0,["#e0353f","#f4c02c","#f06aa8"]),f,d,{castShadow:o&&e.level==="tinggi",receiveShadow:o,toMatrix:In({scaleMin:.7,scaleMax:1.2,tilt:.15,tint:.08,sink:.1})})),g.userData.occlusion=[...l.map(x=>({x:x.x,z:x.z,radius:4.8,strength:.4})),...u.map(x=>({x:x.x,z:x.z,radius:5.5,strength:.3})),...c.map(x=>({x:x.x,z:x.z,radius:2.4,strength:.18})),...h.map(x=>({x:x.x,z:x.z,radius:1.8,strength:.2})),...d.map(x=>({x:x.x,z:x.z,radius:1.6,strength:.15}))],g.userData.trunks=[...c.map(x=>({x:x.x,z:x.z,radius:.45,kind:"pohon"})),...l.map(x=>({x:x.x,z:x.z,radius:.7,kind:"pohon"})),...u.map(x=>({x:x.x,z:x.z,radius:.75,kind:"pohon"}))],g.userData.counts={kelapa:c.length,pohon:l.length,payung:u.length,semak:h.length,bunga:d.length},g.userData.update=x=>{Kd.value=x},g}function af(i,t=0){const e=new Bl(1,t),n=e.attributes.position,s=new B;for(let l=0;l<n.count;l++){s.fromBufferAttribute(n,l);const u=.72+.5*Bd(s.x*1.6+i,s.z*1.6+s.y*1.3-i,5);s.multiplyScalar(u),s.y*=.82,s.y<0&&(s.y*=.55),n.setXYZ(l,s.x,s.y,s.z)}e.computeVertexNormals(),e.computeBoundingBox();const{min:r,max:a}=e.boundingBox,o=new zt("#a59c8e"),c=new Float32Array(n.count*3);for(let l=0;l<n.count;l++){const h=.66+.46*((n.getY(l)-r.y)/(a.y-r.y));c[l*3]=o.r*h,c[l*3+1]=o.g*h,c[l*3+2]=o.b*h}return e.setAttribute("color",new xe(c,3)),e.deleteAttribute("uv"),e}const of=new _e,cf=new rn,lf=new B,uf=new B;function uM(i,t,e){cf.set((i.b-.5)*.5,i.a*Math.PI*2,(i.c-.5)*.5),of.setFromEuler(cf);const n=i.r*.95;uf.set(n*(.8+.4*i.c),n*(.8+.5*i.b),n*(.8+.4*i.a)),lf.set(i.x,i.y-.12*n,i.z),t.compose(lf,of,uf);const s=.82+.36*i.c,r=(i.a-.5)*.18;e.setRGB(s*(1+r),s,s*(1-r))}function hM({ground:i,grid:t,quality:e,reserved:n=null}){const s=e.treeDensity,r=vn({ground:i,grid:t,kind:"batu",seed:606,reserved:n,count:Math.round(160*s),radius:h=>1+h()*1.8,accept:(h,d,f,g,x)=>{if(f<12)return!1;const m=Math.min(1,g*1.2+Math.max(0,f-40)/20);return x()<Wr(h,d)*(.25+.75*m)}}),a=vn({ground:i,grid:t,kind:"batu",seed:707,reserved:n,count:Math.round(110*s),radius:h=>.4+h()*.6,accept:(h,d,f,g,x)=>f>.3&&f<we.beachTop+.5&&x()<.25||f>4&&f<45&&g<.8&&x()<.35+.65*Wr(h,d)}),o=new Yn({vertexColors:!0}),c={castShadow:e.shadows,receiveShadow:e.shadows,toMatrix:uM},l=new Ce;l.name="batu";const u=[...r,...a];return l.add(Ze("batu-a",af(1.3),o,u.filter((h,d)=>d%2===0),c),Ze("batu-b",af(7.9),o,u.filter((h,d)=>d%2===1),c)),l.userData.occlusion=u.map(h=>({x:h.x,z:h.z,radius:h.r*1.6,strength:.3})),l.userData.colliders=u.map(h=>({x:h.x,z:h.z,radius:h.r*.9,kind:"batu"})),l.userData.count=u.length,l}const Ae=16,Zd=.02,fM=3,es=8,ol=Math.PI*2,dM=(i,t)=>Math.min(1,Math.max(Zd,Math.pow(t/Math.max(i,.001),1.5)));function pM(i){const t=Vr(99),e=[],n=[],s=[],r=new zt().setRGB(.14,.28,.05),a=new zt().setRGB(.3,.5,.11),o=new zt().setRGB(.4,.62,.13),c=new zt,l=2;for(let h=0;h<i;h++){const d=h/i*ol+t()*.9,f=Math.cos(d),g=Math.sin(d),x=.2+t()*.4,m=.6+t()*.4,p=.075+t()*.05,y=.03+t()*.16,v=e.length/3;for(let A=0;A<=l;A++){const w=A/l,C=y+x*w*w,z=f*C,b=g*C,E=m*w;if(c.copy(r).lerp(a,Math.min(1,w*1.6)).lerp(o,Math.max(0,w*1.6-.6)),A<l){const I=p*(1-w*.6);e.push(z+g*I,E,b-f*I,z-g*I,E,b+f*I),n.push(c.r,c.g,c.b,c.r,c.g,c.b)}else e.push(z,E,b),n.push(c.r,c.g,c.b)}for(let A=0;A<l-1;A++){const w=v+A*2;s.push(w,w+1,w+2,w+1,w+3,w+2)}const _=v+(l-1)*2;s.push(_,_+1,_+2)}const u=new le;return u.setAttribute("position",new Vt(e,3)),u.setAttribute("color",new Vt(n,3)),u.setAttribute("normal",new Vt(new Array(e.length).fill(0).map((h,d)=>d%3===1?1:0),3)),u.setIndex(s),u}function mM(i){const t=new Yn({vertexColors:!0,side:en});return t.onBeforeCompile=e=>{Object.assign(e.uniforms,i),e.vertexShader=`
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
    `)},t}function gM(i,t){let e=0,n=i.length;for(;e<n;){const s=e+n>>1;i[s]<t?e=s+1:n=s}return e}const hf={count:0};function xM({ground:i,grid:t,quality:e}){const n=e.grass,s=pM(n.blades),r=new el;r.index=s.index;for(const E of["position","color","normal"])r.setAttribute(E,s.attributes[E]);const a=new Float32Array(n.max*es),o=new Ay(a,es,1).setUsage(Hi);r.setAttribute("aOffset",new Gr(o,4,0)),r.setAttribute("aParams",new Gr(o,4,4)),r.instanceCount=0;const c={uTime:{value:0},uCamPos:{value:new B},uRadius:{value:n.radius},uNear:{value:n.near},uFar:{value:Zd},uWind:{value:new St(1,.45).normalize()}},l=new ne(r,mM(c));l.name="rumput",l.frustumCulled=!1,l.receiveShadow=e.shadows&&n.shadows,l.visible=!1;const u=new Map,h=4,d=new Float32Array((h+1)*(h+1)),f=new Float32Array((h+1)*(h+1)),g=(E,I,X)=>{const W=I*h,q=X*h,M=Math.min(h-1,Math.floor(W)),S=Math.min(h-1,Math.floor(q)),R=W-M,T=q-S,k=E[S*(h+1)+M],F=E[S*(h+1)+M+1],P=E[(S+1)*(h+1)+M],N=E[(S+1)*(h+1)+M+1];return(k+(F-k)*R)*(1-T)+(P+(N-P)*R)*T};function x(E,I){const X=E*Ae,W=I*Ae;let q=!1;for(let N=0;N<=h;N++)for(let j=0;j<=h;j++){const H=X+j*Ae/h,V=W+N*Ae/h,tt=V1(H,V);d[N*(h+1)+j]=tt.forest,f[N*(h+1)+j]=tt.patch,!q&&qh(tt.forest,tt.patch,H,V,i.heightAt(H,V),0)>.02&&(q=!0)}if(!q)return hf;const M=Vr(R1(E,I)^2654435769),S=Math.round(Ae*Ae*n.density),R=[];let T=1/0,k=-1/0;for(let N=0;N<S;N++){const j=X+M()*Ae,H=W+M()*Ae,V=M(),tt=i.heightAt(j,H),Y=(j-X)/Ae,K=(H-W)/Ae;if(V>=qh(g(d,Y,K),g(f,Y,K),j,H,tt,i.slopeAt(j,H))||t.covered(j,H,"batu",.85))continue;const it=M()<.12?M()*.5:.6+M()*.4;R.push([j,tt-.04,H,M(),M()*ol,.6+M()*.7,it,M()*ol]),T=Math.min(T,tt),k=Math.max(k,tt)}if(!R.length)return hf;R.sort((N,j)=>N[3]-j[3]);const F=new Float32Array(R.length*es),P=new Float32Array(R.length);return R.forEach((N,j)=>{F.set(N,j*es),P[j]=N[3]}),{count:R.length,data:F,ranks:P,center:new B(X+Ae/2,(T+k)/2,W+Ae/2),radius:Math.hypot(Ae/2,Ae/2,(k-T)/2)+1.4}}const m=new Yr,p=new Ut,y=new ln,v=new B(1/0,0,0),_=new _e,A=[],w=[];let C=!1;function z(E,I,X){if(!E.count)return;const W=Math.max(0,I.distanceTo(E.center)-E.radius);W>X||(y.center.copy(E.center),y.radius=E.radius,m.intersectsSphere(y)&&A.push({ch:E,d:W}))}function b(E,I){c.uTime.value=I;const X=E.position;if(c.uCamPos.value.copy(X),!C&&v.equals(X)&&_.equals(E.quaternion))return;v.copy(X),_.copy(E.quaternion),C=!1,E.updateMatrixWorld(),p.multiplyMatrices(E.projectionMatrix,E.matrixWorldInverse),m.setFromProjectionMatrix(p);const W=n.radius,q=Math.floor((X.x-W)/Ae),M=Math.floor((X.x+W)/Ae),S=Math.floor((X.z-W)/Ae),R=Math.floor((X.z+W)/Ae);A.length=0,w.length=0;for(let k=q;k<=M;k++)for(let F=S;F<=R;F++){const P=(k+32768)*65536+(F+32768),N=u.get(P);if(N===void 0){const j=Math.max(0,Math.abs(X.x-(k+.5)*Ae)-Ae*.71),H=Math.max(0,Math.abs(X.z-(F+.5)*Ae)-Ae*.71),V=j*j+H*H;if(V>W*W)continue;const tt=(k+.5)*Ae,Y=(F+.5)*Ae;y.center.set(tt,i.heightAt(tt,Y),Y),y.radius=Ae*.71+12;const K=m.intersectsSphere(y);w.push({i:k,j:F,key:P,order:V+(K?0:1e9)});continue}z(N,X,W)}if(w.length){w.sort((P,N)=>P.order-N.order);const k=performance.now();let F=0;for(const P of w){if(F>0&&performance.now()-k>fM)break;const N=x(P.i,P.j);u.set(P.key,N),z(N,X,W),F++}C=F<w.length}A.sort((k,F)=>k.d-F.d);let T=0;for(const{ch:k,d:F}of A){const P=Math.min(gM(k.ranks,dM(F,n.near)),n.max-T);if(!(P<=0)&&(a.set(k.data.subarray(0,P*es),T*es),T+=P,T>=n.max))break}r.instanceCount=T,l.visible=T>0,T>0&&(o.clearUpdateRanges(),o.addUpdateRange(0,T*es),o.needsUpdate=!0)}return l.userData.update=b,l.userData.stats=()=>({instances:r.instanceCount,chunks:u.size}),l}const Ri=8,ff=(i,t)=>(i+32768)*65536+(t+32768);function _M(i){if(i.hx===void 0)return i;const t=i.rot||0;return{...i,cos:Math.cos(t),sin:Math.sin(t),radius:Math.hypot(i.hx,i.hz)}}function Is(i,t,e,n){if(i.hx===void 0){const g=t-i.x,x=e-i.z,m=Math.hypot(g,x);return n.gap=m-i.radius,n.nx=m>1e-6?g/m:1,n.nz=m>1e-6?x/m:0,n.px=i.x+n.nx*i.radius,n.pz=i.z+n.nz*i.radius,n}const s=t-i.x,r=e-i.z,a=s*i.cos-r*i.sin,o=s*i.sin+r*i.cos,c=Math.abs(a)-i.hx,l=Math.abs(o)-i.hz;let u,h,d,f;if(c>0||l>0){d=Math.max(-i.hx,Math.min(i.hx,a)),f=Math.max(-i.hz,Math.min(i.hz,o));const g=a-d,x=o-f,m=Math.hypot(g,x);n.gap=m,u=g/m,h=x/m}else c>l?(n.gap=c,u=Math.sign(a)||1,h=0,d=u*i.hx,f=o):(n.gap=l,u=0,h=Math.sign(o)||1,d=a,f=h*i.hz);return n.nx=u*i.cos+h*i.sin,n.nz=-u*i.sin+h*i.cos,n.px=i.x+d*i.cos+f*i.sin,n.pz=i.z-d*i.sin+f*i.cos,n}function vM(i){const t=i.map(_M),e=new Map;for(const a of t){const o=a.radius;for(let c=Math.floor((a.x-o)/Ri);c<=Math.floor((a.x+o)/Ri);c++)for(let l=Math.floor((a.z-o)/Ri);l<=Math.floor((a.z+o)/Ri);l++){const u=ff(c,l);let h=e.get(u);h||e.set(u,h=[]),h.push(a)}}let n=0;function s(a,o,c,l){n++;for(let u=Math.floor((a-c)/Ri);u<=Math.floor((a+c)/Ri);u++)for(let h=Math.floor((o-c)/Ri);h<=Math.floor((o+c)/Ri);h++){const d=e.get(ff(u,h));if(d)for(const f of d){if(f.seen===n)continue;f.seen=n;const g=f.x-a,x=f.z-o,m=f.radius+c;if(!(g*g+x*x>m*m)&&l(f)===!1)return!1}}return!0}const r={gap:0,nx:0,nz:0,px:0,pz:0};return{list:t,count:t.length,forEachNear:s,probe:Is,resolve(a,o,c){let l=!1;return s(a.x,a.z,o,u=>{if(Is(u,a.x,a.z,r),r.gap>=o)return!0;a.x+=r.nx*(o-r.gap),a.z+=r.nz*(o-r.gap);const h=c.x*r.nx+c.z*r.nz;return h<0&&(c.x-=h*r.nx,c.z-=h*r.nz),l=!0,!0}),l},isFree(a,o,c){return s(a,o,c,l=>Is(l,a,o,r).gap>=c)},clearance(a,o,c=4){let l=c;return s(a,o,c,u=>(l=Math.min(l,Is(u,a,o,r).gap),!0)),l},hitAt(a,o,c){let l=null,u=c;return s(a,o,c,h=>{const{gap:d}=Is(h,a,o,r);return d<u&&(u=d,l=h.hx===void 0?h:{x:r.px,z:r.pz,radius:0,kind:h.kind}),!0}),l},hitAll(a,o,c,l=8){const u=[];return s(a,o,c,h=>{const{gap:d}=Is(h,a,o,r);return d<c&&u.push({o:h.hx===void 0?h:{x:r.px,z:r.pz,radius:0,kind:h.kind},gap:d}),!0}),u.sort((h,d)=>h.gap-d.gap).slice(0,l).map(h=>h.o)}}}const pe=2,Rn=-500-pe*Math.ceil((-500-Xt.minX)/pe),Cn=-500-pe*Math.ceil((-500-Xt.minZ)/pe),ec=1.25,yr=.45,yM=12e4,{SQRT2:Ls}=Math,MM=[[1,0,1],[0,1,2],[1,1,4],[-1,1,8]];function bM(i,t,e,n,s,r){const a=e-i,o=n-t,c=Math.max(0,Math.min(1,((s-i)*a+(r-t)*o)/(a*a+o*o))),l=i+a*c-s,u=t+o*c-r;return l*l+u*u}class SM{constructor(t){this.idx=new Int32Array(t),this.key=new Float64Array(t),this.size=0}push(t,e){let n=this.size++;for(;n>0;){const s=n-1>>1;if(this.key[s]<=e)break;this.idx[n]=this.idx[s],this.key[n]=this.key[s],n=s}this.idx[n]=t,this.key[n]=e}pop(){const t=this.idx[0],e=this.idx[--this.size],n=this.key[this.size];let s=0;for(;;){let r=2*s+1;if(r>=this.size||(r+1<this.size&&this.key[r+1]<this.key[r]&&r++,this.key[r]>=n))break;this.idx[s]=this.idx[r],this.key[s]=this.key[r],s=r}return this.idx[s]=e,this.key[s]=n,t}}function AM(i,t){const e=Math.ceil((Xt.maxX-Rn)/pe),n=Math.ceil((Xt.maxZ-Cn)/pe),s=e*n,r=I=>Rn+(I+.5)*pe,a=I=>Cn+(I+.5)*pe,o=new Float32Array(s);for(let I=0;I<n;I++)for(let X=0;X<e;X++)o[I*e+X]=i.heightAt(r(X),a(I));const c=new Uint8Array(s);for(let I=1;I<n-1;I++)for(let X=1;X<e-1;X++){const W=I*e+X;if(o[W]<-1)continue;const q=(o[W+1]-o[W-1])/(2*pe),M=(o[W+e]-o[W-e])/(2*pe);Math.hypot(q,M)<=ec&&(c[W]=1)}for(const I of i.surfaces){const X=Math.hypot(I.hx,I.hz),W=Math.max(0,Math.floor((I.x-X-Rn)/pe)),q=Math.min(e-1,Math.floor((I.x+X-Rn)/pe)),M=Math.max(0,Math.floor((I.z-X-Cn)/pe)),S=Math.min(n-1,Math.floor((I.z+X-Cn)/pe));for(let R=M;R<=S;R++)for(let T=W;T<=q;T++){const k=i.surfaceHeight(I,r(T),a(R)),F=R*e+T;k===-1/0||k<o[F]||(o[F]=k,c[F]=1)}}const l=new Uint8Array(s),u={};function h(I,X,W,q,M){if(I.hx===void 0)return Math.sqrt(bM(X,W,q,M,I.x,I.z))-I.radius;const S=Math.ceil(Math.hypot(q-X,M-W)/.25);let R=1/0;for(let T=0;T<=S;T++){const k=T/S;R=Math.min(R,t.probe(I,X+(q-X)*k,W+(M-W)*k,u).gap)}return R}for(const I of t.list){const X=I.radius+yr,W=Math.max(0,Math.floor((I.x-X-Rn)/pe)-1),q=Math.min(e-1,Math.floor((I.x+X-Rn)/pe)+1),M=Math.max(0,Math.floor((I.z-X-Cn)/pe)-1),S=Math.min(n-1,Math.floor((I.z+X-Cn)/pe)+1);for(let k=M;k<=S;k++)for(let F=W;F<=q;F++){const P=k*e+F,{gap:N}=t.probe(I,r(F),a(k),u);if(N<yr&&(c[P]=0),!(N>yr+pe*Ls))for(const[j,H,V]of MM){const tt=F+j,Y=k+H;tt<0||tt>=e||Y>=n||h(I,r(F),a(k),r(tt),a(Y))<yr&&(l[P]|=V)}}const R=Math.floor((I.x-Rn)/pe),T=Math.floor((I.z-Cn)/pe);R>=0&&T>=0&&R<e&&T<n&&(c[T*e+R]=0)}function d(I,X,W,q){return q===0?l[X*e+Math.min(I,I+W)]&1:W===0?l[Math.min(X,X+q)*e+I]&2:W===q?l[Math.min(X,X+q)*e+Math.min(I,I+W)]&4:q>0?l[X*e+I]&8:l[(X+q)*e+I+W]&8}const f=new Float32Array(s),g=new Int32Array(s),x=new Uint8Array(s),m=new SM(s*2),p=(I,X)=>{const W=Math.min(e-1,Math.max(0,Math.floor((I-Rn)/pe)));return Math.min(n-1,Math.max(0,Math.floor((X-Cn)/pe)))*e+W},y=I=>r(I%e),v=I=>a(Math.floor(I/e)),_=(I,X)=>I<=Rn||X<=Cn||I>=Rn+e*pe||X>=Cn+n*pe?!1:c[p(I,X)]===1,A=(I,X)=>_(I,X)&&t.isFree(I,X,yr);function w(I,X,W,q){const M=Math.hypot(W-I,q-X),S=Math.max(1,Math.ceil(M/.5));let R=i.surfaceAt(I,X);for(let T=1;T<=S;T++){const k=I+(W-I)*T/S,F=X+(q-X)*T/S;if(!A(k,F))return!1;const P=i.surfaceAt(k,F);if(Math.abs(P-R)/(M/S)>ec)return!1;R=P}return!0}function C(I,X,W,q){if(A(I,X))return{x:I,z:X};const M=i.surfaceAt(I,X)<-1,S=Math.hypot(W-I,q-X),R=Math.ceil(S/(pe*.5));for(let T=1;T<=R;T++){const k=I+(W-I)*T/R,F=X+(q-X)*T/R;if(A(k,F)&&(!M||i.surfaceAt(k,F)>-.4))return{x:k,z:F}}return null}function z(I,X=5){if(c[I])return I;const W=I%e,q=Math.floor(I/e);for(let M=1;M<=X;M++)for(let S=-M;S<=M;S++)for(let R=-M;R<=M;R++){if(Math.max(Math.abs(R),Math.abs(S))!==M)continue;const T=W+R,k=q+S;if(!(T<0||k<0||T>=e||k>=n)&&c[k*e+T])return k*e+T}return-1}const b=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Ls],[1,-1,Ls],[-1,1,Ls],[-1,-1,Ls]];function E(I,X){const W=C(X.x,X.z,I.x,I.z);if(!W)return null;if(Math.hypot(W.x-I.x,W.z-I.z)<40&&w(I.x,I.z,W.x,W.z))return[W];const q=z(p(I.x,I.z)),M=z(p(W.x,W.z));if(q<0||M<0)return null;f.fill(1/0),x.fill(0),m.size=0;const S=M%e,R=Math.floor(M/e),T=H=>{const V=Math.abs(H%e-S),tt=Math.abs(Math.floor(H/e)-R);return V+tt+(Ls-2)*Math.min(V,tt)};f[q]=0,m.push(q,T(q));let k=0,F=!1;for(;m.size;){const H=m.pop();if(H===M){F=!0;break}if(x[H])continue;if(x[H]=1,++k>yM)break;const V=H%e,tt=Math.floor(H/e);for(const[Y,K,it]of b){const G=V+Y,ct=tt+K;if(G<0||ct<0||G>=e||ct>=n)continue;const at=ct*e+G;if(!c[at]||x[at]||Y&&K&&(!c[tt*e+G]||!c[ct*e+V])||d(V,tt,Y,K)||Math.abs(o[at]-o[H])/(it*pe)>ec)continue;const mt=f[H]+it;mt<f[at]&&(f[at]=mt,g[at]=H,m.push(at,mt+T(at)))}}if(!F)return null;const P=[M];for(let H=M;H!==q;)H=g[H],P.push(H);P.reverse();const N=[I,...P.map(H=>({x:y(H),z:v(H)})),W],j=[];for(let H=0;H<N.length-1;){let V=H+1;for(;V+1<N.length&&w(N[H].x,N[H].z,N[V+1].x,N[V+1].z);)V++;j.push(N[V]),H=V}return j}return{findPath:E,walkableAt:_,standable:A,lineClear:w,cellSize:pe,size:[e,n],origin:[Rn,Cn]}}function Ql(i){const t=new Map,e=new Map,n=i.clone();return $d(i,n,function(s,r){t.set(r,s),e.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=t.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return e.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function $d(i,t,e){e(i,t);for(let n=0;n<i.children.length;n++)$d(i.children[n],t.children[n],e)}const nc=6,df=.35,pf=1.1,wM=4,TM=9,EM=60,ic=2.6,mf=1,RM=15,gf=5,CM=1.3;function PM(){const i=new co(.5,.58,40),t=[0,1,2,3].map(r=>{const a=new bn(.07,.26);return a.translate(0,.66,0),a.rotateZ(r*Math.PI/2),a}),n=[i,...t].map(r=>r.toNonIndexed()).flatMap(r=>[...r.attributes.position.array]),s=new le;return s.setAttribute("position",new Vt(n,3)),s}function cl(i,t,e,n,s,r=.6){return i.heightAt(n,s)>.5&&i.slopeAt(n,s)<.6&&e.walkableAt(n,s)&&t.isFree(n,s,r)}function IM(i,t,e,n,s){for(let r=0;r<=40;r+=2)for(let a=0;a<Math.PI*2;a+=r?2/r:7){const o=n+Math.cos(a)*r,c=s+Math.sin(a)*r;if(!cl(i,t,e,o,c,.8))continue;const l=[];for(let u=0;u<gf;u++){const h=u/gf*Math.PI*2;l.push({x:o+Math.cos(h)*2.6,z:c+Math.sin(h)*2.6})}if(l.every(u=>cl(i,t,e,u.x,u.z)))return{x:o,z:c,spots:l}}return null}function LM({ground:i,colliders:t,nav:e,asset:n,spawn:s}){const r=new Ce;r.name="musuh";const a=[],o=new bn(1,1),c=new je({color:"#2a0d0d",transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1}),l=new je({color:"#ff4636",depthTest:!1,depthWrite:!1,toneMapped:!1}),u=PM(),h=new je({color:"#ff2a2a",transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1,toneMapped:!1,side:en}),d=n.model.getObjectByName("head-mesh"),f=new B;d.geometry.computeBoundingBox(),d.geometry.boundingBox.getCenter(f);const g=d.geometry.clone().translate(-f.x,-f.y,-f.z);g.deleteAttribute("skinIndex"),g.deleteAttribute("skinWeight");const x=[],m=S=>us.findByName(n.clips,S);function p(S,R){const T=new Ce;T.name="orc";const k=Ql(n.model),F=[];k.traverse(K=>{K.isMesh&&(K.material=K.material.clone(),F.push(K.material))}),T.add(k);const P=new jl(k),N={};for(const K of["idle","walk","die"]){const it=P.clipAction(m(K));K==="die"&&(it.setLoop(Al,1),it.clampWhenFinished=!0),N[K]=it}N.idle.play();const j=new Ce,H=new ne(o,c);H.scale.set(1.08,.2,1),H.renderOrder=11;const V=new ne(o,l);V.renderOrder=12,j.add(H,V),j.visible=!1;const tt=new ne(u,h);tt.visible=!1,tt.renderOrder=13,r.add(T,j,tt),T.position.set(R.x,i.heightAt(R.x,R.z),R.z);const Y=Math.random()*Math.PI*2;return T.rotation.y=Y,{id:S,root:T,model:k,mixer:P,actions:N,current:N.idle,materials:F,bar:j,fill:V,reticle:tt,headMesh:k.getObjectByName("head-mesh"),headBone:k.getObjectByName("head"),home:R,pos:T.position,heading:Y,target:null,wait:Math.random()*3,hp:nc,kx:0,kz:0,flash:0,barTime:0,state:"hidup",deadT:0,headless:!1,marked:!1}}function y(S,R,T=.2){const k=S.actions[R];S.current!==k&&(k.reset().play(),k.crossFadeFrom(S.current,T,!1),S.current=k)}const v=Math.atan2(-s.x,-s.z),_=[{x:s.x+Math.sin(v)*16,z:s.z+Math.cos(v)*16},{x:-60,z:-80},{x:205,z:25},{x:40,z:-200},{x:15,z:190}],A=[];for(const S of _){const R=IM(i,t,e,S.x,S.z);if(R){A.push(R);for(const T of R.spots)a.push(p(a.length,{x:T.x,z:T.z,camp:R}))}}function w(S){S.state="mati",S.deadT=0,S.hp=0,S.marked=!1,S.target=null,y(S,"die",.08)}function C(S){S.state="hidup",S.hp=nc,S.headless=!1,S.headMesh.visible=!0,S.kx=S.kz=0,S.flash=S.barTime=0,S.model.position.y=0,S.pos.set(S.home.x,i.heightAt(S.home.x,S.home.z),S.home.z),S.actions.die.stop(),S.current.stop(),S.current=S.actions.idle,S.current.reset().play()}function z(S){for(let R=0;R<4;R++){const T=Math.random()*Math.PI*2,k=Math.random()*wM,F=S.home.camp.x+Math.cos(T)*k,P=S.home.camp.z+Math.sin(T)*k;if(cl(i,t,e,F,P,.5))return{x:F,z:P}}return null}function b(S,R,T){const k=Math.atan2(Math.sin(R-S.heading),Math.cos(R-S.heading));S.heading+=k*Math.min(1,6*T)}const E=new Ut,I=new Ut().makeTranslation(f.x,f.y,f.z);function X(S,R){let T=x.find(V=>!V.mesh.visible);T||(T={mesh:new ne(g),vel:new B,axis:new B,spin:0,t:0,s:1},T.mesh.castShadow=!0,r.add(T.mesh),x.push(T)),S.root.updateMatrixWorld(!0);const k=S.headMesh.skeleton;E.multiplyMatrices(S.headBone.matrixWorld,k.boneInverses[k.bones.indexOf(S.headBone)]).multiply(S.headMesh.bindMatrix).multiply(I),E.decompose(T.mesh.position,T.mesh.quaternion,T.mesh.scale),T.s=T.mesh.scale.x,T.mesh.material=S.headMesh.material,T.mesh.visible=!0;let F=S.pos.x-R.x,P=S.pos.z-R.z;const N=Math.hypot(F,P)||1;F/=N,P/=N;const j=(Math.random()-.5)*1.6,H=2+Math.random()*1.5;T.vel.set((F-P*j)*H,4.5+Math.random()*1.5,(P+F*j)*H),T.axis.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),T.spin=7+Math.random()*6,T.t=0,S.headMesh.visible=!1,S.headless=!0}function W(S){for(const R of x){if(!R.mesh.visible)continue;R.t+=S;const T=R.mesh.position;R.vel.y-=14*S,T.addScaledVector(R.vel,S),R.mesh.rotateOnWorldAxis(R.axis,R.spin*S);const k=Math.max(i.heightAt(T.x,T.z),-.2)+.4;T.y<k&&(T.y=k,R.vel.y<-2?(R.vel.set(R.vel.x*.55,-R.vel.y*.35,R.vel.z*.55),R.spin*=.5):(R.vel.set(0,0,0),R.spin=0)),R.t>3&&R.mesh.scale.setScalar(R.s*Math.max(0,1-(R.t-3)/.5)),R.t>3.5&&(R.mesh.visible=!1)}}let q=0;const M=new B;return{object:r,list:a,camps:A,get alive(){return a.filter(S=>S.state==="hidup").length},hit(S,R,T,k){const F=[];for(const P of a){if(P.state!=="hidup"||Math.hypot(P.pos.x-S.x,P.pos.z-S.z)>S.r+df)continue;let N=P.pos.x-k.x,j=P.pos.z-k.z;const H=Math.hypot(N,j)||1;N/=H,j/=H,P.kx=N*T,P.kz=j*T,P.hp-=R,P.flash=.15,P.barTime=4,P.target=null,P.hp<=0&&w(P),F.push({id:P.id,x:P.pos.x,y:P.pos.y,z:P.pos.z,dead:P.state!=="hidup"})}return F},decapitate(S,R){const T=[];for(const k of S){const F=a[k];!F||F.state!=="hidup"||(X(F,R),w(F),T.push({id:k,x:F.pos.x,y:F.pos.y,z:F.pos.z}))}return T},pickTargets(S,R,T,k){const F=a.filter(H=>H.state==="hidup"&&Math.hypot(H.pos.x-S,H.pos.z-R)<=T).sort((H,V)=>Math.hypot(H.pos.x-S,H.pos.z-R)-Math.hypot(V.pos.x-S,V.pos.z-R)).slice(0,k),P=[];let N=S,j=R;for(;F.length;){let H=0;for(let tt=1;tt<F.length;tt++)Math.hypot(F[tt].pos.x-N,F[tt].pos.z-j)<Math.hypot(F[H].pos.x-N,F[H].pos.z-j)&&(H=tt);const[V]=F.splice(H,1);P.push({id:V.id,x:V.pos.x,z:V.pos.z}),N=V.pos.x,j=V.pos.z}return P},position(S){const R=a[S];return R&&R.state==="hidup"?{x:R.pos.x,z:R.pos.z}:null},reviveAll(){for(const S of a)C(S)},mark(S,R){for(const T of S)a[T]&&(a[T].marked=R&&a[T].state==="hidup")},update(S,R,T){q+=S;const k=T.position,F=T.attackMove==="penggal";for(const P of a){const N=P.pos.x-k.x,j=P.pos.z-k.z,H=Math.hypot(N,j),V=H<EM;if(P.state==="hilang"){P.deadT+=S,P.deadT>RM&&C(P),P.root.visible=!1,P.bar.visible=P.reticle.visible=!1;continue}if(P.root.visible=V,P.state==="mati")P.deadT+=S,P.deadT>ic&&(P.model.position.y=-((P.deadT-ic)/mf)*.9),P.deadT>ic+mf&&(P.state="hilang",P.deadT=0);else{let tt=!1;if(Math.abs(P.kx)+Math.abs(P.kz)>.05){const Y=P.pos.x+P.kx*S,K=P.pos.z+P.kz*S;i.heightAt(Y,K)>-.3&&(P.pos.x=Y,P.pos.z=K);const it=Math.exp(-7*S);P.kx*=it,P.kz*=it}else if(H<TM)b(P,Math.atan2(-N,-j),S),P.target=null;else if(P.target){const Y=P.target.x-P.pos.x,K=P.target.z-P.pos.z,it=Math.hypot(Y,K);it<.3?(P.target=null,P.wait=1.5+Math.random()*3):(b(P,Math.atan2(Y,K),S),P.pos.x+=Y/it*pf*S,P.pos.z+=K/it*pf*S,tt=!0)}else(P.wait-=S)<=0&&(P.target=z(P),P.wait=2);!F&&H<.75&&H>1e-4&&(P.pos.x=k.x+N/H*.75,P.pos.z=k.z+j/H*.75);for(const Y of a){if(Y===P||Y.state!=="hidup")continue;const K=P.pos.x-Y.pos.x,it=P.pos.z-Y.pos.z,G=Math.hypot(K,it);G<.7&&G>1e-4&&(P.pos.x+=K/G*(.7-G)*.5,P.pos.z+=it/G*(.7-G)*.5)}t.resolve(P.pos,df,M.set(0,0,0)),P.pos.y=i.heightAt(P.pos.x,P.pos.z),y(P,tt?"walk":"idle")}if(P.root.rotation.y=P.heading,P.flash>0){P.flash=Math.max(0,P.flash-S);for(const tt of P.materials)tt.emissive.setScalar(P.flash/.15*.8)}if(P.barTime-=S,P.bar.visible=V&&P.state==="hidup"&&P.barTime>0,P.bar.visible){P.bar.position.set(P.pos.x,P.pos.y+2.05,P.pos.z),P.bar.quaternion.copy(R.quaternion);const tt=Math.max(0,P.hp/nc);P.fill.scale.set(tt,.13,1),P.fill.position.x=-(1-tt)/2}P.reticle.visible=V&&P.marked&&P.state==="hidup",P.reticle.visible&&(P.reticle.position.set(P.pos.x,P.pos.y+CM,P.pos.z),P.reticle.quaternion.copy(R.quaternion),P.reticle.rotateZ(q*2.5),P.reticle.scale.setScalar(1+.12*Math.sin(q*14))),V&&P.mixer.update(S)}W(S)}}}const ci=[{id:"perisai",name:"Pasukan perisai",count:5e3,flag:0,map:"#d8463c"},{id:"tombak",name:"Pasukan tombak",count:5e3,flag:3,map:"#4f78d0"},{id:"pedang",name:"Pasukan pedang",count:5e3,flag:4,map:"#3f9f6a"},{id:"pemanah",name:"Pasukan pemanah",count:5e3,flag:1,map:"#e3b43a"},{id:"kavaleri",name:"Pasukan berkuda",count:5e3,flag:2,map:"#e9e6dc"}],ll=Math.PI,Ci=(xi.x0+xi.x1)/2,Je=xi.z0+30,Qt={files:200,ranks:25,sx:1.2,sz:1.35,group:50,lane:4,gap:6},se={files:50,ranks:50,sx:1.35,sz:2.75,group:25,lane:4,gap:10},Pi={inf:[.55,.6],cav:[.55,1.35]},xf=(i,t,e,n)=>(i-1)*t+(Math.ceil(i/e)-1)*n,Ii=(i,t,e,n,s)=>i+t*e+Math.floor(t/n)*s;function DM(i){let t=Math.imul(i^2654435769,2246822507);return t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16,(t>>>0)/4294967296}function zM(){const i=ci.reduce((y,v)=>y+v.count,0),t=[],e=[],n=[],s=new Float32Array(i+8),r=new Float32Array(i+8),a=new Uint8Array(i+8);let o=0;const c=(y,v,_)=>{s[o]=y,r[o]=v,a[o]=_,o++},l=xf(Qt.files,Qt.sx,Qt.group,Qt.lane),u=(Qt.ranks-1)*Qt.sz,h=Ci-l/2;for(let y=0;y<4;y++){const v=Je+y*(u+Qt.gap);for(let _=0;_<Qt.ranks;_++)for(let A=0;A<Qt.files;A++)c(Ii(h,A,Qt.sx,Qt.group,Qt.lane),v+_*Qt.sz,y);for(let _=0;_<Qt.files/Qt.group;_++){const A=Ii(h,_*Qt.group,Qt.sx,Qt.group,Qt.lane),w=Ii(h,(_+1)*Qt.group-1,Qt.sx,Qt.group,Qt.lane);e.push({type:y,x0:A-Pi.inf[0],x1:w+Pi.inf[0],z0:v-Pi.inf[1],z1:v+u+Pi.inf[1]})}}const d=Je+3*(u+Qt.gap)+u,f=xf(se.files,se.sx,se.group,se.lane),g=(se.ranks-1)*se.sz,x=[Ci-l/2-se.gap-f,Ci+l/2+se.gap];for(const y of x){for(let v=0;v<se.ranks;v++)for(let _=0;_<se.files;_++)c(Ii(y,_,se.sx,se.group,se.lane),Je+v*se.sz,4);for(let v=0;v<se.files/se.group;v++){const _=Ii(y,v*se.group,se.sx,se.group,se.lane),A=Ii(y,(v+1)*se.group-1,se.sx,se.group,se.lane);e.push({type:4,x0:_-Pi.cav[0],x1:A+Pi.cav[0],z0:Je-Pi.cav[1],z1:Je+g+Pi.cav[1]})}}const m=x.map(y=>y+f/2);for(const y of[m[0],Ci-96,Ci-32,Ci+32,Ci+96,m[1]])t.push({x:y,z:Je-9});t.push({x:Ci,z:Je-20,chief:!0});for(const y of t)c(y.x,y.z,5);for(let y=1;y<Qt.files/Qt.group;y++){const v=Ii(h,y*Qt.group,Qt.sx,Qt.group,Qt.lane)-(Qt.lane+Qt.sx)/2;n.push([v,Je-3,v,d+3,Qt.lane-.4])}for(let y=1;y<4;y++){const v=Je+y*(u+Qt.gap)-(Qt.gap+Qt.sz)/2;n.push([h-2,v,h+l+2,v,Qt.gap-.6])}for(const y of x){const v=Ii(y,se.group,se.sx,se.group,se.lane)-(se.lane+se.sx)/2;n.push([v,Je-3,v,Je+g+3,se.lane-.4])}for(const y of[h-se.gap/2,h+l+se.gap/2])n.push([y,Je-3,y,Math.max(d,Je+g)+3,se.gap-1]);const p=new Float32Array(o);for(let y=0;y<o;y++)p[y]=DM(y);return{soldiers:{count:o,x:s.subarray(0,o),z:r.subarray(0,o),type:a.subarray(0,o),phase:p},total:i,officers:t,blocks:e,lanes:n,bounds:{x0:x[0]-2,x1:x[1]+f+2,z0:Je-22,z1:Math.max(d,Je+g)+2},heading:ll}}const Pe=ye.y,Jt={selatan:0,timur:Math.PI/2,utara:Math.PI,barat:-Math.PI/2};function NM(i){const t=Vr(8128),e=(M,S)=>M+(S-M)*t(),n=M=>M[Math.floor(t()*M.length)],s=F1(i.heightAt),r={spans:s,build:[],colliders:[],surfaces:[],roads:[],pave:[],lawn:[],fields:[],blocked:[],trees:[],boats:[],spots:[],paths:[],roofs:[],tracks:[],army:null},a=(M,S,R,T,k)=>{const F=Math.cos(k),P=Math.sin(k);return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([N,j])=>[M+N*R/2*F+j*T/2*P,S-N*R/2*P+j*T/2*F])},o=(M,S,R,T,k)=>Math.max(...a(M,S,R,T,k).map(([F,P])=>i.heightAt(F,P)),i.heightAt(M,S)),c=(M,S,R,T,k,F)=>{r.colliders.push({x:M,z:S,hx:R/2,hz:T/2,rot:k,kind:F})},l=(M,S,R,T,k=0)=>r.blocked.push({x:M,z:S,hx:R/2,hz:T/2,rot:k}),u=M=>(r.build.push(M),M);function h(M,S,R,T,k,F,P="tembok",N="bata",j=Pe){const H=Math.hypot(R-M,T-S);if(H<.5)return;const V=Math.atan2(R-M,T-S),tt=(M+R)/2,Y=(S+T)/2;u({type:P,x:tt,y:j,z:Y,rot:V,len:H,t:k,h:F}),c(tt,Y,k,H,V,N),l(tt,Y,k+2,H,V)}function d(M,S,R){const T=[];let k=M;for(const[F,P]of[...R].sort((N,j)=>N[0]-j[0]))F-P>k&&T.push([k,F-P]),k=Math.max(k,F+P);return S>k&&T.push([k,S]),T}const f=2.2,g=5,x=7.5,m={utara:[-580,-490],selatan:[-630,-480],barat:[-10,50],timur:[-20,100]},p=[[ye.x0,ye.z0],[ye.x1,ye.z0],[ye.x1,ye.z1],[ye.x0,ye.z1]];for(const[M,S]of p)u({type:"menara",x:M,y:Pe,z:S,rot:0,size:x,h:7.6}),c(M,S,x,x,0,"bata"),l(M,S,x+2,x+2);const y=M=>P1.filter(S=>M==="utara"&&S.z===ye.z0||M==="selatan"&&S.z===ye.z1||M==="barat"&&S.x===ye.x0||M==="timur"&&S.x===ye.x1),v=M=>M.id==="timur"?5.5:4.5;for(const M of["utara","selatan","barat","timur"]){const S=M==="utara"||M==="selatan",R={utara:ye.z0,selatan:ye.z1,barat:ye.x0,timur:ye.x1}[M],[T,k]=S?[ye.x0,ye.x1]:[ye.z0,ye.z1],F=[[T,x/2],[k,x/2]];for(const P of m[M]){F.push([P,3]);const[N,j]=S?[P,R]:[R,P];u({type:"menara",x:N,y:Pe,z:j,rot:0,size:6,h:6.8}),c(N,j,6,6,0,"bata"),l(N,j,8,8)}for(const P of y(M)){const N=S?P.x:P.z,j=v(P);F.push([N,P.w/2+j]);for(const H of[-1,1]){const V=N+H*(P.w/2+j/2),[tt,Y]=S?[V,R]:[R,V],K=S?0:Math.PI/2;u({type:"bentar",x:tt,y:Pe,z:Y,rot:K,w:j,d:4.2,h:P.id==="timur"?13:10.5,mirror:H>0?S?1:-1:S?-1:1}),c(tt,Y,S?j:4.2,S?4.2:j,0,"bata"),l(tt,Y,j+1,5.2,K)}for(const H of[-1,1]){const V=N+H*(P.w/2-.9);for(const tt of[-3.6,3.6]){const[Y,K]=S?[V,R+tt]:[R+tt,V],it=S?tt>0?Jt.selatan:Jt.utara:tt>0?Jt.timur:Jt.barat;r.spots.push({x:Y,z:K,rot:it,role:"penjaga",anim:"idle"})}}}for(const[P,N]of d(T,k,F))S?h(P,R,N,R,f,g):h(R,P,R,N,f,g)}for(const M of D1)r.roads.push(M);{const M=Gd,S=1.2,R=3.6,T=M.gate,k=5,F=9;h(M.x0,M.z0,M.x1,M.z0,S,R,"tembok-dalam"),h(M.x0,M.z1,M.x1,M.z1,S,R,"tembok-dalam"),h(M.x0,M.z0,M.x0,M.z1,S,R,"tembok-dalam"),h(M.x1,M.z0,M.x1,T.z-F/2,S,R,"tembok-dalam"),h(M.x1,T.z+F/2,M.x1,M.z1,S,R,"tembok-dalam"),u({type:"paduraksa",x:T.x,y:Pe,z:T.z,rot:Math.PI/2,w:F,d:5,opening:k,h:15});for(const K of[-1,1]){const it=T.z+K*(k/2+(F-k)/4);c(T.x,it,5,(F-k)/2,0,"bata"),r.spots.push({x:T.x+3.4,z:T.z+K*2.1,rot:Jt.timur,role:"penjaga",anim:"idle"})}l(T.x,T.z,6,F+1),r.roofs.push({x:T.x,z:T.z,hx:3.5,hz:k/2,r:6});const P={x:-628,z:40,w:30,d:28,h:1};u({type:"pendopo",x:P.x,y:Pe,z:P.z,rot:Math.PI/2,w:P.d,d:P.w,h:P.h}),r.surfaces.push({x:P.x,z:P.z,hx:P.w/2,hz:P.d/2,rot:0,y0:Pe+P.h,y1:Pe+P.h});const N=10,j=3.2;r.surfaces.push({x:P.x+P.w/2+j/2,z:P.z,hx:N/2,hz:j/2,rot:-Math.PI/2,y0:Pe+.02,y1:Pe+P.h});const H=P.x+P.w/2,V=P.x-P.w/2,tt=P.z-P.d/2,Y=P.z+P.d/2;for(const[K,it,G,ct]of[[V,tt,H,tt],[V,Y,H,Y],[V,tt,V,Y],[H,tt,H,P.z-N/2],[H,P.z+N/2,H,Y]]){const at=Math.hypot(G-K,ct-it),mt=Math.atan2(G-K,ct-it);c((K+G)/2,(it+ct)/2,.5,at,mt,"batu")}l(P.x,P.z,P.w+2,P.d+2),r.roofs.push({x:P.x,z:P.z,hx:P.w/2+1.5,hz:P.d/2+1.5,r:10});for(const[K,it]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:P.x+K*3.2,z:P.z+it*3.2,radius:.35,kind:"kayu"});for(let K=-2;K<=2;K++)for(const it of[-1,1])r.colliders.push({x:P.x+K*6.3,z:P.z+it*12.4,radius:.28,kind:"kayu"}),Math.abs(K)<2&&!(it>0&&K===0)&&r.colliders.push({x:P.x+it*13.4,z:P.z+K*6.2,radius:.28,kind:"kayu"});r.spots.push({x:P.x-9.2,z:P.z,rot:Jt.timur,role:"raja",anim:"sit",y:Pe+P.h+.5}),r.spots.push({x:P.x-8,z:P.z-3,rot:Jt.timur,role:"penjaga",anim:"idle",y:Pe+P.h}),r.spots.push({x:P.x-8,z:P.z+3,rot:Jt.timur,role:"penjaga",anim:"idle",y:Pe+P.h});for(const K of[-1,1])r.spots.push({x:H+j+1.2,z:P.z+K*6,rot:Jt.timur,role:"penjaga",anim:"idle"});u({type:"bangsal",x:-669,y:Pe,z:40,rot:Math.PI/2,w:32,d:16,h:1.5}),c(-669,40,16,32,0,"bata"),l(-669,40,18,34);for(const[K,it,G]of[[-676,9,9],[-676,71,7]])u({type:"meru",x:K,y:Pe,z:it,rot:0,base:7,tiers:G}),c(K,it,7,7,0,"bata"),l(K,it,9,9);for(const[K,it]of[[-647,8],[-647,72],[-612,9],[-612,71]]){u({type:"bale",x:K,y:Pe,z:it,rot:0,w:6,d:6}),r.roofs.push({x:K,z:it,hx:3.5,hz:3.5,r:5});for(const[G,ct]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:K+G*2.6,z:it+ct*2.6,radius:.22,kind:"kayu"});l(K,it,7,7)}r.lawn.push({x0:M.x0+1,z0:M.z0+1,x1:M.x1-1,z1:M.z1-1}),r.pave.push({x0:H,z0:T.z-5,x1:M.x1,z1:T.z+5}),r.pave.push({x0:V-2,z0:tt-2,x1:H+2,z1:Y+2}),r.pave.push({x0:-680,z0:20,x1:V,z1:60});for(const[K,it]of[[-660,4],[-660,76],[-626,4],[-626,76],[-640,16],[-640,64],[-686,30],[-686,50]])r.trees.push({type:"kamboja",x:K,z:it,s:e(.9,1.15)});r.pave.push({x0:M.x1,z0:M.z0,x1:jh.x0,z1:M.z1});for(let K=M.z0+6;K<=M.z1-6;K+=12)Math.abs(K-T.z)<8||(u({type:"umbul",x:M.x1+7,y:Pe,z:K,rot:Math.PI/2,h:9,color:Math.round(K)%3}),r.colliders.push({x:M.x1+7,z:K,radius:.18,kind:"kayu"}))}{const M=jh;r.lawn.push({...M});for(const S of[26,54]){const R=(M.x0+M.x1)/2;r.trees.push({type:"beringin",x:R,z:S,s:1}),r.colliders.push({x:R,z:S,radius:1.7,kind:"pohon"});const T=6;for(const[k,F,P,N]of[[R-T,S-T,R+T,S-T],[R-T,S+T,R+T,S+T],[R-T,S-T,R-T,S+T],[R+T,S-T,R+T,S+T]])h(k,F,P,N,.45,1.1,"pagar")}for(let S=0;S<6;S++){const R=S/6*Math.PI*2,T=S<3?26:54;r.spots.push({x:(M.x0+M.x1)/2+Math.cos(R)*8.5,z:T+Math.sin(R)*8.5,rot:R+Math.PI/2,role:"warga",anim:S%2?"sit":"idle"})}}{const M=L1;r.pave.push({...M});const S=[-492,-478,-464,-450,-437],R=[55,66,76],T=["buah","ikan","kain","sayur","gerabah"];R.forEach((k,F)=>S.forEach((P,N)=>{if(F===1&&N===2)return;const j=F===0?Jt.utara:Jt.selatan;u({type:"warung",x:P,y:Pe,z:k,rot:j,color:(F*5+N)%6,goods:T[(F+N*2)%T.length]}),c(P,k,3.6,2.2,0,"kayu"),l(P,k,4.4,3.4);const H=F===0?1.9:-1.9;r.spots.push({x:P+e(-.8,.8),z:k+H,rot:j,role:"penjual",anim:n(["idle","interact","interact"])})})),u({type:"sumur",x:-464,y:Pe,z:66,rot:0}),r.colliders.push({x:-464,z:66,radius:1.1,kind:"batu"});for(const[k,F]of[[-497,50],[-433,50],[-497,80],[-433,80]])r.trees.push({type:"mangga",x:k,z:F,s:.8});for(let k=0;k<8;k++)r.spots.push({x:e(M.x0+4,M.x1-4),z:n([60.5,71]),rot:t()*Math.PI*2,role:"pembeli",anim:"idle"})}{const M=I1;r.pave.push({...M});const S=6;h(M.x0,M.z0,M.x1,M.z0,.8,1.6,"pagar-batu","batu"),h(M.x0,M.z0,M.x0,M.z1,.8,1.6,"pagar-batu","batu"),h(M.x1,M.z0,M.x1,M.z1,.8,1.6,"pagar-batu","batu"),h(M.x0,M.z1,M.x-S/2-3,M.z1,.8,1.6,"pagar-batu","batu"),h(M.x+S/2+3,M.z1,M.x1,M.z1,.8,1.6,"pagar-batu","batu");for(const R of[-1,1]){const T=M.x+R*(S/2+1.5);u({type:"bentar",x:T,y:Pe,z:M.z1,rot:0,w:3,d:2.6,h:6.5,mirror:R,stone:!0}),c(T,M.z1,3,2.6,0,"batu")}u({type:"candi",x:M.x,y:Pe,z:M.z,rot:0,base:17}),c(M.x,M.z,17,17,0,"batu"),l(M.x,M.z,19,19);for(const[R,T]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const k=M.x+R*21,F=M.z+T*23;u({type:"candi",x:k,y:Pe,z:F,rot:0,base:6}),c(k,F,6,6,0,"batu"),l(k,F,7,7)}r.spots.push({x:M.x,z:M.z+12,rot:Jt.utara,role:"pendeta",anim:"sit"}),r.spots.push({x:M.x-3,z:M.z+12.5,rot:Jt.utara,role:"warga",anim:"sit"})}const _=[-694,-647,-600,-553,-504],A={"-694":5,"-647":5,"-600":5,"-553":5,"-504":6,"-426":5},w=[{z:[-54,-29],w:[5,5]},{z:[-29,-5],w:[5,6]},{z:[85,110],w:[6,5],east:!0},{z:[110,134],w:[5,5],east:!0}],C=M=>M<-600?["joglo","joglo","bata","bata","panggung"]:["bata","bata","panggung","panggung","joglo","limasan"];function z(M,S,R,T,k){let F=M+e(.4,1.4);for(;F<S-5;){const P=n(C(F)),N=P==="joglo"?e(8,9.5):P==="panggung"?e(5.6,6.8):e(6.4,8.2);if(F+N>S)break;const j=Math.min(k,P==="joglo"?e(7,8):P==="panggung"?e(5.4,6.2):e(6,7.2)),H=F+N/2,V=R+(T===Jt.utara?j/2:-j/2);b(P,H,V,N,j,T),F+=N+e(1,2.4)}}function b(M,S,R,T,k,F){const P=o(S,R,T,k,F);u({type:`rumah-${M}`,x:S,y:P,z:R,rot:F,w:T,d:k,roof:Math.floor(t()*4),wall:t()}),c(S,R,T+(M==="panggung"?.3:.1),k+.1,F,M==="bata"||M==="limasan"?"bata":"kayu"),l(S,R,T+1.5,k+1.5,F)}for(const M of w){const S=M.east?[..._,-426]:_;for(let R=0;R<S.length-1;R++){const T=S[R]+A[S[R]]/2+.8,k=S[R+1]-A[S[R+1]]/2-.8,F=M.z[0]+M.w[0]/2+.8,P=M.z[1]-M.w[1]/2-.8,N=P-F;N>=13?(z(T,k,F,Jt.utara,(N-1)/2),z(T,k,P,Jt.selatan,(N-1)/2)):z(T,k,F,Jt.utara,N);const j=(F+P)/2;for(let H=T+6;H<k-4;H+=e(9,15))r.trees.push({type:n(["mangga","pisang","pisang","kelapa"]),x:H+e(-1,1),z:j+e(-.6,.6),s:e(.75,1)})}}const E=[{x0:-418,z0:-175,x1:-340,z1:22},{x0:-418,z0:58,x1:-345,z1:225},{x0:-790,z0:-175,x1:-665,z1:-72},{x0:-638,z0:-185,x1:-560,z1:-75}];for(const M of E)r.fields.push(M);const I=Kh("sawah");r.fields.push({x:I.x,z:I.z,r:I.r*.82});const X=(M,S)=>r.fields.some(R=>R.r?Math.hypot(M-R.x,S-R.z)<R.r:zr(M,S,R));function W(M,S,R,T,k){for(const[F,P]of[...a(M,S,R+2,T+2,k),[M,S]]){const N=i.heightAt(F,P);if(N<2.6||N>16||r.roads.some(([j,H,V,tt,Y])=>Wd(F,P,j,H,V,tt)<Y/2+.6)||Gi(F,P,ye)<6)return!1}return i.slopeAt(M,S)>.25?!1:!r.blocked.some(F=>Math.hypot(F.x-M,F.z-S)<Math.hypot(F.hx,F.hz)+Math.hypot(R,T)/2+1)}function q(M,S,R,T,k,F,P,N=!1){const j=Math.hypot(R-M,T-S),H=(R-M)/j,V=(T-S)/j;for(let tt=e(4,10);tt<j-4;tt+=F+e(-2,4))for(const Y of[-1,1]){if(t()<.22)continue;const K=n(P),it=K==="lumbung"?3.6:K==="panggung"?e(5.6,6.8):e(6.2,7.8),G=K==="lumbung"?3.6:K==="panggung"?e(5.4,6.2):e(5.8,7),ct=k/2+1.8+G/2,at=M+H*tt-V*Y*ct,mt=S+V*tt+H*Y*ct,U=Math.atan2(V*Y,-H*Y);!N&&X(at,mt)||W(at,mt,it,G,U)&&b(K,at,mt,it,G,U)}}q(-420,40,-340,40,7,11,["panggung","bata","limasan","panggung"],!0),q(-553,146,-553,262,6,10,["panggung","bata","limasan","lumbung"],!0),q(-647,-64,-647,-170,5,12,["panggung","lumbung","panggung"],!0),q(-704,110,-770,110,5,11,["panggung","bata","panggung"],!0),q(-730,116,-730,196,5,11,["panggung","lumbung","panggung"],!0);{let M=250;for(;i.heightAt(-553,M)>Nr&&M<320;)M+=.25;const S={x0:-590,z0:M-16,x1:-516,z1:M-1};r.pave.push(S),r.roads.push([-553,262,-553,M-8,8]);for(const T of[-580,-526]){const k=o(T,S.z0-5,14,8,0);u({type:"gudang",x:T,y:k,z:S.z0-5,rot:Jt.selatan,w:14,d:8}),c(T,S.z0-5,14,8,0,"kayu"),l(T,S.z0-5,15,9)}const R=1.75;for(const T of[-578,-553,-528]){const F=M-2+18;u({type:"dermaga",x:T,y:R,z:F,rot:0,w:4,len:36}),r.surfaces.push({x:T,z:F,hx:2,hz:36/2,rot:0,y0:R,y1:R}),l(T,F,5,36),r.paths.push([T,S.z0+6,T,M-2+36-2]),r.boats.push({type:"jukung",x:T-4.2,z:F+e(-6,8),rot:t()*.2-.1}),r.boats.push({type:"jukung",x:T+4.2,z:F+e(-8,6),rot:Math.PI+t()*.2-.1}),r.spots.push({x:T+e(-1,1),z:M+36-6,rot:Jt.selatan,role:"nelayan",anim:"interact"})}r.boats.push({type:"jong",x:-542,z:M+30,rot:.08}),r.paths.push([-578,S.z0+6,-528,S.z0+6]);for(let T=0;T<10;T++){const k=e(S.x0+3,S.x1-3),F=e(S.z0+1.5,S.z0+4);Math.abs(k+578)<3||Math.abs(k+553)<3||Math.abs(k+528)<3||(u({type:t()<.5?"peti":"gentong",x:k,y:i.heightAt(k,F),z:F,rot:t()*Math.PI}),r.colliders.push({x:k,z:F,radius:.55,kind:"kayu"}))}for(let T=0;T<5;T++)r.spots.push({x:e(S.x0+4,S.x1-4),z:S.z0+2.2,rot:Jt.selatan,role:"kuli",anim:n(["interact","idle"])});r.harbor={shore:M,quay:S}}for(const M of s){const S=Math.min(M.a,M.b)-4,R=Math.max(M.a,M.b)+4,T=(S+R)/2,k=(R-S)/2,F=Nr+.15,P=M.axis==="x"?Math.PI/2:0,[N,j]=M.axis==="x"?[T,M.at]:[M.at,T],H=(Math.min(M.a,M.b)-S)/(2*k),V=(Math.max(M.a,M.b)-S)/(2*k),tt={x:N,z:j,hx:M.width/2,hz:k,rot:P,y0:F,y1:F,arch:M.rise,a0:H,a1:V};r.surfaces.push(tt),u({type:M.stone?"jembatan-batu":"jembatan-kayu",x:N,y:0,z:j,rot:P,len:2*k,w:M.width,surface:tt,a:M.a,b:M.b,axis:M.axis,at:M.at});for(const Y of[-1,1]){const K=Y*(M.width/2-.2),[it,G]=M.axis==="x"?[T,M.at+K]:[M.at+K,T];r.colliders.push({x:it,z:G,hx:.2,hz:k-1,rot:P,kind:M.stone?"bata":"kayu"})}if(l(N,j,M.width+3,2*k+6,P),r.roads.push(M.axis==="x"?[S-6,M.at,R+6,M.at,M.width-1]:[M.at,S-6,M.at,R+6,M.width-1]),r.paths.push(M.axis==="x"?[S-2,M.at,R+2,M.at]:[M.at,S-2,M.at,R+2]),M.stone)for(const Y of[S-7,R+7]){for(const G of[-1,1]){const ct=G*(M.width/2+1.7),[at,mt]=M.axis==="x"?[Y,M.at+ct]:[M.at+ct,Y];u({type:"bentar",x:at,y:i.heightAt(at,mt),z:mt,rot:P,w:3.4,d:3.4,h:9,mirror:-G}),c(at,mt,3.4,3.4,0,"bata"),r.spots.push({x:Y+(Y<T?-2.8:2.8),z:M.at+G*(M.width/2-.4),rot:Y<T?Jt.barat:Jt.timur,role:"penjaga",anim:"idle"})}const[K,it]=M.axis==="x"?[Y+(Y<T?-6:6),M.at]:[M.at,Y];r.pave.push({x0:K-9,z0:it-9,x1:K+9,z1:it+9});for(const G of[-1,1]){const[ct,at]=[K+(Y<T?-1:1)*3,it+G*8];u({type:"umbul",x:ct,y:i.heightAt(ct,at),z:at,rot:0,h:9,color:G>0?0:2}),r.colliders.push({x:ct,z:at,radius:.18,kind:"kayu"})}}}{const M=s.find(k=>k.id==="sawah"),S=M.b-16,R=M.at;r.pave.push({x0:R-9,z0:S-9,x1:R+9,z1:S+9}),r.roads.push([R,M.b,R,S,3]);const T=[[-15,-2,Jt.timur,"panggung"],[15,-2,Jt.barat,"panggung"],[-14,-16,Jt.timur,"lumbung"],[14,-16,Jt.barat,"lumbung"],[-4,-22,Jt.selatan,"panggung"],[6,-22,Jt.selatan,"lumbung"],[-15,12,Jt.timur,"lumbung"],[15,12,Jt.barat,"panggung"]];for(const[k,F,P,N]of T){const j=N==="lumbung"?3.6:6.2,H=N==="lumbung"?3.6:5.8;b(N,R+k,S+F,j,H,P)}r.trees.push({type:"mangga",x:R-4,z:S+4,s:1.1});for(let k=0;k<10;k++){const F=t()*Math.PI*2,P=e(30,70),N=I.x+Math.cos(F)*P,j=I.z+Math.sin(F)*P;i.heightAt(N,j)<2.6||r.spots.push({x:N,z:j,rot:t()*Math.PI*2,role:"petani",anim:n(["pickup","pickup","idle"])})}for(const[k,F]of[[-45,-30],[40,-45],[-30,40]]){const P=I.x+k,N=I.z+F;u({type:"dangau",x:P,y:i.heightAt(P,N),z:N,rot:t()*Math.PI,w:3,d:3}),r.colliders.push({x:P,z:N,hx:1.5,hz:1.5,rot:0,kind:"kayu"}),l(P,N,4,4)}r.roads.push([R,S,R,I.z-70,2.2],[R-50,I.z,R+50,I.z,2.2])}{const M=Kh("nelayan"),S=s.find(P=>P.id==="nelayan"),R=M.x,T=M.z-4;r.pave.push({x0:R-8,z0:T-8,x1:R+8,z1:T+8}),r.roads.push([S.at,S.b,S.at,T,3],[S.at,T,R,T,3]);for(let P=0;P<11;P++){const N=P/11*Math.PI*2+.3,j=22+P%2*9,H=R+Math.cos(N)*j,V=T+Math.sin(N)*j,tt=Math.atan2(R-H,T-V);W(H,V,6.2,5.8,tt)&&b("panggung",H,V,6.2,5.8,tt)}for(let P=0;P<6;P++){const N=Math.PI*(.15+P*.13),j=R+Math.cos(N)*45,H=T+Math.sin(N)*45;i.heightAt(j,H)<1.2||(u({type:"jemuran",x:j,y:i.heightAt(j,H),z:H,rot:N}),r.colliders.push({x:j,z:H,hx:1.8,hz:.4,rot:N,kind:"kayu"}))}let k=M.z;for(;i.heightAt(M.x,k)>Nr&&k<M.z+140;)k+=.25;const F=26;u({type:"dermaga",x:M.x,y:1.75,z:k-2+F/2,rot:0,w:3.2,len:F}),r.surfaces.push({x:M.x,z:k-2+F/2,hx:1.6,hz:F/2,rot:0,y0:1.75,y1:1.75}),r.roads.push([M.x,T,M.x,k-1,3]),r.paths.push([M.x,k-1,M.x,k+F-4]);for(let P=0;P<4;P++)r.boats.push({type:"jukung",x:M.x+(P%2?3.4:-3.4),z:k+6+P*5,rot:(P%2?Math.PI:0)+t()*.2});for(let P=0;P<5;P++){const N=Math.PI*(.9+P*.22);let j=40;for(;j<120&&i.heightAt(M.x+Math.cos(N)*j,M.z+Math.sin(N)*j)>.6;)j+=.5;r.boats.push({type:"jukung-darat",x:M.x+Math.cos(N)*(j-3),z:M.z+Math.sin(N)*(j-3),rot:N+Math.PI/2})}for(let P=0;P<6;P++)r.spots.push({x:R+e(-14,14),z:T+e(-14,14),rot:t()*Math.PI*2,role:"nelayan",anim:n(["interact","idle","sit"])})}{const M=s.find(F=>F.id==="pura"),S=Tr,R={x0:S.x-15,z0:S.z-13,x1:S.x+15,z1:S.z+13},T=i.heightAt(S.x,S.z);r.pave.push(R),r.roads.push([M.b,S.z,R.x1,S.z,4]),r.paths.push([R.x1,S.z,S.x,S.z]);const k=4;h(R.x0,R.z0,R.x1,R.z0,.8,1.8,"pagar","bata",T),h(R.x0,R.z1,R.x1,R.z1,.8,1.8,"pagar","bata",T),h(R.x0,R.z0,R.x0,R.z1,.8,1.8,"pagar","bata",T),h(R.x1,R.z0,R.x1,S.z-k/2-2.6,.8,1.8,"pagar","bata",T),h(R.x1,S.z+k/2+2.6,R.x1,R.z1,.8,1.8,"pagar","bata",T);for(const F of[-1,1]){const P=S.z+F*(k/2+1.3);u({type:"bentar",x:R.x1,y:T,z:P,rot:Math.PI/2,w:2.6,d:2.4,h:7,mirror:-F}),c(R.x1,P,2.4,2.6,0,"bata")}for(const[F,P,N,j]of[[-8,-6,11,6],[-8,6,7,5],[2,7,3,4]])u({type:"meru",x:S.x+F,y:T,z:S.z+P,rot:0,base:j,tiers:N}),c(S.x+F,S.z+P,j,j,0,"bata");u({type:"bale",x:S.x+3,y:T,z:S.z-6,rot:0,w:5,d:5}),r.roofs.push({x:S.x+3,z:S.z-6,hx:3,hz:3,r:4.5});for(const[F,P]of[[-1,-1],[1,-1],[1,1],[-1,1]])r.colliders.push({x:S.x+3+F*2.1,z:S.z-6+P*2.1,radius:.2,kind:"kayu"});for(const[F,P]of[[10,-9],[10,9],[-13,0]])r.trees.push({type:"kamboja",x:S.x+F,z:S.z+P,s:1});for(let F=M.b-6;F>R.x1+4;F-=7)for(const P of[-1,1]){const N=S.z+P*3.2;u({type:"umbul",x:F,y:i.heightAt(F,N),z:N,rot:0,h:7,color:1}),r.colliders.push({x:F,z:N,radius:.15,kind:"kayu"})}r.spots.push({x:S.x+1,z:S.z+1,rot:Jt.barat,role:"pendeta",anim:"sit",y:T}),r.spots.push({x:S.x-1,z:S.z-2,rot:Jt.barat,role:"warga",anim:"sit",y:T})}for(const[M,S,R,T,k]of[[-420,40,-340,40,7],[-553,146,-553,262,6]]){const F=Math.hypot(R-M,T-S);for(let P=6;P<F;P+=13)for(const N of[-1,1]){const j=P/F,H=M+(R-M)*j+(S===T?0:N*(k/2+1.2)),V=S+(T-S)*j+(S===T?N*(k/2+1.2):0);r.blocked.some(tt=>Math.hypot(tt.x-H,tt.z-V)<Math.hypot(tt.hx,tt.hz)+1.5)||r.trees.push({type:"kelapa",x:H,z:V,s:e(.85,1.1)})}}{const M=Vr(5150),S=(U,xt)=>U+(xt-U)*M(),R=xi,T=(R.x0+R.x1)/2,k=zM();r.army=k;const F=s.find(U=>U.id==="wira"),P=r.harbor.quay,N=R.z0-10,j=R.x0-7,H=R.x1+7;r.roads.push([P.x1,(P.z0+P.z1)/2+1,F.at-3,Math.min(F.a,F.b)-7,5]),r.roads.push([F.at,Math.max(F.a,F.b)+6,F.at,N,5]),r.roads.push([j+12,N,H-12,N,7],[j,N+12,j+12,N,5],[H-12,N,H,N+12,5]),r.roads.push([j,N+12,j,R.z1-8,5],[H,N+12,H,R.z1-8,5]),r.lawn.push({...R});for(const U of k.lanes)r.tracks.push(U);for(const U of k.blocks)r.colliders.push({x:(U.x0+U.x1)/2,z:(U.z0+U.z1)/2,hx:(U.x1-U.x0)/2,hz:(U.z1-U.z0)/2,rot:0,kind:"prajurit"});for(const U of k.officers)r.colliders.push({x:U.x,z:U.z,hx:.55,hz:1.35,rot:0,kind:"prajurit"});const V={x:T,z:N-19,w:24,d:13,h:1.6},tt=o(V.x,V.z,V.w,V.d,0);u({type:"siti-hinggil",x:V.x,y:tt,z:V.z,rot:Jt.selatan,w:V.w,d:V.d,h:V.h}),r.surfaces.push({x:V.x,z:V.z,hx:V.w/2,hz:V.d/2,rot:0,y0:tt+V.h,y1:tt+V.h});const Y=7,K=3.6;r.surfaces.push({x:V.x,z:V.z+V.d/2+K/2,hx:Y/2,hz:K/2,rot:Math.PI,y0:tt+.02,y1:tt+V.h});{const U=V.x-V.w/2,xt=V.x+V.w/2,ft=V.z-V.d/2,yt=V.z+V.d/2;for(const[vt,Bt,Et,D]of[[U,ft,xt,ft],[U,ft,U,yt],[xt,ft,xt,yt],[U,yt,V.x-Y/2,yt],[V.x+Y/2,yt,xt,yt]])c((vt+Et)/2,(Bt+D)/2,.5,Math.hypot(Et-vt,D-Bt),Math.atan2(Et-vt,D-Bt),"batu");for(const[vt,Bt]of Vd)r.colliders.push({x:V.x+vt,z:V.z+Bt,radius:.3,kind:"kayu"})}l(V.x,V.z,V.w+2,V.d+2+K*2),r.roofs.push({x:V.x,z:V.z,hx:V.w/2,hz:V.d/2,r:7}),r.pave.push({x0:V.x-V.w/2-3,z0:V.z-V.d/2-3,x1:V.x+V.w/2+3,z1:N-3});for(const U of[-1,1])r.spots.push({x:V.x+U*2.4,z:V.z+V.d/2-1.4,rot:Jt.selatan,role:"penjaga",anim:"idle",y:tt+V.h}),r.spots.push({x:V.x+U*(Y/2+1.2),z:V.z+V.d/2+K+.8,rot:Jt.selatan,role:"penjaga",anim:"idle"});for(const U of[-1,1])r.spots.push({x:F.at+U*4,z:Math.max(F.a,F.b)+6,rot:Jt.utara,role:"penjaga",anim:"idle"});const it=(U,xt,ft,yt)=>{u({type:"umbul",x:U,y:i.heightAt(U,xt),z:xt,rot:0,h:ft,color:yt}),r.colliders.push({x:U,z:xt,radius:.18,kind:"kayu"})};for(let U=j+16,xt=0;U<H-14;U+=22,xt++)Math.abs(U-T)>16&&it(U,N+5,9,ci[xt%ci.length].flag);for(const U of k.blocks){if(U.type===4)continue;const xt=k.blocks.find(yt=>yt.type===U.type),ft=k.blocks.filter(yt=>yt.type===U.type).pop();U===xt&&it(U.x0-3.5,U.z0+1,11,ci[U.type].flag),U===ft&&it(U.x1+3.5,U.z0+1,11,ci[U.type].flag)}const G=k.blocks.filter(U=>U.type===4);it(G[0].x0-3.5,G[0].z0+1,11,ci[4].flag),it(G[G.length-1].x1+3.5,G[0].z0+1,11,ci[4].flag);const ct=(U,xt,ft,yt,vt)=>a(U,xt,ft+1,yt+1,vt).every(([Bt,Et])=>i.heightAt(Bt,Et)>3)&&i.slopeAt(U,xt)<.25,at=to.find(U=>U.id==="tenda");for(let U=at.x1-6;U>at.x0+2;U-=11)for(let xt=at.z0+18;xt<at.z1-3;xt+=7.5){const vt=Jt.timur;ct(U,xt,3.4,4.4,vt)&&(u({type:"tenda",x:U,y:o(U,xt,3.4,4.4,vt),z:xt,rot:vt,w:3.4,d:4.4,color:Math.floor(S(0,3))}),c(U,xt,3.4,4.4,vt,"kayu"),l(U,xt,3.4+1,4.4+1,vt))}for(const U of[at.x1-10,at.x1-30]){const xt=at.z0+6;ct(U,xt,12,7,0)&&(u({type:"gudang",x:U,y:o(U,xt,12,7,0),z:xt,rot:Jt.selatan,w:12,d:7}),c(U,xt,12,7,0,"kayu"),l(U,xt,13,8))}const mt=to.find(U=>U.id==="kandang");for(const U of[mt.x0+9,mt.x0+33])for(let xt=mt.z0+22;xt<mt.z1-12;xt+=38){const vt=Jt.barat;ct(U,xt,30,7,vt)&&(u({type:"kandang",x:U,y:o(U,xt,30,7,vt),z:xt,rot:vt,w:30,d:7}),c(U,xt,30,7,vt,"kayu"),l(U,xt,31,8,vt))}for(let U=0;U<6;U++){const xt=S(mt.x0+4,mt.x1-4),ft=mt.z0+6+S(-2,2);i.heightAt(xt,ft)<3||(u({type:"jerami",x:xt,y:i.heightAt(xt,ft),z:ft,rot:S(0,Math.PI)}),r.colliders.push({x:xt,z:ft,radius:.9,kind:"kayu"}))}for(let U=j+20;U<H-20;U+=26)Math.abs(U-T)<22||Math.abs(U-F.at)<8||r.trees.push({type:"kelapa",x:U+S(-2,2),z:N-6.5,s:S(.85,1.1)})}for(const M of r.trees){const S={beringin:0,kamboja:.3,mangga:.5,kelapa:.4,pisang:0}[M.type];S&&r.colliders.push({x:M.x,z:M.z,radius:S*M.s,kind:"pohon"})}return r}const De={x0:-980,z0:-470,x1:-30,z1:640},UM=-150;function kM(i,t){const e=De.x1-De.x0,n=De.z1-De.z0,s=new Uint8Array(e*n*4),r=new Uint8Array(e*n),a=f=>De.x0+f+.5,o=f=>De.z0+f+.5;function c(f,g,x,m,p,y){const v=Math.max(0,Math.floor(g-De.x0)),_=Math.min(e-1,Math.ceil(m-De.x0)),A=Math.max(0,Math.floor(x-De.z0)),w=Math.min(n-1,Math.ceil(p-De.z0));for(let C=A;C<=w;C++)for(let z=v;z<=_;z++){const b=y(a(z),o(C));if(b<=0)continue;const E=(C*e+z)*4+f;s[E]=Math.max(s[E],Math.round(Math.min(1,b)*255))}}const l=f=>Math.min(1,Math.max(0,.5-f)),u=(f,g)=>{const x=t.heightAt(f,g);return x>2.5&&x<14&&t.slopeAt(f,g)<.22};for(const f of i.fields)f.r?c(1,f.x-f.r,f.z-f.r,f.x+f.r,f.z+f.r,(g,x)=>u(g,x)?l(Math.hypot(g-f.x,x-f.z)-f.r):0):c(1,f.x0,f.z0,f.x1,f.z1,(g,x)=>u(g,x)?l(Gi(g,x,f)):0);for(const f of i.lawn)c(3,f.x0-1,f.z0-1,f.x1+1,f.z1+1,(g,x)=>l(Gi(g,x,f)));for(const[f,g,x,m,p]of[...i.roads,...i.tracks])c(0,Math.min(f,x)-p,Math.min(g,m)-p,Math.max(f,x)+p,Math.max(g,m)+p,(y,v)=>l(Wd(y,v,f,g,x,m)-p/2));for(const f of i.pave)c(2,f.x0-1,f.z0-1,f.x1+1,f.z1+1,(g,x)=>l(Gi(g,x,f)));for(let f=0;f<e*n;f++){const g=Math.max(s[f*4],s[f*4+2])/255;s[f*4+1]=Math.round(s[f*4+1]*(1-g)),s[f*4+3]=Math.round(s[f*4+3]*(1-g)),(s[f*4]>60||s[f*4+1]>60||s[f*4+2]>60)&&(r[f]=1)}for(const f of i.blocked){const g=Math.hypot(f.hx,f.hz)+1,x=Math.cos(f.rot||0),m=Math.sin(f.rot||0);for(let p=Math.max(0,Math.floor(f.z-g-De.z0));p<=Math.min(n-1,Math.ceil(f.z+g-De.z0));p++)for(let y=Math.max(0,Math.floor(f.x-g-De.x0));y<=Math.min(e-1,Math.ceil(f.x+g-De.x0));y++){const v=a(y)-f.x,_=o(p)-f.z;Math.abs(v*x-_*m)<=f.hx+1&&Math.abs(v*m+_*x)<=f.hz+1&&(r[p*e+y]=1)}}const h=new hs(s,e,n,Xe,Mn);h.magFilter=Fe,h.minFilter=pn,h.generateMipmaps=!0,h.wrapS=h.wrapT=Wn,h.needsUpdate=!0;const d=(f,g)=>{if(f>=UM&&g<300)return!1;const x=Math.floor(f-De.x0),m=Math.floor(g-De.z0);return x>=0&&m>=0&&x<e&&m<n&&r[m*e+x]===1};return{texture:h,data:s,x0:De.x0,z0:De.z0,width:e,depth:n,reserved:(f,g,x=0)=>d(f,g)||d(f+x,g)||d(f-x,g)||d(f,g+x)||d(f,g-x),at(f,g){const x=Math.floor(f-De.x0),m=Math.floor(g-De.z0);if(x<0||m<0||x>=e||m>=n)return null;const p=(m*e+x)*4;return{jalan:s[p]/255,sawah:s[p+1]/255,batu:s[p+2]/255,rumput:s[p+3]/255}}}}const $={POLOS:0,BATA:1,GENTENG:2,JERAMI:3,KAYU:4,BATU:5,SIRAP:6,UBIN:7,ANYAMAN:8,PLESTER:9},Q={bata:"#a5523a",batuPutih:"#d3c8b2",andesit:"#8f8b84",andesitTua:"#6e6b66",kayu:"#8a5a35",kayuTua:"#5e3d24",kayuMuda:"#b08454",plester:"#ebe3d1",genteng:"#b65a32",gentengTua:"#5a4a40",ijuk:"#3d3732",alang:"#bb9c5c",bambu:"#c9ad74",emas:"#d9a82e",gelap:"#2b2420",merah:"#c8312a",putih:"#f0eee5",kuning:"#e2b32b",biru:"#2f5fa8",hijau:"#3a8a4c"},La=new zt,sc=new Ut,_f=new qt,vf=new _e,yf=new rn,ri=new B,Li=new B,Da=new B;class re{constructor(){this.pos=[],this.nor=[],this.col=[],this.kind=[],this.sway=[]}add(t,e,n,s={}){const r=t.index?t.toNonIndexed():t;return this.addRaw(r.attributes.position.array,r.attributes.normal.array,e,n,s)}addRaw(t,e,n,s,{x:r=0,y:a=0,z:o=0,rx:c=0,ry:l=0,rz:u=0,sx:h=1,sy:d=1,sz:f=1,shade:g=[.84,1.04],sway:x=0}={}){let m=1/0,p=-1/0;for(let w=1;w<t.length;w+=3)t[w]<m&&(m=t[w]),t[w]>p&&(p=t[w]);const y=Math.max(.001,p-m);La.set(n);const v=c===0&&u===0&&h===1&&d===1&&f===1,_=Math.cos(l),A=Math.sin(l);v||(yf.set(c,l,u),vf.setFromEuler(yf),sc.compose(ri.set(r,a,o),vf,Li.set(h,d,f)),_f.getNormalMatrix(sc));for(let w=0;w<t.length;w+=3){const C=(t[w+1]-m)/y,z=g[0]+(g[1]-g[0])*C;v?(this.pos.push(r+t[w]*_+t[w+2]*A,a+t[w+1],o-t[w]*A+t[w+2]*_),this.nor.push(e[w]*_+e[w+2]*A,e[w+1],-e[w]*A+e[w+2]*_)):(ri.set(t[w],t[w+1],t[w+2]).applyMatrix4(sc),this.pos.push(ri.x,ri.y,ri.z),ri.set(e[w],e[w+1],e[w+2]).applyMatrix3(_f).normalize(),this.nor.push(ri.x,ri.y,ri.z)),this.col.push(La.r*z,La.g*z,La.b*z),this.kind.push(s),this.sway.push(x*C)}return this}box(t,e,n,s,r,a={}){const o=t/2,c=n/2,l=[],u=[],h=(d,f,g,x,m)=>{for(const p of[d,f,g,d,g,x])l.push(p[0],p[1],p[2]),u.push(m[0],m[1],m[2])};return h([o,0,c],[o,0,-c],[o,e,-c],[o,e,c],[1,0,0]),h([-o,0,-c],[-o,0,c],[-o,e,c],[-o,e,-c],[-1,0,0]),h([-o,0,c],[o,0,c],[o,e,c],[-o,e,c],[0,0,1]),h([o,0,-c],[-o,0,-c],[-o,e,-c],[o,e,-c],[0,0,-1]),h([-o,e,c],[o,e,c],[o,e,-c],[-o,e,-c],[0,1,0]),h([-o,0,-c],[o,0,-c],[o,0,c],[-o,0,c],[0,-1,0]),this.addRaw(l,u,s,r,a)}cyl(t,e,n,s,r,a,o={}){return this.add(new Ve(t,e,n,s).translate(0,n/2,0),r,a,o)}faces(t,e,n,s={}){const r=[],a=[];for(const[o,c,l]of t){Li.set(c[0]-o[0],c[1]-o[1],c[2]-o[2]),Da.set(l[0]-o[0],l[1]-o[1],l[2]-o[2]),Li.cross(Da).normalize();for(const u of[o,c,l])r.push(u[0],u[1],u[2]),a.push(Li.x,Li.y,Li.z)}return this.addRaw(r,a,e,n,{shade:[.96,1.04],...s})}skirt(t,e,n,s,r,a,o,c,l={}){const u=[[-t/2,n,-e/2],[t/2,n,-e/2],[t/2,n,e/2],[-t/2,n,e/2]],h=[[-s/2,a,-r/2],[s/2,a,-r/2],[s/2,a,r/2],[-s/2,a,r/2]],d=[];for(let f=0;f<4;f++){const g=(f+1)%4;d.push([u[g],u[f],h[f]],[u[g],h[f],h[g]])}return this.faces(d.filter(([f,g,x])=>(Li.set(g[0]-f[0],g[1]-f[1],g[2]-f[2]),Da.set(x[0]-f[0],x[1]-f[1],x[2]-f[2]),Li.cross(Da).lengthSq()>1e-8)),o,c,l)}hip(t,e,n,s,r,a,o={}){const c=Math.max(0,Math.abs(t-e)*.9);return t>=e?this.skirt(t,e,n,c,0,n+s,r,a,o):this.skirt(t,e,n,0,c,n+s,r,a,o)}gable(t,e,n,s,r,a,o=r,c=a,l={}){const u=[-t/2,n,-e/2],h=[t/2,n,-e/2],d=[t/2,n,e/2],f=[-t/2,n,e/2],g=[-t/2,n+s,0],x=[t/2,n+s,0];return this.faces([[h,u,g],[h,g,x],[f,d,x],[f,x,g]],r,a,l),this.faces([[u,f,g],[d,h,x]],o,c,l)}build(){const t=new le;return t.setAttribute("position",new Vt(this.pos,3)),t.setAttribute("normal",new Vt(this.nor,3)),t.setAttribute("color",new Vt(this.col,3)),t.setAttribute("aKind",new Vt(this.kind,1)),t.setAttribute("aSway",new Vt(this.sway,1)),t.computeBoundingSphere(),t}}function tu(i,t,e,n,s,{windows:r=!0,door:a=1}={}){if(i.box(a,Math.min(2.1,s*.75),.1,Q.kayuTua,$.KAYU,{y:n,z:e/2+.01}),!!r)for(const o of[-1,1])t>5&&i.box(.8,.8,.1,Q.gelap,$.POLOS,{x:o*t*.3,y:n+s*.42,z:e/2+.01}),i.box(.1,.8,.8,Q.gelap,$.POLOS,{x:o*(t/2+.01),y:n+s*.42})}const fo=(i,t,e,n=.45)=>i.box(t+.3,n+1.6,e+.3,Q.andesit,$.BATU,{y:-1.6,shade:[.7,1]});function OM(i,t,e){const n=new re;return fo(n,i,t),n.box(i,.9,t,Q.bata,$.BATA,{y:.45}),n.box(i,1.9,t,Q.plester,$.PLESTER,{y:1.35}),n.box(i+.12,.14,t+.12,Q.batuPutih,$.POLOS,{y:3.2}),tu(n,i,t,.45,2.8),n.hip(i+1.3,t+1.3,3.3,Math.min(i,t)*.42,e,$.GENTENG),n.box(.25,.25,.25,Q.gentengTua,$.POLOS,{x:Math.max(0,i-t)*.45,y:3.3+Math.min(i,t)*.42-.05}),n}function FM(i,t,e){const n=new re;fo(n,i,t),n.box(i,3,t,Q.kayuMuda,$.KAYU,{y:.45}),tu(n,i,t,.45,2.9),n.hip(i+1.2,t+1,3.4,Math.min(i,t)*.5,e,$.SIRAP),n.box(i*.9,.12,1.6,e,$.SIRAP,{y:2.8,z:t/2+.8,rx:.25});for(const s of[-1,1])n.cyl(.1,.1,2.75,6,Q.kayuTua,$.KAYU,{x:s*i*.4,y:.45,z:t/2+1.4});return n}function BM(i,t,e){const n=new re;fo(n,i,t,.6),n.box(i*.86,3.1,t*.86,Q.kayu,$.KAYU,{y:.6}),tu(n,i*.86,t*.86,.6,3.1);for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1],[0,1]])n.cyl(.12,.12,3.3,6,Q.kayuTua,$.KAYU,{x:s*i*.47,y:.6,z:r*t*.47});return n.skirt(i+1.6,t+1.6,3.6,i*.56,t*.56,4.9,e,$.GENTENG),n.hip(i*.6,t*.6,4.8,3,e,$.GENTENG),n.box(.3,.45,.3,Q.emas,$.POLOS,{y:7.7}),n}function HM(i,t,e){const n=new re;for(let s=0;s<3;s++)for(const r of[-1,1])n.cyl(.13,.15,2.9,6,Q.kayuTua,$.KAYU,{x:(s-1)*(i*.42),y:-1.5,z:r*t*.42});n.box(i,.25,t,Q.kayu,$.KAYU,{y:1.3}),n.box(i-.3,2.1,t-.3,Q.bambu,$.ANYAMAN,{y:1.55}),n.box(.95,1.8,.1,Q.kayuTua,$.KAYU,{y:1.55,z:(t-.3)/2+.01});for(const s of[-1,1])n.box(.7,.6,.1,Q.gelap,$.POLOS,{x:s*i*.3,y:2.3,z:(t-.3)/2+.01});return n.box(.9,.12,2,Q.kayuTua,$.KAYU,{y:.55,z:t/2+.75,rx:.62}),n.gable(i+1.4,t+1.7,3.55,2.7,e,$.JERAMI,Q.bambu,$.ANYAMAN),n.box(i+1.6,.18,.3,Q.ijuk,$.POLOS,{y:6.2}),n}function GM(i){const t=new re;for(const[e,n]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.cyl(.12,.14,3.3,6,Q.kayuTua,$.KAYU,{x:e*1.1,y:-1.5,z:n*1.1}),t.cyl(.42,.42,.1,8,Q.kayu,$.KAYU,{x:e*1.1,y:1.55,z:n*1.1});return t.box(2.8,.2,2.8,Q.kayu,$.KAYU,{y:1.65}),t.box(2.2,1,2.2,Q.bambu,$.ANYAMAN,{y:1.85}),t.skirt(4.2,4.2,2,3.4,3.4,2.7,i,$.JERAMI),t.skirt(3.4,3.4,2.7,2.1,2.1,4.4,i,$.JERAMI),t.skirt(2.1,2.1,4.4,0,0,6,i,$.JERAMI),t}function VM(i,t,e){const n=new re;return fo(n,i,t,.3),n.box(i,3.6,t,Q.kayu,$.KAYU,{y:.3}),n.box(2.6,2.6,.12,Q.kayuTua,$.KAYU,{y:.3,z:t/2+.01}),n.gable(i+1,t+1.4,3.9,2.4,e,$.GENTENG,Q.kayu,$.KAYU),n}const WM={buah:["#e0a020","#d84a2a","#7fb03a","#f2d24b"],ikan:["#9fb4c2","#c7d3dc","#7d8f9c"],kain:["#c8312a","#2f62a8","#e2b32b","#3f8f4f","#8a3f9a"],sayur:["#4f9a2f","#7cbf3c","#d84a2a","#e8e0c0"],gerabah:["#a8603a","#8f4f30","#c27a4a"]},Mf=["#c8312a","#e07a20","#e2b32b","#3f8f4f","#2f62a8","#8a3f9a"];function XM(i,t){const e=new re;for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.07,.07,2.4,5,Q.kayuTua,$.KAYU,{x:s*1.8,z:r*1.3});e.box(3.4,.85,1.1,Q.kayu,$.KAYU,{z:.45}),e.gable(4.2,3.2,2.35,.7,Mf[i],$.POLOS,Mf[i],$.POLOS,{sway:.06});const n=WM[t];for(let s=0;s<7;s++){const r=-1.4+s*.47;t==="kain"?e.box(.36,.22,.8,n[s%n.length],$.POLOS,{x:r,y:.85,z:.45}):t==="gerabah"?e.cyl(.12,.17,.32,7,n[s%n.length],$.POLOS,{x:r,y:.85,z:.45}):e.add(new Xi(.2,0).translate(0,.2,0),n[s%n.length],$.POLOS,{x:r,y:.82,z:.45,sy:t==="ikan"?.5:1,sx:t==="ikan"?1.6:1})}for(const s of[-1,1])e.cyl(.32,.25,.4,8,Q.bambu,$.ANYAMAN,{x:s*1.3,z:1.45});return e}function jM(){const i=new re;i.cyl(1,1.05,.9,10,Q.andesit,$.BATU),i.cyl(.8,.8,.02,10,"#26343a",$.POLOS,{y:.85});for(const t of[-1,1])i.box(.15,2.1,.15,Q.kayuTua,$.KAYU,{x:t*.9});return i.gable(2.4,1.6,2.1,.6,Q.genteng,$.GENTENG),i}function YM(i,t,e){const n=new re;n.box(t+.5,1.6,i,Q.andesit,$.BATU,{y:-1.2}),n.box(t,e,i,Q.bata,$.BATA,{y:.4}),n.box(t+.35,.3,i,Q.batuPutih,$.POLOS,{y:e+.4}),n.box(t+.2,.25,i,Q.bata,$.BATA,{y:e+.7});const s=Math.max(1,Math.round(i/3));for(let r=0;r<s;r++){const a=-i/2+(r+.5)*(i/s);n.box(t*.55,.7,.9,Q.bata,$.BATA,{y:e+.95,z:a}),n.skirt(t*.55,.9,e+1.65,0,0,e+2.1,Q.batuPutih,$.POLOS,{z:a})}return n}function KM(i,t,e){const n=new re;return n.box(t+.3,1.5,i,Q.andesit,$.BATU,{y:-1.1}),n.box(t,1.2,i,Q.bata,$.BATA,{y:.4}),n.box(t,e-1.2,i,Q.plester,$.PLESTER,{y:1.6}),n.add(qM(i,t+.8,.7),Q.genteng,$.GENTENG,{y:e+.4,ry:Math.PI/2}),n}function qM(i,t,e){const n=new re;n.gable(i,t,0,e,"#ffffff",0);const s=new le;return s.setAttribute("position",new Vt(n.pos,3)),s.setAttribute("normal",new Vt(n.nor,3)),s}function bf(i,t,e,n=!1){const s=new re;return s.box(t+.2,1.2,i,Q.andesit,$.BATU,{y:-1}),s.box(t,e,i,n?Q.andesit:Q.bata,n?$.BATU:$.BATA,{y:.2}),s.box(t+.2,.18,i,n?Q.andesitTua:Q.batuPutih,$.POLOS,{y:e+.2}),s}function ZM(i,t){const e=new re;e.box(i+.8,1.8,i+.8,Q.andesit,$.BATU,{y:-1.4}),e.box(i,t,i,Q.bata,$.BATA,{y:.4}),e.box(i+.5,.35,i+.5,Q.batuPutih,$.POLOS,{y:t+.4}),e.box(i+.2,.5,i+.2,Q.bata,$.BATA,{y:t+.75});const n=t+1.25;for(const[s,r]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.14,.14,2.3,6,Q.kayuTua,$.KAYU,{x:s*i*.3,y:n,z:r*i*.3});return e.hip(i*.85,i*.85,n+2.3,i*.42,Q.gentengTua,$.GENTENG),e.box(.25,.4,.25,Q.emas,$.POLOS,{y:n+2.3+i*.42-.05}),e}function $M(i,t,e,n,s=!1){const r=new re,a=s?Q.andesit:Q.bata,o=s?$.BATU:$.BATA,c=s?Q.andesitTua:Q.batuPutih,l=-n*i/2,u=6,h=1.2,d=(e-h)*.82;r.box(i+.4,h+1.2,t+.4,Q.andesit,$.BATU,{x:n*.2,y:-1.2});let f=h;for(let x=0;x<u;x++){const m=x/u,p=i*(1-.62*m),y=t*(1-.5*m),v=d/u*(x===0?1.6:.88),_=l+n*p/2;r.box(p,v,y,a,o,{x:_,y:f}),r.box(p+.12,.14,y+.18,c,$.POLOS,{x:_+n*.06,y:f+v-.07}),f+=v}const g=i*.32;return r.skirt(g,t*.45,f,0,0,e,a,o,{x:l+n*g/2}),r}function JM(i,t,e,n){const s=new re,r=(i-e)/2;s.box(i+1,1.6,t+1,Q.andesit,$.BATU,{y:-1.2});for(const c of[-1,1])s.box(r,4.6,t,Q.bata,$.BATA,{x:c*(e/2+r/2),y:.4});s.box(i,1.4,t,Q.bata,$.BATA,{y:5}),s.box(i+.3,.2,t+.3,Q.batuPutih,$.POLOS,{y:6.4});let a=6.6;const o=5;for(let c=0;c<o;c++){const l=c/o,u=i*(.85-.6*l),h=t*(.95-.55*l),d=(n-9)/o;s.box(u,d,h,Q.bata,$.BATA,{y:a}),s.box(u+.2,.14,h+.2,Q.batuPutih,$.POLOS,{y:a+d-.07}),a+=d}return s.skirt(i*.3,t*.4,a,0,0,n,Q.bata,$.BATA),s}function QM(i,t,e){const n=new re;n.box(i,e+1.4,t,Q.bata,$.BATA,{y:-1.4}),n.box(i+.3,.16,t+.3,Q.batuPutih,$.POLOS,{y:e-.08}),n.box(i-.6,.05,t-.6,"#d8cfbd",$.UBIN,{y:e});for(let o=0;o<4;o++)n.box(10,e*(o+1)/4,.8,Q.andesit,$.BATU,{y:0,z:t/2+3.2-(o+.5)*.8});const s=(o,c)=>n.box(o.w,.55,o.d,Q.bata,$.BATA,{...c,y:e});s({w:i,d:.4},{z:-t/2+.2}),s({w:.4,d:t},{x:-i/2+.2}),s({w:.4,d:t},{x:i/2-.2});for(const o of[-1,1])s({w:(i-10)/2,d:.4},{x:o*(5+(i-10)/4),z:t/2-.2});for(const[o,c]of[[-1,-1],[1,-1],[1,1],[-1,1]])n.cyl(.32,.36,9.4,8,Q.kayuTua,$.KAYU,{x:o*3.2,y:e,z:c*3.2});const r=[];for(let o=-2;o<=2;o++)for(const c of[-1,1])r.push([c*12.4,o*6.3]);for(const o of[-1,0,1])for(const c of[-1,1])c>0&&o===0||r.push([o*6.2,c*13.4]);for(const[o,c]of r)n.cyl(.24,.27,4.4,8,Q.kayu,$.KAYU,{x:o,y:e,z:c});const a=e+4.3;n.skirt(i+3,t+3,a,16,17,a+2.2,Q.gentengTua,$.SIRAP),n.skirt(16.4,17.4,a+2.1,9.5,10,a+3.6,Q.gentengTua,$.SIRAP),n.hip(10,10.5,a+3.5,5.6,Q.gentengTua,$.SIRAP),n.box(.6,.9,.6,Q.emas,$.POLOS,{y:a+9});for(const o of[-1,1])n.box(.4,.6,.4,Q.emas,$.POLOS,{z:o*.3,y:a+9});return n.box(2.2,.5,1.6,Q.emas,$.POLOS,{y:e,z:-9}),n.box(2.2,1.6,.3,Q.emas,$.POLOS,{y:e+.5,z:-9.7}),n}function tb(i,t,e){const n=new re;n.box(i+1,e+1.4,t+1,Q.bata,$.BATA,{y:-1.4}),n.box(i+1.3,.16,t+1.3,Q.batuPutih,$.POLOS,{y:e-.08}),n.box(i-1,1,t-1,Q.bata,$.BATA,{y:e}),n.box(i-1,3.2,t-1,Q.plester,$.PLESTER,{y:e+1});for(let s=-2;s<=2;s++)n.box(1,2.4,.1,Q.kayuTua,$.KAYU,{x:s*(i/5.5),y:e,z:(t-1)/2+.02});for(let s=0;s<3;s++)n.box(5,e*(s+1)/3,.7,Q.andesit,$.BATU,{y:0,z:t/2+.5+2.1-(s+.5)*.7});return n.hip(i+2.2,t+2.4,e+4.1,6.5,Q.genteng,$.GENTENG),n.box(.5,.8,.5,Q.emas,$.POLOS,{y:e+10.5,x:-(i-t)*.42}),n.box(.5,.8,.5,Q.emas,$.POLOS,{y:e+10.5,x:(i-t)*.42}),n}function eb(i,t){const e=new re;e.box(i+.6,2.8,i+.6,Q.bata,$.BATA,{y:-1.2}),e.box(i+.9,.18,i+.9,Q.batuPutih,$.POLOS,{y:1.5});const n=i*.42;e.box(n,1.6,n,Q.kayu,$.KAYU,{y:1.6});let s=3.1;for(let r=0;r<t;r++){const a=r/Math.max(1,t-1),o=i*(1.08-.62*a);e.skirt(o,o,s,o*.4,o*.4,s+.55,Q.ijuk,$.JERAMI,{shade:[.9,1.06]}),e.box(o*.36,.5,o*.36,Q.kayuTua,$.KAYU,{y:s+.5}),s+=.95}return e.skirt(i*.4,i*.4,s,0,0,s+1,Q.ijuk,$.JERAMI),e.cyl(.05,.16,.7,6,Q.emas,$.POLOS,{y:s+.95}),e}function nb(i){const t=new re,e=i/17;t.box(i,1.9*e+1.2,i,Q.andesit,$.BATU,{y:-1.2}),t.box(i+.4,.2*e,i+.4,Q.andesitTua,$.POLOS,{y:1.9*e-.1}),t.box(i*.78,1.3*e,i*.78,Q.andesit,$.BATU,{y:1.9*e});const n=i*.52;let s=3.2*e;t.box(n,5.6*e,n,Q.andesit,$.BATU,{y:s}),t.box(n*.3,2.8*e,.3,Q.gelap,$.POLOS,{y:s+.2,z:n/2+.02}),t.box(n*.42,.5*e,.4,Q.andesitTua,$.BATU,{y:s+3.1*e,z:n/2}),s+=5.6*e;for(let r=0;r<3;r++){const a=n*(1.06-r*.2),o=1.7*e;t.box(a,o,a,Q.andesit,$.BATU,{y:s}),t.box(a+.3*e,.22*e,a+.3*e,Q.andesitTua,$.POLOS,{y:s-.1*e});for(const[c,l]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.box(.5*e,.6*e,.5*e,Q.andesit,$.BATU,{x:c*a/2.3,y:s+o,z:l*a/2.3}),t.skirt(.5*e,.5*e,s+o+.6*e,0,0,s+o+1.2*e,Q.andesit,$.BATU,{x:c*a/2.3,z:l*a/2.3});s+=o}t.cyl(n*.18,n*.24,1.6*e,8,Q.andesit,$.BATU,{y:s}),t.cyl(.05*e,n*.16,2.2*e,8,Q.andesit,$.BATU,{y:s+1.6*e});for(let r=0;r<4;r++)t.box(3.2*e,3.2*e*(r+1)/4,.8*e,Q.andesit,$.BATU,{z:i*.39+(3.2-(r+.5)*.8)*e});return t}function ib(i,t,e=Q.alang,n=$.JERAMI){const s=new re;s.box(i*.92,.6+1.2,t*.92,Q.bata,$.BATA,{y:-1.2});for(const[r,a]of[[-1,-1],[1,-1],[1,1],[-1,1]])s.cyl(.11,.11,2.6,6,Q.kayuTua,$.KAYU,{x:r*i*.43,y:.6,z:a*t*.43});return s.hip(i+1,t+1,3.1,Math.min(i,t)*.55,e,n),s}function sb(i,t){const e=new re;for(const[n,s]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.cyl(.08,.08,3.4,5,Q.kayuTua,$.KAYU,{x:n*i*.42,y:-1,z:s*t*.42});return e.box(i*.9,.15,t*.9,Q.bambu,$.ANYAMAN,{y:.9}),e.gable(i+.8,t+.8,2.4,1.2,Q.alang,$.JERAMI,Q.alang,$.JERAMI),e}const Sf=[[Q.merah,Q.putih],[Q.kuning,Q.merah],[Q.putih,Q.merah],[Q.biru,Q.putih],[Q.hijau,Q.kuning]];function rb(i,t){const e=new re;e.cyl(.05,.08,i,5,Q.bambu,$.KAYU,{y:-.6});const[n,s]=Sf[t%Sf.length],r=i*.62,a=6;for(let l=0;l<a;l++){const u=i-.9-(l+1)*r/a;e.box(.04,r/a,.5,l%2?s:n,$.POLOS,{y:u,z:.27})}const{sway:o,pos:c}=e;for(let l=0;l<o.length;l++){const u=c[l*3+1];c[l*3+2]>.1&&(o[l]=.12+(i-.9-u)/r*.5)}return e}function ab(i,t,e){const n=new re;n.box(i,e+1.8,t,Q.bata,$.BATA,{y:-1.8}),n.box(i+.3,.16,t+.3,Q.batuPutih,$.POLOS,{y:e-.08}),n.box(i-.6,.05,t-.6,"#d8cfbd",$.UBIN,{y:e});for(let a=0;a<5;a++)n.box(7,e*(a+1)/5,.72,Q.andesit,$.BATU,{z:t/2+3.6-(a+.5)*.72});const s=(a,o,c)=>n.box(a,.55,o,Q.bata,$.BATA,{...c,y:e});s(i,.4,{z:-t/2+.2}),s(.4,t,{x:-i/2+.2}),s(.4,t,{x:i/2-.2});for(const a of[-1,1])s((i-7)/2,.4,{x:a*(3.5+(i-7)/4),z:t/2-.2});Vd.forEach(([a,o],c)=>n.cyl(c<4?.3:.22,c<4?.34:.25,c<4?6.4:4.2,8,c<4?Q.kayuTua:Q.kayu,$.KAYU,{x:a,y:e,z:o}));const r=e+4.1;n.skirt(i+1.2,t+1.6,r,12.4,8.2,r+2.2,Q.gentengTua,$.SIRAP),n.hip(12.8,8.6,r+2.1,3.6,Q.gentengTua,$.SIRAP),n.box(.5,.8,.5,Q.emas,$.POLOS,{y:r+5.6}),n.box(2.4,.5,1.6,Q.emas,$.POLOS,{y:e,z:-2.6}),n.box(2.4,1.7,.3,Q.emas,$.POLOS,{y:e+.5,z:-3.3});for(const a of[-1,1])n.cyl(.04,.04,3.2,5,Q.kayuTua,$.KAYU,{x:a*2.2,y:e,z:-2.9}),n.cyl(.05,1,.45,8,Q.kuning,$.POLOS,{x:a*2.2,y:e+3,z:-2.9});return n}const Af=["#e9dfc6","#e0d0ab","#ece6d6"];function ob(i,t,e=0){const n=new re,s=2.5,r=i/2,a=t/2,o=Af[e%Af.length],c=[-r,0,a],l=[-r,0,-a],u=[0,s,-a],h=[0,s,a],d=[r,0,a],f=[r,0,-a];return n.faces([[c,u,l],[c,h,u],[d,f,u],[d,u,h],[f,l,u],[c,d,h]],o,$.POLOS),n.faces([[[-.6,0,a+.02],[.6,0,a+.02],[0,1.7,a+.02]]],Q.gelap,$.POLOS),n.box(.12,.12,t+.5,Q.kayuTua,$.KAYU,{y:s-.04}),n.cyl(.04,.04,.9,4,Q.kayuTua,$.KAYU,{y:s,z:a+.15}),n.box(.03,.3,.5,Q.merah,$.POLOS,{y:s+.55,z:a+.42,sway:.08}),n}function cb(i,t){const e=new re;e.box(i,1.4,.2,Q.kayu,$.KAYU,{z:-t/2+.1});for(const s of[-1,1])e.box(.2,1.4,t,Q.kayu,$.KAYU,{x:s*(i/2-.1)});const n=Math.round(i/3.4);for(let s=0;s<=n;s++)for(const r of[-t/2+.2,t/2-.3])e.cyl(.12,.13,2.9,5,Q.kayuTua,$.KAYU,{x:-i/2+.2+s*(i-.4)/n,z:r});for(let s=1;s<n;s++)e.box(.12,1.1,t*.5,Q.kayu,$.KAYU,{x:-i/2+s*i/n,z:-t*.22});return e.box(i-1,.45,.6,Q.kayuTua,$.KAYU,{z:-t/2+.6}),e.gable(i+.8,t+1.2,2.8,1.7,Q.alang,$.JERAMI,Q.kayu,$.KAYU),e}function lb(){const i=new re;return i.cyl(1,1.15,.9,8,Q.alang,$.JERAMI),i.cyl(.15,1,.7,8,Q.alang,$.JERAMI,{y:.9}),i}function ub(){const i=new re;return i.box(1,.8,.8,Q.kayuMuda,$.KAYU),i.box(.9,.7,.7,Q.kayu,$.KAYU,{y:.8,x:.1,ry:.4}),i}function hb(){const i=new re;return i.cyl(.32,.26,.9,8,"#a8603a",$.POLOS),i.cyl(.36,.32,.25,8,"#a8603a",$.POLOS,{y:.9}),i.cyl(.3,.24,.8,8,"#8f4f30",$.POLOS,{x:.7,z:.2}),i}function fb(){const i=new re;for(const t of[-1,1])i.cyl(.05,.05,1.4,5,Q.kayuTua,$.KAYU,{x:t*1.6});i.box(3.4,.08,1,Q.bambu,$.ANYAMAN,{y:1.1});for(let t=0;t<8;t++)i.box(.3,.05,.12,"#b7c4cc",$.POLOS,{x:-1.4+t*.4,y:1.15,z:t%2?.2:-.2});return i}function db(i,t,e){const n=new re;n.box(i,.22,t,Q.kayuMuda,$.KAYU,{y:-.22});for(const r of[-1,1])n.box(.2,.25,t,Q.kayuTua,$.KAYU,{x:r*(i/2-.1),y:-.45});const s=Math.max(2,Math.round(t/3));for(let r=0;r<=s;r++)for(const a of[-1,1])n.cyl(.13,.13,e+4.2,6,Q.kayuTua,$.KAYU,{x:a*(i/2-.1),y:-e-4,z:-t/2+r*t/s});for(const r of[-1,1])n.cyl(.14,.14,.7,6,Q.kayuTua,$.KAYU,{x:r*(i/2-.25),y:0,z:t/2-.4});return n}function pb(i,t,e,n,{stone:s,piers:r}){const a=new re,o=Math.ceil(i/1.5),c=s?.9:.35,l=g=>-i/2+g/o*i,u=g=>e(g/o),h=[],d=[],f=[];for(let g=0;g<o;g++){const x=l(g),m=l(g+1),p=u(g),y=u(g+1),v=[-t/2,p,x],_=[t/2,p,x],A=[t/2,y,m],w=[-t/2,y,m];h.push([v,w,A],[v,A,_]);const C=[-t/2,p-c,x],z=[t/2,p-c,x],b=[t/2,y-c,m],E=[-t/2,y-c,m];d.push([C,w,v],[C,E,w],[z,_,A],[z,A,b]),f.push([C,z,b],[C,b,E])}a.faces(h,s?"#9a958c":Q.kayuMuda,s?$.UBIN:$.KAYU),a.faces(d,s?Q.andesit:Q.kayu,s?$.BATU:$.KAYU),a.faces(f,s?Q.andesitTua:Q.kayuTua,$.POLOS);for(const g of[-1,1]){const x=g*(t/2-.2),m=[],p=s?1.05:1;for(let y=0;y<o;y++){const v=l(y),_=l(y+1),A=u(y),w=u(y+1);if(s){const C=[x-.2,x+.2];m.push([[C[1],A,v],[C[1],A+p,v],[C[1],w+p,_]],[[C[1],A,v],[C[1],w+p,_],[C[1],w,_]],[[C[0],w,_],[C[0],w+p,_],[C[0],A+p,v]],[[C[0],w,_],[C[0],A+p,v],[C[0],A,v]],[[C[0],A+p,v],[C[0],w+p,_],[C[1],w+p,_]],[[C[0],A+p,v],[C[1],w+p,_],[C[1],A+p,v]])}else y%2===0&&a.cyl(.07,.07,p,5,Q.kayuTua,$.KAYU,{x,y:A,z:v})}if(s)a.faces(m,Q.bata,$.BATA);else{const y=[];for(let v=0;v<o;v++){const _=l(v),A=l(v+1),w=u(v)+1,C=u(v+1)+1;y.push([[x-.06,w,_],[x+.06,C,A],[x+.06,w,_]],[[x-.06,w,_],[x-.06,C,A],[x+.06,C,A]])}a.faces(y,Q.kayu,$.KAYU)}}for(const g of r){const x=-i/2+g*i,m=e(g)-c,p=n(x);if(s){a.box(t+.6,m-p+.5,2,Q.andesit,$.BATU,{y:p-.5,z:x}),a.box(t+1,.3,2.4,Q.andesitTua,$.POLOS,{y:m-.3,z:x});for(const y of[-1,1]){const v=e(g)+1.05;a.box(.5,.5,.5,Q.batuPutih,$.POLOS,{x:y*(t/2-.2),y:v,z:x}),a.cyl(.06,.06,1.6,5,Q.gelap,$.POLOS,{x:y*(t/2-.2),y:v+.5,z:x}),a.box(.36,.48,.36,"#ffe3a0",$.POLOS,{x:y*(t/2-.2),y:v+2.1,z:x}),a.skirt(.5,.5,v+2.58,0,0,v+2.9,Q.gelap,$.POLOS,{x:y*(t/2-.2),z:x})}}else for(const y of[-1,1])a.cyl(.16,.18,m-p+.6,6,Q.kayuTua,$.KAYU,{x:y*(t/2-.3),y:p-.6,z:x})}return a}const eu={value:0},mb=`
uniform float uTime;
attribute float aKind;
attribute float aSway;
varying float vKind;
varying vec3 vBWorld;
varying vec3 vBNrm;
`,gb=`
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
`;function xb(i){const t=new Yn({vertexColors:!0});return t.onBeforeCompile=e=>{e.uniforms.uTime=eu,e.uniforms.uNoise={value:i},e.uniforms.uSeeA=zn.a,e.uniforms.uSeeB=zn.b,e.uniforms.uSeeR=zn.r,e.vertexShader=mb+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
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
      vBNrm = normalize(mat3(bModel) * normal);`),e.fragmentShader=gb+e.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
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
      diffuseColor.rgb = buildingPattern(diffuseColor.rgb);`)},t}function _b(){const i=new Il({depthPacking:Tl});return i.onBeforeCompile=t=>{t.uniforms.uTime=eu,t.vertexShader=`uniform float uTime;
attribute float aSway;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      vec3 wp0 = (modelMatrix * vec4(position, 1.0)).xyz;
      float sw = aSway * (sin(uTime * 2.4 + wp0.x * 0.6 + wp0.z * 0.45) + 0.35 * sin(uTime * 5.3 + wp0.y * 1.3));
      transformed.x += sw;
      transformed.z += sw * 0.7;`)},i}const za=1.6;function vb(i){const t=[],e=(a,o)=>{for(const l of t)if(Math.abs(l.x-a)<za&&Math.abs(l.z-o)<za)return l;const c={id:t.length,x:a,z:o,links:[],w:new Map};return t.push(c),c},n=i.map(()=>[0,1]),s=(a,o,c)=>{const[l,u,h,d]=a,f=h-l,g=d-u,x=f*f+g*g,m=((o-l)*f+(c-u)*g)/x;if(m<-1e-6||m>1+1e-6)return null;const p=l+f*m-o,y=u+g*m-c;return p*p+y*y<za*za?Math.min(1,Math.max(0,m)):null};for(let a=0;a<i.length;a++)for(let o=0;o<i.length;o++){if(a===o)continue;const[c,l,u,h]=i[a],[d,f,g,x]=i[o];for(const[C,z]of[[d,f],[g,x]]){const b=s(i[a],C,z);b!==null&&n[a].push(b)}const m=u-c,p=h-l,y=g-d,v=x-f,_=m*v-p*y;if(Math.abs(_)<1e-9)continue;const A=((d-c)*v-(f-l)*y)/_,w=((d-c)*p-(f-l)*m)/_;A>0&&A<1&&w>0&&w<1&&n[a].push(A)}const r=new Set;return i.forEach((a,o)=>{const[c,l,u,h]=a,d=[...new Set(n[o].map(g=>Math.round(g*1e4)/1e4))].sort((g,x)=>g-x);let f=null;for(const g of d){const x=e(c+(u-c)*g,l+(h-l)*g);if(f&&f!==x){const m=f.id<x.id?`${f.id}-${x.id}`:`${x.id}-${f.id}`;r.has(m)||(r.add(m),f.links.push(x),x.links.push(f));const p=Math.max(a[4]??3,f.w.get(x.id)??0);f.w.set(x.id,p),x.w.set(f.id,p)}f=x}}),{nodes:t,edgeCount:r.size}}const wf=128,Mr={genteng:["#b65a32","#a84f2c","#c46a3a","#94482b"],sirap:["#6b4f3a","#5d4434","#7a5a40","#584a3c"],joglo:["#5a4a40","#4a4038","#62503f","#3f3a35"],alang:["#bb9c5c","#a98a4e","#c4a76a","#8f7a52"]};function yb(i,t){const e=i.roof??0;switch(i.type){case"rumah-bata":return OM(i.w,i.d,Mr.genteng[e]);case"rumah-limasan":return FM(i.w,i.d,Mr.sirap[e]);case"rumah-joglo":return BM(i.w,i.d,Mr.joglo[e]);case"rumah-panggung":return HM(i.w,i.d,Mr.alang[e]);case"rumah-lumbung":return GM(Mr.alang[e]);case"gudang":return VM(i.w,i.d,Q.genteng);case"warung":return XM(i.color,i.goods);case"sumur":return jM();case"tembok":return YM(i.len,i.t,i.h);case"tembok-dalam":return KM(i.len,i.t,i.h);case"pagar":return bf(i.len,i.t,i.h);case"pagar-batu":return bf(i.len,i.t,i.h,!0);case"menara":return ZM(i.size,i.h);case"bentar":return $M(i.w,i.d,i.h,i.mirror,i.stone);case"paduraksa":return JM(i.w,i.d,i.opening,i.h);case"pendopo":return QM(i.w,i.d,i.h);case"bangsal":return tb(i.w,i.d,i.h);case"meru":return eb(i.base,i.tiers);case"candi":return nb(i.base);case"bale":return ib(i.w,i.d);case"dangau":return sb(i.w,i.d);case"umbul":return rb(i.h,i.color);case"siti-hinggil":return ab(i.w,i.d,i.h);case"tenda":return ob(i.w,i.d,i.color);case"kandang":return cb(i.w,i.d);case"jerami":return lb();case"peti":return ub();case"gentong":return hb();case"jemuran":return fb();case"dermaga":return db(i.w,i.len,i.y);case"jembatan-batu":case"jembatan-kayu":{const n=i.surface,s=c=>n.y0+(n.y1-n.y0)*c+n.arch*Math.sin(Math.PI*Math.min(1,Math.max(0,(c-n.a0)/(n.a1-n.a0)))),r=(i.type==="jembatan-batu"?16:7)/i.len,a=[];for(let c=n.a0+r;c<n.a1-r*.4;c+=r)a.push(c);const o=c=>i.axis==="x"?t.heightAt(i.x+c,i.z):t.heightAt(i.x,i.z+c);return pb(i.len,i.w,s,o,{stone:i.type==="jembatan-batu",piers:a})}default:throw new Error(`jenis bangunan tidak dikenal: ${i.type}`)}}function Jd(i,t,e,n,s,r){const o=[];for(let u=0;u<=10;u++){const h=u/10,d=-t/2+h*t,f=e/2*Math.pow(Math.sin(Math.PI*h),.6),g=.35*Math.pow(Math.abs(h-.5)*2,3);o.push({z:d,w:f,top:.25+g,keel:-n*Math.pow(Math.sin(Math.PI*h),.5)+g*.6})}const c=[],l=[];for(let u=0;u<10;u++){const h=o[u],d=o[u+1];for(const f of[-1,1]){const g=[f*h.w,h.top,h.z],x=[f*d.w,d.top,d.z],m=[0,h.keel,h.z],p=[0,d.keel,d.z];f>0?c.push([g,m,p],[g,p,x]):c.push([g,p,m],[g,x,p])}l.push([[-h.w,h.top-.12,h.z],[d.w,d.top-.12,d.z],[h.w,h.top-.12,h.z]],[[-h.w,h.top-.12,h.z],[-d.w,d.top-.12,d.z],[d.w,d.top-.12,d.z]])}i.faces(c,s,$.KAYU),i.faces(l,Q.kayuMuda,$.KAYU),i.box(e*.02+.05,.12,t*.7,r,$.POLOS,{x:e*.43,y:.05}),i.box(e*.02+.05,.12,t*.7,r,$.POLOS,{x:-e*.43,y:.05})}function Mb(){const i=new re;Jd(i,6.2,.85,.45,"#f2efe6","#2f62a8");for(const t of[-1,1])i.cyl(.09,.09,4.6,5,Q.bambu,$.KAYU,{x:t*2.3,y:-.05,rx:Math.PI/2,z:2.3});for(const t of[-1.2,1.2])i.box(4.8,.08,.1,Q.kayuTua,$.KAYU,{y:.35,z:t});return i.cyl(.05,.06,3.4,5,Q.kayuTua,$.KAYU,{y:.2,z:.6}),i.faces([[[0,3.5,.6],[0,.9,.7],[0,.9,-2]],[[0,3.5,.6],[0,.9,-2],[0,.9,.7]]],Q.merah,$.POLOS,{sway:.03}),i.build()}function bb(){const i=new re;Jd(i,18,5,2.2,"#7a5236",Q.emas),i.box(4.2,2,5.5,Q.kayu,$.KAYU,{y:.1,z:-4.8}),i.hip(4.8,6.2,2.1,1.4,Q.ijuk,$.JERAMI,{z:-4.8});for(const[t,e]of[[2.6,11],[-1,8.5]]){i.cyl(.14,.18,e,6,Q.kayuTua,$.KAYU,{y:.1,z:t});const n=e-.6;i.faces([[[0,n,t+2.6],[0,n*.35,t-2.2],[0,n*.4,t+3.4]],[[0,n,t+2.6],[0,n*.95,t-1.6],[0,n*.35,t-2.2]],[[0,n,t+2.6],[0,n*.4,t+3.4],[0,n*.35,t-2.2]],[[0,n,t+2.6],[0,n*.35,t-2.2],[0,n*.95,t-1.6]]],"#e8dcc0",$.POLOS,{sway:.04})}return i.build()}function Sb({ground:i,plan:t,mask:e,grid:n,quality:s,noiseTexture:r}){const a=new Ce;a.name="kepulauan-kencana";const{shadows:o}=s,c=new Map,l={};for(const N of t.build){l[N.type]=(l[N.type]||0)+1;const j=`${Math.floor(N.x/wf)},${Math.floor(N.z/wf)}`;let H=c.get(j);H||c.set(j,H=[]),H.push(N)}const u=xb(r),h=_b();let d=0;for(const[N,j]of c){const H=j.map(U=>yb(U,i)),V=H.reduce((U,xt)=>U+xt.pos.length/3,0),tt=new Float32Array(V*3),Y=new Float32Array(V*3),K=new Float32Array(V*3),it=new Float32Array(V),G=new Float32Array(V);let ct=0;H.forEach((U,xt)=>{const ft=j[xt],yt=Math.cos(ft.rot),vt=Math.sin(ft.rot),Bt=U.pos.length/3;for(let Et=0;Et<Bt;Et++){const D=Et*3,L=(ct+Et)*3,J=U.pos[D],st=U.pos[D+2];tt[L]=ft.x+J*yt+st*vt,tt[L+1]=ft.y+U.pos[D+1],tt[L+2]=ft.z-J*vt+st*yt;const ht=U.nor[D],ut=U.nor[D+2];Y[L]=ht*yt+ut*vt,Y[L+1]=U.nor[D+1],Y[L+2]=-ht*vt+ut*yt}K.set(U.col,ct*3),it.set(U.kind,ct),G.set(U.sway,ct),ct+=Bt});const at=new le;at.setAttribute("position",new xe(tt,3)),at.setAttribute("normal",new xe(Y,3)),at.setAttribute("color",new xe(K,3)),at.setAttribute("aKind",new xe(it,1)),at.setAttribute("aSway",new xe(G,1)),at.computeBoundingSphere(),d+=V;const mt=new ne(at,u);mt.name=`bangunan-${N}`,mt.castShadow=o,mt.receiveShadow=o,mt.customDepthMaterial=h,a.add(mt)}const f=qd(r),g=s.canopyDetail,x=s.treeDensity,m=N=>({...N,y:i.heightAt(N.x,N.z),a:((N.x*.37+N.z*.11)%1+1)%1,b:.5,c:((N.x*.13-N.z*.29)%1+1)%1}),p=N=>t.trees.filter(j=>j.type===N).map(m),y=In({scaleMin:1,scaleMax:1,tilt:.05,tint:.08,sink:.1}),v=new B,_=(N,j,H)=>{y(N,j,H),j.scale(v.setScalar(N.s)),j.elements[12]=N.x,j.elements[13]=N.y-.1,j.elements[14]=N.z},A=new Ce;A.name="pohon-kencana";const w=N=>({castShadow:o,receiveShadow:o,toMatrix:N});A.add(Ze("beringin",aM(g),f,p("beringin"),w(_)),Ze("kamboja",oM(),f,p("kamboja"),w(_)),Ze("pisang",cM(),f,p("pisang"),w(_)),Ze("mangga",al(g),f,p("mangga").map(N=>({...N,s:N.s*.62})),w(_)));const C=(N,j,H)=>e.reserved(N,j,H+1)||Gi(N,j,ye)<10||Gi(N,j,xi)<10||to.some(V=>zr(N,j,V,H+2)),z=p("kelapa"),b={kelapa:[],pohon:[],payung:[],semak:[],bunga:[]};for(const N of ho){const j=!!N.rx,H=(j?Math.max(N.rx,N.rz):N.r)*1.12,V=j?N.rx*N.rz/255**2:(N.r/255)**2,tt=N.forest??1,Y=(K,it)=>ql(N,K,it)<1.1;b.kelapa.push(...vn({ground:i,grid:n,kind:"kelapa",seed:1101+N.seed,radius:1.8,area:H,cx:N.x,cz:N.z,reserved:C,count:Math.round(130*x*Math.sqrt(V)),accept:(K,it,G,ct,at)=>Y(K,it)&&G>.9&&G<4.2&&ct<.3&&at()<.6})),b.pohon.push(...vn({ground:i,grid:n,kind:"pohon",seed:1202+N.seed,radius:2.3,area:H,cx:N.x,cz:N.z,reserved:C,count:Math.round(340*x*V*tt)+6,accept:(K,it,G,ct)=>Y(K,it)&&G>3&&G<30&&ct<.6&&Oi(K,it)>.44})),b.payung.push(...vn({ground:i,grid:n,kind:"pohon",seed:1303+N.seed,radius:4.5,area:H,cx:N.x,cz:N.z,reserved:C,count:Math.round(40*x*V*tt)+2,accept:(K,it,G,ct,at)=>Y(K,it)&&G>3&&G<30&&ct<.45&&at()<.5})),b.semak.push(...vn({ground:i,grid:n,kind:"semak",seed:1404+N.seed,radius:1.1,area:H,cx:N.x,cz:N.z,reserved:C,count:Math.round(260*x*V*Math.sqrt(tt))+8,accept:(K,it,G,ct)=>Y(K,it)&&G>2.8&&ct<.7})),b.bunga.push(...vn({ground:i,grid:n,kind:"semak",seed:1505+N.seed,radius:1,area:H,cx:N.x,cz:N.z,reserved:C,count:Math.round(90*x*V*Math.sqrt(tt))+6,accept:(K,it,G,ct)=>Y(K,it)&&G>2.8&&ct<.5}))}A.add(Ze("kelapa",jd(),f,[...z,...b.kelapa],w(In({scaleMin:.8,scaleMax:1.25,tilt:.35,tint:.1}))),Ze("pohon-hutan",al(g),f,b.pohon,w(In({scaleMin:.75,scaleMax:1.3,tilt:.12,tint:.16}))),Ze("pohon-payung",Yd(g),f,b.payung,w(In({scaleMin:.8,scaleMax:1.15,tilt:.08,tint:.12}))),Ze("semak",eo(0,null),f,b.semak,{castShadow:o&&s.level==="tinggi",receiveShadow:o,toMatrix:In({scaleMin:.7,scaleMax:1.4,tilt:.2,tint:.2,sink:.1})}),Ze("semak-bunga",eo(0,["#e0353f","#f4c02c","#f06aa8","#ffffff"]),f,b.bunga,{castShadow:o&&s.level==="tinggi",receiveShadow:o,toMatrix:In({scaleMin:.7,scaleMax:1.2,tilt:.15,tint:.08,sink:.1})})),a.add(A);const E={jukung:Mb(),jong:bb()},I=[];for(const N of["jukung","jong"]){const j=t.boats.filter(V=>(V.type==="jukung-darat"?"jukung":V.type)===N);if(!j.length)continue;const H=new rr(E[N],u,j.length);H.name=`perahu-${N}`,H.castShadow=o,H.receiveShadow=o,H.customDepthMaterial=h,H.instanceMatrix.setUsage(Hi),j.forEach((V,tt)=>I.push({...V,mesh:H,i:tt,phase:(V.x*.31+V.z*.17)%6.28,land:V.type==="jukung-darat",y:Math.max(0,i.heightAt(V.x,V.z))})),a.add(H)}const X=[...new Set(I.map(N=>N.mesh))],W=new Ut,q=new _e,M=new rn,S=new B,R=new B(1,1,1);function T(N){for(const j of I)j.land?(M.set(.04,j.rot,.12),S.set(j.x,j.y+.45,j.z)):(M.set(Math.sin(N*.9+j.phase)*.025,j.rot,Math.sin(N*1.1+j.phase*1.7)*.06),S.set(j.x,.12+Math.sin(N*1.3+j.phase)*.1,j.z)),q.setFromEuler(M),j.mesh.setMatrixAt(j.i,W.compose(S,q,R));for(const j of X)j.instanceMatrix.needsUpdate=!0}T(0);for(const N of X)N.computeBoundingSphere();const k=[...b.kelapa.map(N=>({x:N.x,z:N.z,radius:.45,kind:"pohon"})),...b.pohon.map(N=>({x:N.x,z:N.z,radius:.7,kind:"pohon"})),...b.payung.map(N=>({x:N.x,z:N.z,radius:.75,kind:"pohon"}))],F=[...t.blocked.map(N=>({x:N.x,z:N.z,radius:Math.max(N.hx,N.hz)+1.5,strength:.25})),...b.pohon.map(N=>({x:N.x,z:N.z,radius:4.8,strength:.4})),...b.payung.map(N=>({x:N.x,z:N.z,radius:5.5,strength:.3})),...b.kelapa.map(N=>({x:N.x,z:N.z,radius:2.4,strength:.18})),...t.trees.filter(N=>N.type==="beringin").map(N=>({x:N.x,z:N.z,radius:12,strength:.5})),...b.semak.map(N=>({x:N.x,z:N.z,radius:1.8,strength:.2}))],P=vb([...t.roads,...t.paths]);return{object:a,colliders:[...t.colliders,...k],surfaces:t.surfaces,occlusion:F,routes:P,spots:t.spots,roofs:t.roofs,stats:{bangunan:t.build.length,rumah:Object.entries(l).filter(([N])=>N.startsWith("rumah-")).reduce((N,[,j])=>N+j,0),jenis:l,petak:c.size,titik:d,pohon:Object.values(b).reduce((N,j)=>N+j.length,0)+t.trees.length,perahu:I.length,simpulJalan:P.nodes.length},update(N){eu.value=N,T(N)}}}const ul=30,Tf=new Ut,Ef=new Ut;function hl(i,t,e){const n=i.elements;t[e]=n[0],t[e+1]=n[4],t[e+2]=n[8],t[e+3]=n[12],t[e+4]=n[1],t[e+5]=n[5],t[e+6]=n[9],t[e+7]=n[13],t[e+8]=n[2],t[e+9]=n[6],t[e+10]=n[10],t[e+11]=n[14]}function no(i,t,e,n){let s=null;i.traverse(u=>{!s&&u.isSkinnedMesh&&(s=u)});const{skeleton:r}=s,a=new jl(i),o={},c=u=>(o[u]||(a.stopAllAction(),a.clipAction(us.findByName(t,u)).reset().play(),a.setTime(0),o[u]=r.bones.map(h=>h.quaternion.clone())),o[u]),l={};for(const[u,h]of Object.entries(n)){const d=us.findByName(t,h.clip);if(!d)continue;const f=Object.entries(h.hold||{}).map(([x,m])=>[Number(x),c(m)]);a.stopAllAction(),a.clipAction(d).reset().play();const g=Math.max(1,Math.round(d.duration*ul));l[u]={row:e.length,n:g,loop:h.loop!==!1};for(let x=0;x<g;x++){a.setTime(x/ul);for(const[p,y]of f)r.bones[p].quaternion.copy(y[p]);i.updateMatrixWorld(!0),Ef.copy(i.matrixWorld).invert();const m=new Float32Array(r.bones.length*12);r.bones.forEach((p,y)=>{Tf.multiplyMatrices(Ef,p.matrixWorld).multiply(r.boneInverses[y]),hl(Tf,m,y*12)}),e.push(m)}}return a.stopAllAction(),{table:l,skeleton:r}}function kr(i){const t=[],e=[],n=[],s=[],r=[];for(const a of i){const o=a.geometry,c=t.length/3,l=o.attributes.position,u=o.attributes.normal,h=o.attributes.uv,d=o.attributes.skinIndex,f=o.attributes.skinWeight;for(let x=0;x<l.count;x++){t.push(l.getX(x),l.getY(x),l.getZ(x)),e.push(u.getX(x),u.getY(x),u.getZ(x)),n.push(h.getX(x),h.getY(x));let m=0;for(let p=1;p<4;p++)f.getComponent(x,p)>f.getComponent(x,m)&&(m=p);s.push(d.getComponent(x,m))}const g=o.index;for(let x=0;x<g.count;x++)r.push(c+g.getX(x))}return{pos:t,nor:e,uv:n,bone:s,index:r}}function fi(i,t,e){const n=i[t].subarray(e*12,e*12+12);return new Ut().set(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],0,0,0,1)}function ze(i,t,e,n,s,r){const a=t.index?t.toNonIndexed():t;a.applyMatrix4(fi(e,n,s).invert());const o=i.pos.length/3,c=a.attributes.position,l=a.attributes.normal,u=a.attributes.uv;for(let h=0;h<c.count;h++)i.pos.push(c.getX(h),c.getY(h),c.getZ(h)),i.nor.push(l.getX(h),l.getY(h),l.getZ(h)),r?i.uv.push(r[0],r[1]):i.uv.push(u.getX(h),u.getY(h)),i.bone.push(s),i.index.push(o+h)}function Qd(i){const t=new le;return t.setAttribute("position",new Vt(i.pos,3)),t.setAttribute("normal",new Vt(i.nor,3)),t.setAttribute("uv",new Vt(i.uv,2)),t.setAttribute("aBone",new Vt(i.bone,1)),t.setIndex(i.index),t}function tp(i,t){const e=t*3,n=new Float32Array(e*i.length*4);i.forEach((r,a)=>n.set(r.subarray(0,Math.min(r.length,e*4)),a*e*4));const s=new hs(n,e,i.length,Xe,yn);return s.magFilter=Ye,s.minFilter=Ye,s.needsUpdate=!0,s}const Ab=`
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
`;function fl(i,t){i.uniforms.uBones={value:t},i.vertexShader=Ab+i.vertexShader.replace("void main() {",`void main() {
  mat4 animM = animMatrix();`).replace("#include <beginnormal_vertex>",`vec3 objectNormal = normalize(mat3(animM) * vec3(normal));
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif`).replace("#include <begin_vertex>","vec3 transformed = (animM * vec4(position, 1.0)).xyz;")}function ep(i,t,e,n){const s=t*ul;let r,a,o;if(i.loop){const c=(s%i.n+i.n)%i.n;r=Math.floor(c),a=(r+1)%i.n,o=c-r}else{const c=Math.min(s,i.n-1);r=Math.floor(c),a=Math.min(r+1,i.n-1),o=c-r}e[n]=i.row+r,e[n+1]=i.row+a,e[n+2]=o}const rc=2.3,wb={idle:"idle",walk:"walk",sit:"sit",interact:"interact-right",pickup:"pick-up",wave:"emote-yes"},Rf=Object.fromEntries(Object.entries(wb).map(([i,t])=>[i,{clip:t,loop:i!=="wave"}])),Tb=1.4,Cf=.25,Na=2.6,Eb=.35,Pf=["male-a","male-b","male-e","male-f","female-a","female-b","female-c","female-f"],Ua={emas:[.3125,.5625],kayu:[.8125,.8125],besi:[.4375,.8125]},Rb=new Ut;function Cb({ground:i,routes:t,spots:e,quality:n,villagerGltf:s,soldier:r}){const a=new Ce;a.name="penduduk";const o=[],c=no(s.scene,s.animations,o,Rf),l={};s.scene.traverse(G=>{G.isSkinnedMesh&&(l[G.name.replace("character-","")]=G)});const u=Object.values(l)[0].material.map,h=[];for(const G of Pf){const ct=l[G];ct&&h.push({name:G,data:kr([ct]),table:c.table,map:u})}const d=kr([l["male-b"]]);let f=0;for(let G=0;G<d.bone.length;G++)d.bone[G]===6&&(f=Math.max(f,d.pos[G*3+1]));const g=c.table.sit.row,x=fi(o,g,6),m=new B(0,f-.015,.02).applyMatrix4(x);ze(d,new Ve(.17,.15,.07,10,1,!0).translate(m.x,m.y+.035,m.z),o,g,6,Ua.emas);for(let G=0;G<5;G++){const ct=G/5*Math.PI*2;ze(d,new Js(.035,.09,4).translate(m.x+Math.cos(ct)*.16,m.y+.11,m.z+Math.sin(ct)*.16),o,g,6,Ua.emas)}if(h.push({name:"raja",data:d,table:c.table,map:u}),r){const G=Ql(r.model),ct=no(G,r.clips,o,Rf),at=[];G.traverse(ft=>{ft.isSkinnedMesh&&at.push(ft)});const mt=kr(at),U=ct.table.idle.row,xt=new B(-.265,0,.068).applyMatrix4(ct.skeleton.boneInverses[5].clone().invert()).applyMatrix4(fi(o,U,5));ze(mt,new Ve(.016,.016,1.3,5).translate(xt.x,xt.y+.25,xt.z),o,U,5,Ua.kayu),ze(mt,new Js(.04,.16,4).translate(xt.x,xt.y+.98,xt.z),o,U,5,Ua.besi),h.push({name:"prajurit",data:mt,table:ct.table,map:at[0].material.map,tint:new zt(1,.86,.68)})}const p=tp(o,7),y=[],v=G=>h.findIndex(ct=>ct.name===G),_=Pf.map(v).filter(G=>G>=0),A=()=>_[Math.floor(Math.random()*_.length)],w={penjaga:"prajurit",raja:"raja",pendeta:"male-e"};for(const G of e){let ct=w[G.role]?v(w[G.role]):A();ct<0&&(ct=A()),y.push({type:ct,fixed:!0,role:G.role,x:G.x,z:G.z,y:G.y??null,heading:G.rot,homeHeading:G.rot,anim:G.anim,clip:G.anim,t:Math.random()*3,prev:null,prevT:0,fade:0})}const C={rendah:120,sedang:220,tinggi:320}[n.level]??220,z=t.nodes.filter(G=>G.links.length),b=[];for(const G of z)for(const ct of G.links)G.id<ct.id&&b.push([G,ct,Math.hypot(ct.x-G.x,ct.z-G.z)]);const E=([G,ct,at])=>at*(Math.max(G.x,ct.x)<-415&&Math.max(G.z,ct.z)<145&&Math.min(G.z,ct.z)>-65&&Math.min(G.x,ct.x)>-705?3:1),I=b.reduce((G,ct)=>G+E(ct),0);for(let G=0;G<C&&b.length;G++){let ct=Math.random()*I,at=b[0];for(const ft of b)if(ct-=E(ft),ct<=0){at=ft;break}const[mt,U,xt]=Math.random()<.5?at:[at[1],at[0],at[2]];y.push({type:A(),fixed:!1,from:mt,to:U,len:xt,s:Math.random()*xt,side:Math.random()<.5?-1:1,lat:.6+Math.random()*1.4,speed:.95+Math.random()*.55,pause:0,x:mt.x,z:mt.z,y:null,heading:0,clip:"walk",anim:"walk",t:Math.random(),prev:null,prevT:0,fade:0,init:!0})}const X=h.map(()=>0);for(const G of y)X[G.type]++;const W=h.map((G,ct)=>{const at=Qd(G.data),mt=Math.max(1,X[ct]),U=new ui(new Float32Array(mt*4),4).setUsage(Hi),xt=new ui(new Float32Array(mt*4),4).setUsage(Hi);at.setAttribute("aAnimA",U),at.setAttribute("aAnimB",xt);const ft=new Yn({map:G.map});ft.onBeforeCompile=Bt=>fl(Bt,p);const yt=new rr(at,ft,mt);yt.name=`penduduk-${G.name}`,yt.instanceMatrix.setUsage(Hi),yt.frustumCulled=!1,yt.castShadow=n.shadows,yt.receiveShadow=n.shadows;const vt=new Il({depthPacking:Tl});if(vt.onBeforeCompile=Bt=>fl(Bt,p),yt.customDepthMaterial=vt,G.tint)for(let Bt=0;Bt<mt;Bt++)yt.setColorAt(Bt,G.tint);return yt.count=0,a.add(yt),{mesh:yt,animA:U,animB:xt,table:G.table}});function q(G,ct){G.clip!==ct&&(G.prev=G.clip,G.prevT=G.t,G.fade=Cf,G.clip=ct,G.t=0)}const M=(G,ct,at,mt,U)=>ep(G[ct]||G.idle,at,mt,U),S=(G,ct,at)=>G+Math.atan2(Math.sin(ct-G),Math.cos(ct-G))*at;function R(G,ct,at){const mt=at.x-G.x,U=at.z-G.z,xt=Math.hypot(mt,U);if(xt<Na){G.greeted?G.clip==="wave"&&G.t>.7&&q(G,"idle"):(G.greeted=!0,q(G,"wave")),G.heading=S(G.heading,Math.atan2(mt,U),Math.min(1,ct*6));return}if(xt>Na+2.5&&(G.greeted=!1),G.pause>0){G.pause-=ct,q(G,"idle");return}if(q(G,"walk"),G.s+=G.speed*ct,G.s>=G.len){const J=G.to,st=J.links.filter(ut=>ut!==G.from),ht=st.length?st[Math.floor(Math.random()*st.length)]:G.from;G.s-=G.len,G.from=J,G.to=ht,G.len=Math.max(.1,Math.hypot(ht.x-J.x,ht.z-J.z)),Math.random()<.12&&(G.pause=2+Math.random()*5)}const ft=(G.to.x-G.from.x)/G.len,yt=(G.to.z-G.from.z)/G.len,vt=Math.min(1,G.s/G.len),Bt=G.side*Math.min(G.lat,Math.max(0,(G.from.w.get(G.to.id)??5)/2-.9)),Et=G.from.x+(G.to.x-G.from.x)*vt-yt*Bt,D=G.from.z+(G.to.z-G.from.z)*vt+ft*Bt;G.init&&(G.x=Et,G.z=D,G.heading=Math.atan2(ft,yt),G.init=!1);const L=1-Math.exp(-6*ct);G.x+=(Et-G.x)*L,G.z+=(D-G.z)*L,G.heading=S(G.heading,Math.atan2(ft,yt),Math.min(1,ct*5))}function T(G,ct,at){const mt=at.x-G.x,U=at.z-G.z,xt=Math.hypot(mt,U),ft=G.role==="penjaga";xt<(ft?4:Na)&&G.anim!=="sit"?(!ft&&!G.greeted?(G.greeted=!0,q(G,"wave")):G.clip==="wave"&&G.t>.7&&q(G,"idle"),G.heading=S(G.heading,Math.atan2(mt,U),Math.min(1,ct*5))):(xt>Na+2.5&&(G.greeted=!1),q(G,G.anim),G.heading=S(G.heading,G.homeHeading,Math.min(1,ct*3)))}const k=new Yr,F=new Ut,P=new ln(new B,1.6),N=new _e,j=new B,H=new B(rc,rc,rc),V=new B(0,1,0);let tt=0;const Y={x:0,z:0};function K(G,ct,at,mt,U=110){Y.x=mt?mt.x:1e9,Y.z=mt?mt.z:1e9,ct.updateMatrixWorld(),F.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),k.setFromProjectionMatrix(F);for(const ft of W)ft.mesh.count=0;tt=0;const xt=U*U;for(const ft of y){ft.fixed?T(ft,G,Y):R(ft,G,Y);const yt=ft.clip==="walk"?(ft.speed||1)/Tb:1;ft.t+=G*yt,ft.fade>0&&(ft.fade=Math.max(0,ft.fade-G),ft.prevT+=G);const vt=ft.x-at.x,Bt=ft.z-at.z;if(vt*vt+Bt*Bt>xt)continue;const Et=ft.y??i.surfaceAt(ft.x,ft.z);if(P.center.set(ft.x,Et+.8,ft.z),!k.intersectsSphere(P))continue;const D=W[ft.type],L=D.mesh.count++;j.set(ft.x,Et,ft.z),N.setFromAxisAngle(V,ft.heading),D.mesh.setMatrixAt(L,Rb.compose(j,N,H));const J=D.animA.array;M(D.table,ft.clip,ft.t,J,L*4),J[L*4+3]=ft.fade>0?ft.fade/Cf:0,ft.fade>0&&M(D.table,ft.prev,ft.prevT,D.animB.array,L*4),tt++}for(const ft of W)ft.mesh.count&&(ft.mesh.instanceMatrix.needsUpdate=!0,ft.animA.needsUpdate=!0,ft.animB.needsUpdate=!0)}function it(G,ct=.35){for(const at of y){const mt=G.x-at.x,U=G.z-at.z,xt=ct+Eb,ft=mt*mt+U*U;if(ft>=xt*xt||ft<1e-8)continue;const yt=Math.sqrt(ft);G.x=at.x+mt/yt*xt,G.z=at.z+U/yt*xt}}return{object:a,agents:y,update:K,pushOut:it,stats:()=>({total:y.length,fixed:y.filter(G=>G.fixed).length,visible:tt,jenis:h.length})}}const Ws=2.3,np=15,ka=1,Er=16,os={first:.349,step:.349,count:4},Rr=16,If={rendah:{near:70,reach:12,view:32,cell:56},sedang:{near:160,reach:16,view:42,cell:80},tinggi:{near:320,reach:22,view:55,cell:112}},Gn=(i,t)=>[(i+.5)/8,(t+.5)/8],cn={kayu:Gn(6,6),kayuTua:Gn(6,7),besi:Gn(3,6),putih:Gn(4,6),emas:Gn(2,4),emasTua:Gn(2,5),ungu:Gn(7,4)},Lf=[[4,4],[5,4],[1,4],[2,4],[4,6],[7,4]],Os=[{id:"perisai",hold:{4:"holding-left"},size:2.5,center:1.05,blob:[.55,.55]},{id:"tombak",hold:{},size:3.4,center:1.5,blob:[.5,.5]},{id:"pedang",hold:{5:"holding-right"},size:2.6,center:1.15,blob:[.5,.5]},{id:"pemanah",hold:{4:"holding-left"},size:2.5,center:1.05,blob:[.5,.5]},{id:"kavaleri",mounted:!0,size:4.6,center:1.85,blob:[.48,1.35]},{id:"senapati",mounted:!0,size:5,center:2,blob:[.48,1.35],always:!0}],Vi=new Ut,cs=new _e,nu=new B,Xr=new B(0,1,0);function Df(i,[t,e]){for(let n=0;n<i.uv.length;n+=2){const s=Math.floor(i.uv[n]*8),r=Math.floor(i.uv[n+1]*8);s===4&&(r===4||r===5)&&(i.uv[n]=(t+.5)/8,i.uv[n+1]=(e+(r-4)+.5)/8)}}function ns(i,t,e,n=e){const s=i.distanceTo(t),r=new jn(e,s,n);return cs.setFromUnitVectors(Xr,nu.subVectors(t,i).normalize()),r.applyMatrix4(Vi.compose(i.clone().add(t).multiplyScalar(.5),cs,new B(1,1,1)))}function Pb(i,t){t.updateMatrixWorld(!0);const e=i.geometry.clone();return e.applyMatrix4(Vi.copy(t.matrixWorld).invert().multiply(i.matrixWorld)),e}function Ib(i,t,e){const n=Ql(i.model),s=[];n.traverse(u=>{u.isSkinnedMesh&&s.push(u)});const{map:r}=s[0].material,a=i.model.userData.sword?(()=>{let u=null;return i.model.userData.sword.traverse(h=>{!u&&h.isMesh&&(u=h)}),u})():null,o=[],c=(u,h,d)=>new B(d===5?-.265:.265,0,.068).applyMatrix4(u.boneInverses[d].clone().invert()).applyMatrix4(fi(e,h,d));for(let u=0;u<4;u++){const h=Os[u],d=no(n,i.clips,e,{idle:{clip:"idle",hold:h.hold}}),f=d.table.idle,{row:g}=f,x=kr(s);if(Df(x,Lf[u]),h.id==="perisai"){const m=c(d.skeleton,g,4),p=t.shieldRect.clone().scale(1.5,1.5,1.5);p.translate(m.x+.02,m.y-.22,m.z+.07),ze(x,p,e,g,4,null)}else if(h.id==="tombak"){const m=c(d.skeleton,g,5),p=Math.max(.02,m.y-.42);ze(x,new Ve(.017,.017,m.y+1.05-p,5).translate(m.x,(p+m.y+1.05)/2,m.z),e,g,5,cn.kayu),ze(x,new Js(.045,.18,4).translate(m.x,m.y+1.14,m.z),e,g,5,cn.besi),ze(x,new Ve(.03,.03,.04,5).translate(m.x,m.y+1.04,m.z),e,g,5,cn.emas)}else if(h.id==="pedang"&&a){const m=c(d.skeleton,g,5),p=a.geometry.clone();p.applyMatrix4(Vi.makeRotationX(Math.PI-.25)),p.translate(m.x,m.y+.02,m.z),ze(x,p,e,g,5,null)}else if(h.id==="pemanah"){const m=c(d.skeleton,g,4),p=6,y=[];for(let b=0;b<=p;b++){const E=-.36+.72*b/p;y.push(new B(m.x,m.y+E,m.z+.02-.1*(E/.36)**2))}for(let b=0;b<p;b++)ze(x,ns(y[b],y[b+1],.026,.034),e,g,4,cn.kayuTua);ze(x,ns(y[0],y[p],.008),e,g,4,cn.putih);const v=3,_=new B(.07,.2,-.17),A=new B(.13,.42,-.2),w=fi(e,g,v),C=_.clone().applyMatrix4(w),z=A.clone().applyMatrix4(w);ze(x,ns(C,z,.09,.07),e,g,v,cn.kayuTua);for(let b=0;b<4;b++){const E=new B(b%2*.03-.015,0,Math.floor(b/2)*.025-.012);ze(x,ns(z.clone().add(E),z.clone().add(E).add(new B(.025,.09,-.01)),.016,.03),e,g,v,b%2?cn.putih:cn.emas)}}o.push({...h,data:x,clip:f,map:r})}const l=Lb(n,i.clips,t,e);for(let u=4;u<6;u++){const h=Os[u],d=kr(s);Df(d,Lf[u]);const{row:f}=l.clip;l.parts.forEach((m,p)=>{const y=m.geometry.clone();if(h.id==="senapati"){const{uv:v}=y.attributes;for(let _=0;_<v.count;_++){const A=Math.floor(v.getX(_)*8),w=Math.floor(v.getY(_)*8);A===1&&w===7||v.setXY(_,...A===1?Gn(4,7):Gn(4,6))}}ze(d,y.applyMatrix4(fi(e,f,7+p)),e,f,7+p,null)});const g=new jn(.34,.03,.36).translate(0,l.backY+.012,0);ze(d,g.applyMatrix4(fi(e,f,7)),e,f,7,h.id==="senapati"?cn.ungu:Gn(4,4));const x=l.hand;if(h.id==="kavaleri"){const m=new B(x.x,x.y-.4,x.z-.08),p=new B(x.x,x.y+1.6,x.z+.28);ze(d,ns(m,p,.032),e,f,5,cn.kayu);const y=p.clone().add(nu.subVectors(p,m).normalize().multiplyScalar(.12));ze(d,ns(p,y,.06,.02),e,f,5,cn.besi)}else{const m=new B(x.x,x.y-.3,x.z),p=new B(x.x,x.y+1.9,x.z);ze(d,ns(m,p,.035),e,f,5,cn.emasTua),ze(d,new jn(.01,.42,.34).translate(x.x,x.y+1.62,x.z-.18),e,f,5,cn.ungu),ze(d,new Js(.05,.14,4).translate(x.x,x.y+1.97,x.z),e,f,5,cn.emas)}o.push({...h,data:d,clip:l.clip,map:r})}return o}function Lb(i,t,e,n){const s=[],r=no(i,t,s,{drive:{clip:"drive"}}),{skeleton:a}=r,{horse:o}=e,c=new Ut().compose(new B(0,0,0),new _e().setFromAxisAngle(Xr,Math.PI/2),new B(ka,ka,ka)),l={};o.traverse(A=>{l[A.name]=A});const u=["torso","leg-back-left","leg-back-right","leg-front-left","leg-front-right","neck","head","tail"],h={};for(const A of["neck","head","tail"])h[A]=l[A].quaternion.clone();const d=A=>(o.updateMatrixWorld(!0),c.clone().multiply(Vi.copy(o.matrixWorld).invert().multiply(l[A].matrixWorld))),f=u.map(d),g=(.25+.312)*ka,x=new B(0,.17625,-.02375).applyMatrix4(fi(s,r.table.drive.row,3)),m=new Ut().makeTranslation(0,g+.035-x.y,-.02-x.z),p=90,y=n.length;for(let A=0;A<p;A++){const w=A/p*Math.PI*2;l.neck.quaternion.copy(h.neck).multiply(cs.setFromAxisAngle(new B(0,0,1),.07*Math.sin(w))),l.head.quaternion.copy(h.head).multiply(cs.setFromAxisAngle(new B(0,0,1),.06*Math.sin(w+.8))),l.tail.quaternion.copy(h.tail).multiply(cs.setFromAxisAngle(Xr,.3*Math.sin(w*2)));const C=new Float32Array(np*12),z=s[r.table.drive.row+A%r.table.drive.n];for(let b=0;b<7;b++)Vi.set(z[b*12],z[b*12+1],z[b*12+2],z[b*12+3],z[b*12+4],z[b*12+5],z[b*12+6],z[b*12+7],z[b*12+8],z[b*12+9],z[b*12+10],z[b*12+11],0,0,0,1),hl(m.clone().multiply(Vi),C,b*12);u.forEach((b,E)=>{hl(d(b).multiply(f[E].clone().invert()),C,(7+E)*12)}),n.push(C)}for(const A of["neck","head","tail"])l[A].quaternion.copy(h[A]);const v=u.map((A,w)=>({geometry:l[A].geometry.clone().applyMatrix4(f[w])})),_=new B(-.265,0,.068).applyMatrix4(a.boneInverses[5].clone().invert()).applyMatrix4(fi(n,y,5));return{clip:{row:y,n:p,loop:!0},parts:v,hand:_,backY:g}}function Db(i,t,e,n){const s=Er*os.count,r=t.length*s,a=Math.ceil(r/Rr),o=new gi(Rr*n,a*n,{colorSpace:Ne,depthBuffer:!1,generateMipmaps:!0,minFilter:pn,magFilter:Fe});o.texture.name="atlas-prajurit";const c=new gi(n,n,{colorSpace:Ne,samples:4}),l=new Ka;l.add(new Dd(e.hemi.color,e.hemi.groundColor,e.hemi.intensity));const u=new Vl(e.sun.color,e.sun.intensity);u.position.copy(e.sunDir).multiplyScalar(50),l.add(u,u.target);const h=new ro(-1,1,1,-1,1,80),d=new ne(new bn(2,2),new kn({uniforms:{uMap:{value:c.texture}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main() { gl_FragColor = texture2D(uMap, vUv); }",depthTest:!1,depthWrite:!1}));d.frustumCulled=!1;const f=new Ka;f.add(d);const g=i.getRenderTarget(),x=i.getClearColor(new zt),m=i.getClearAlpha(),p=i.shadowMap.autoUpdate;i.shadowMap.autoUpdate=!1,i.setClearColor(4866104,0),i.setRenderTarget(o),i.clear(),o.texture.generateMipmaps=!1,o.scissorTest=!0,t.forEach((_,A)=>{const{mesh:w,type:C}=_,{parent:z}=w;l.add(w),w.count=1,w.setMatrixAt(0,Vi.compose(nu.set(0,0,0),cs.setFromAxisAngle(Xr,ll),new B(Ws,Ws,Ws))),w.instanceMatrix.needsUpdate=!0,_.anim.array.set([C.clip.row,C.clip.row,0,0],0),_.anim.needsUpdate=!0;const b=C.size/2;h.left=-b,h.right=b,h.top=b,h.bottom=-b,h.updateProjectionMatrix();for(let E=0;E<os.count;E++){const I=os.first+E*os.step;for(let X=0;X<Er;X++){const W=ll+X/Er*Math.PI*2;h.position.set(Math.sin(W)*Math.cos(I)*40,C.center+Math.sin(I)*40,Math.cos(W)*Math.cos(I)*40),h.lookAt(0,C.center,0),i.setRenderTarget(c),i.clear(),i.render(l,h);const q=A*s+E*Er+X;o.viewport.set(q%Rr*n,Math.floor(q/Rr)*n,n,n),o.scissor.copy(o.viewport),i.setRenderTarget(o),i.render(f,h)}}w.count=0,z.add(w)}),o.scissorTest=!1,o.viewport.set(0,0,o.width,o.height),o.scissor.set(0,0,o.width,o.height),o.texture.generateMipmaps=!0;const y=new Ka,{autoClear:v}=i;return i.autoClear=!1,i.setRenderTarget(o),i.render(y,h),i.autoClear=v,i.setRenderTarget(g),i.setClearColor(x,m),i.shadowMap.autoUpdate=p,c.dispose(),d.geometry.dispose(),d.material.dispose(),{texture:o.texture,target:o,rows:a,per:s}}const zb=`
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
`;function Nb({ground:i,plan:t,quality:e,soldier:n,bala:s,renderer:r,env:a}){const{army:o}=t,c=o.soldiers,l=If[e.level]??If.sedang,u=new Ce;u.name="bala-tentara";const h=performance.now(),d=[],f=Ib(n,s,d),g=tp(d,np),x=Os.map(()=>0);for(let D=0;D<c.count;D++)x[c.type[D]]++;const m=f.map((D,L)=>{const J=Qd(D.data),st=Math.max(1,Math.min(x[L],l.near+64)),ht=new ui(new Float32Array(st*4),4).setUsage(Hi);J.setAttribute("aAnimA",ht),J.setAttribute("aAnimB",new ui(new Float32Array(st*4),4));const ut=new Yn({map:D.map});ut.onBeforeCompile=Mt=>fl(Mt,g);const At=new rr(J,ut,st);return At.name=`prajurit-${D.id}`,At.instanceMatrix.setUsage(Hi),At.frustumCulled=!1,At.castShadow=!1,At.receiveShadow=!1,At.count=0,u.add(At),{mesh:At,anim:ht,type:D,cap:st}}),p=performance.now(),y=Db(r,m.filter(D=>!D.type.always),a,l.cell),v=performance.now(),_=new Float32Array(c.count*3),A=new Float32Array(c.count*2);for(let D=0;D<c.count;D++)_[D*3]=c.x[D],_[D*3+1]=i.heightAt(c.x[D],c.z[D]),_[D*3+2]=c.z[D],A[D*2]=c.type[D],A[D*2+1]=o.heading;const w=new ui(_,3),C=new ui(A,2),z=new bn(1,1),b=new el;b.index=z.index,b.setAttribute("position",z.attributes.position),b.setAttribute("uv",z.attributes.uv),b.setAttribute("aPos",w),b.setAttribute("aInfo",C),b.instanceCount=o.total;const E=o.bounds,I=new ln(new B((E.x0+E.x1)/2,_[1]+2,(E.z0+E.z1)/2),Math.hypot(E.x1-E.x0,E.z1-E.z0)/2+6);b.boundingSphere=I;const X={uCamPos:{value:new B},uCamRight:{value:new B(1,0,0)},uCamUp:{value:new B(0,1,0)},uLod:{value:new ee(1e9,1e9,0,0)},uType:{value:Os.map((D,L)=>new ee(D.size,D.center,L*y.per,0))},uAtlas:{value:new ee(Rr,y.rows,Er,0)},uPitch:{value:new B(os.first,os.step,os.count)}},W=new je({map:y.texture,alphaToCoverage:!0});W.onBeforeCompile=D=>{Object.assign(D.uniforms,X),D.vertexShader=zb+D.vertexShader.replace("#include <uv_vertex>",`
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
      `)},e.level!=="rendah"&&(W.defines={IMPOSTOR_BLEND:""});const q=new ne(b,W);q.name="prajurit-impostor",u.add(q);const M=new bn(2,2).rotateX(-Math.PI/2),S=new el;S.index=M.index,S.setAttribute("position",M.attributes.position),S.setAttribute("aPos",w),S.setAttribute("aInfo",C),S.instanceCount=c.count,S.boundingSphere=I;const R={value:Os.map(D=>new St(...D.blob))},T=new je({color:0,transparent:!0,opacity:.32,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});T.onBeforeCompile=D=>{D.uniforms.uBlob=R,D.vertexShader=`attribute vec3 aPos;
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
#include <opaque_fragment>`)};const k=new ne(S,T);k.name="prajurit-bayangan",k.renderOrder=1,u.add(k);const F=8,P=o.bounds.x0-4,N=o.bounds.z0-4,j=Math.ceil((o.bounds.x1+4-P)/F),H=Math.ceil((o.bounds.z1+4-N)/F),V=new Int32Array(j*H+1),tt=D=>Math.floor((c.x[D]-P)/F)+Math.floor((c.z[D]-N)/F)*j;for(let D=0;D<c.count;D++)V[tt(D)+1]++;for(let D=0;D<j*H;D++)V[D+1]+=V[D];const Y=V.slice(0,j*H),K=new Int32Array(c.count);for(let D=0;D<c.count;D++)K[Y[tt(D)]++]=D;const it=new Int32Array(4096),G=new Float32Array(4096),ct=new Int32Array(4096),at=new Int32Array(l.near+64);let mt=0,U=0;const xt=new B,ft=new B(Ws,Ws,Ws);function yt(D,L,J){U+=D,L.updateMatrixWorld();const st=L.matrixWorld.elements;X.uCamRight.value.set(st[0],st[1],st[2]),X.uCamUp.value.set(st[4],st[5],st[6]),X.uCamPos.value.set(st[12],st[13],st[14]);const ht=Math.max(E.x0-st[12],0,st[12]-E.x1),ut=Math.max(E.z0-st[14],0,st[14]-E.z1);k.visible=ht*ht+ut*ut<120*120;let At=0;const Mt=l.reach,Dt=st[12],dt=st[13],pt=st[14],_t=l.view*l.view,Ct=Math.max(0,Math.floor((J.x-Mt-P)/F)),Nt=Math.min(j-1,Math.floor((J.x+Mt-P)/F)),Tt=Math.max(0,Math.floor((J.z-Mt-N)/F)),jt=Math.min(H-1,Math.floor((J.z+Mt-N)/F));for(let Gt=Tt;Gt<=jt;Gt++)for(let Z=Ct;Z<=Nt;Z++){const wt=Z+Gt*j;for(let lt=V[wt];lt<V[wt+1]&&At<it.length;lt++){const gt=K[lt];if(gt>=o.total)continue;const It=c.x[gt]-J.x,Pt=c.z[gt]-J.z,Yt=It*It+Pt*Pt;if(Yt>Mt*Mt)continue;const Me=c.x[gt]-Dt,Ue=_[gt*3+1]+1-dt,ae=c.z[gt]-pt;Me*Me+Ue*Ue+ae*ae>_t||(it[At]=gt,G[At]=Yt,At++)}}let Wt=Mt*Mt;if(mt=0,At>l.near){for(let Z=0;Z<At;Z++)ct[Z]=Z;const Gt=ct.subarray(0,At).sort((Z,wt)=>G[Z]-G[wt]);Wt=G[Gt[l.near-1]];for(let Z=0;Z<At&&mt<at.length;Z++)G[Z]<=Wt&&(at[mt++]=it[Z])}else for(let Gt=0;Gt<At;Gt++)at[mt++]=it[Gt];X.uLod.value.set(J.x,J.z,mt?Wt*.999:0,_t*.999);for(const Gt of m)Gt.mesh.count=0;for(let Gt=o.total;Gt<c.count;Gt++)vt(Gt);for(let Gt=0;Gt<mt;Gt++)vt(at[Gt]);for(const Gt of m)Gt.mesh.count&&(Gt.mesh.instanceMatrix.needsUpdate=!0,Gt.anim.needsUpdate=!0)}function vt(D){const L=m[c.type[D]];if(L.mesh.count>=L.cap)return;const J=L.mesh.count++;xt.set(c.x[D],_[D*3+1],c.z[D]),L.mesh.setMatrixAt(J,Vi.compose(xt,cs.setFromAxisAngle(Xr,o.heading),ft)),ep(L.type.clip,U+c.phase[D]*7.3,L.anim.array,J*4),L.anim.array[J*4+3]=0}const Bt=ci.map((D,L)=>({id:D.id,name:D.name,count:x[L]})),Et={rangka:Math.round(p-h),atlas:Math.round(v-p),sisanya:Math.round(performance.now()-v)};return{object:u,update:yt,atlas:y,stats:()=>({total:o.total,perwira:x[5],pasukan:Bt,dekat:mt,impostor:o.total-mt,atlas:`${y.target.width}×${y.target.height}`,waktu:Et}),soldier:D=>({x:c.x[D],z:c.z[D],type:Os[c.type[D]].id}),count:c.count}}function Ub(i){const t=i.scene.getObjectByName("kuda"),e=i.scene.getObjectByName("shield-rectangle");return{horse:t,shieldRect:Pb(e,i.scene)}}const dn=2,kb=[{text:"Pulau Tropis",x:10,z:-175,size:15},{text:"Gunung",x:70,z:-48,size:11},{text:"Kotaraja Kencana",x:-560,z:-78,size:14},{text:"Pulau Kencana",x:-560,z:222,size:13},{text:"Pulau Sawah",x:-660,z:-425,size:13},{text:"Pulau Nelayan",x:-760,z:452,size:13},{text:"Pura Segara",x:-890,z:58,size:12},{text:"Jembatan Agung",x:-252,z:24,size:11},{text:"Pelabuhan",x:-553,z:236,size:11},{text:"Pulau Wira",x:-270,z:620,size:14},{text:"Tegal Wira · 25.000 prajurit",x:-270,z:352,size:11}],xn=(i,t,e)=>i+(t-i)*e,ac=i=>Math.min(1,Math.max(0,i));function Ob(i,t,e,n){if(zr(i,t,Gd))return{id:"keraton",name:"Keraton Kencana",sub:"Istana Raja Kencana"};if(zr(i,t,ye,1))return{id:"kotaraja",name:"Kotaraja Kencana",sub:"Ibu kota Kerajaan Kencana"};if(zr(i,t,xi))return{id:"tegal",name:"Tegal Wira",sub:"25.000 prajurit Kencana siap tempur"};for(const o of n){const c=o.axis==="x"?i:t,l=o.axis==="x"?t:i;if(Math.abs(l-o.at)<o.width&&c>Math.min(o.a,o.b)&&c<Math.max(o.a,o.b))return{id:`jembatan-${o.id}`,name:o.name,sub:o.id==="agung"?"Penghubung Pulau Tropis dan Kerajaan Kencana":"Kepulauan Kencana"}}if(e.heightAt(i,t)<-1.2)return null;if(Math.hypot(i,t)<340)return{id:"tropis",name:"Pulau Tropis",sub:"Pulau tengah"};let s=null,r=1/0;for(const o of ho){const c=ql(o,i,t);c<r&&(r=c,s=o)}if(!s||r>1.35)return null;const a={kencana:"Kepulauan Kencana",sawah:"Lumbung padi kerajaan",nelayan:"Kampung nelayan",pura:"Pura di puncak bukit",wira:"Markas bala tentara Kencana"};return{id:s.id,name:s.id==="pura"?"Pura Segara":s.name,sub:a[s.id]}}function Fb(i,t,e){let n,s,r;if(i<0){const a=ac(-i/14);n=xn(86,22,a),s=xn(205,78,a),r=xn(200,140,a)}else if(i<2.2)n=226,s=208,r=156;else if(i<40){const a=ac((i-2.2)/38);n=xn(104,64,a),s=xn(168,118,a),r=xn(72,52,a)}else{const a=ac((i-40)/40);n=xn(120,196,a),s=xn(118,190,a),r=xn(100,182,a)}if(t){const a=(o,c,l,u)=>{n=xn(n,c,o),s=xn(s,l,o),r=xn(r,u,o)};a(t.rumput,120,196,84),a(t.sawah,168,210,80),a(t.jalan,214,184,132),a(t.batu,214,208,196)}e[0]=n,e[1]=s,e[2]=r}function Bb({ground:i,plan:t,region:e,camps:n=[]}){const s=document.getElementById("peta"),r=document.getElementById("peta-kanvas"),a=r.getContext("2d"),o=Math.round(Xt.width/dn),c=Math.round(Xt.depth/dn);let l=null;const u=x=>(x-Xt.minX)/dn,h=x=>(x-Xt.minZ)/dn;function d(){var v;const x=document.createElement("canvas");x.width=o,x.height=c;const m=x.getContext("2d"),p=m.createImageData(o,c),y=[0,0,0];for(let _=0;_<c;_++)for(let A=0;A<o;A++){const w=Xt.minX+(A+.5)*dn,C=Xt.minZ+(_+.5)*dn;Fb(i.heightAt(w,C),e.at(w,C),y);const z=(_*o+A)*4;p.data[z]=y[0],p.data[z+1]=y[1],p.data[z+2]=y[2],p.data[z+3]=255}m.putImageData(p,0,0),m.fillStyle="rgba(120, 52, 36, 0.85)";for(const _ of t.blocked)m.save(),m.translate(u(_.x),h(_.z)),m.rotate(-(_.rot||0)),m.fillRect(-_.hx/dn,-_.hz/dn,2*_.hx/dn,2*_.hz/dn),m.restore();for(const _ of((v=t.army)==null?void 0:v.blocks)??[])m.fillStyle=ci[_.type].map,m.fillRect(u(_.x0),h(_.z0),(_.x1-_.x0)/dn,(_.z1-_.z0)/dn);m.strokeStyle="#f4efe2",m.lineCap="butt";for(const _ of t.spans)m.lineWidth=Math.max(2,_.width/dn),m.beginPath(),_.axis==="x"?(m.moveTo(u(_.a),h(_.at)),m.lineTo(u(_.b),h(_.at))):(m.moveTo(u(_.at),h(_.a)),m.lineTo(u(_.at),h(_.b))),m.stroke();l=x}function f(x,m,p,y,v){a.font=`600 ${Math.round(y*v)}px system-ui, sans-serif`,a.textAlign="center",a.textBaseline="middle",a.lineWidth=3*v,a.strokeStyle="rgba(0, 30, 45, 0.85)",a.strokeText(x,m,p),a.fillStyle="#fff",a.fillText(x,m,p)}function g(x,m){l||d();const p=r.getBoundingClientRect(),y=Math.min(2,window.devicePixelRatio||1);r.width=Math.round(p.width*y),r.height=Math.round(p.height*y);const v=r.width/o;a.imageSmoothingEnabled=!0,a.drawImage(l,0,0,r.width,r.height);const _=Math.max(.8,r.width/900);for(const E of n)a.fillStyle="#e8483a",a.beginPath(),a.arc(u(E.x)*v,h(E.z)*v,4*_,0,Math.PI*2),a.fill();for(const E of kb)f(E.text,u(E.x)*v,h(E.z)*v,E.size,_);const A=u(x.x)*v,w=h(x.z)*v,C=Math.sin(m),z=Math.cos(m),b=9*_;a.fillStyle="#ffe14a",a.strokeStyle="#1a1206",a.lineWidth=2*_,a.beginPath(),a.moveTo(A+C*b*1.4,w+z*b*1.4),a.lineTo(A-z*b*.8-C*b*.7,w+C*b*.8-z*b*.7),a.lineTo(A-C*b*.25,w-z*b*.25),a.lineTo(A+z*b*.8-C*b*.7,w-C*b*.8-z*b*.7),a.closePath(),a.fill(),a.stroke(),f("Kamu",A,w+17*_,11,_)}return{get open(){return!s.hidden},show(x,m){s.hidden=!1,g(x,m)},hide(){s.hidden=!0},sample(x,m){l||d();const p=l.getContext("2d").getImageData(Math.floor(u(x)),Math.floor(h(m)),1,1).data;return[p[0],p[1],p[2]]},size:{width:o,height:c}}}function Hb({ground:i,spans:t}){const e=document.getElementById("wilayah"),n=e.querySelector(".wilayah-nama"),s=e.querySelector(".wilayah-ket");let r,a=null,o=0,c=0,l=0;return{get current(){return r},update(u,h,d=!0){if(c>0&&(c-=u,c<=0&&e.classList.remove("tampil")),(l-=u)>0)return!1;l=.25;const f=Ob(h.x,h.z,i,t),g=f?f.id:null;return r===void 0?(r=g,!1):g===(r??null)?(a=null,!1):!a||a.id!==g?(a={id:g,r:f},o=0,!1):(o+=.25,o<.5||(r=g,a=null,!f||!d)?!1:(n.textContent=f.name,s.textContent=f.sub,e.classList.add("tampil"),c=3.2,!0))}}}const Gb=12,zf={Digit1:"cincang",KeyQ:"cincang",Digit2:"hentak",KeyE:"hentak",Digit3:"putar",KeyR:"putar",Digit4:"penggal",KeyT:"penggal"},Vb=800;function Wb({canvas:i,jumpButton:t,attackButton:e,skillButtons:n,touch:s}){const r=new Set;let a=!0,o=!1,c=!1,l=null,u=0,h=1;const d=[],f=new Map;let g=0;function x(){const[A,w]=[...f.values()];return Math.hypot(A.x-w.x,A.y-w.y)}i.addEventListener("contextmenu",A=>A.preventDefault()),i.addEventListener("pointerdown",A=>{var w;if(a&&!(A.pointerType==="mouse"&&A.button!==0&&A.button!==2)){if(f.set(A.pointerId,{x:A.clientX,y:A.clientY,sx:A.clientX,sy:A.clientY,t:A.timeStamp,moved:A.pointerType==="mouse"&&A.button===2}),f.size===2){g=x();for(const C of f.values())C.moved=!0}(w=i.setPointerCapture)==null||w.call(i,A.pointerId)}}),i.addEventListener("pointermove",A=>{const w=f.get(A.pointerId);if(w&&(f.size===1&&(!w.moved&&Math.hypot(A.clientX-w.sx,A.clientY-w.sy)>Gb&&(w.moved=!0),w.moved&&(u+=A.clientX-w.x)),w.x=A.clientX,w.y=A.clientY,f.size===2)){const C=x();g>0&&C>0&&(h*=g/C),g=C}});function m(A,w){const C=f.get(A.pointerId);C&&(w&&a&&!C.moved&&A.timeStamp-C.t<Vb&&d.push({x:A.clientX,y:A.clientY}),f.delete(A.pointerId),g=f.size===2?x():0)}i.addEventListener("pointerup",A=>m(A,!0)),i.addEventListener("pointercancel",A=>m(A,!1)),i.addEventListener("lostpointercapture",A=>m(A,!1)),i.addEventListener("wheel",A=>{a&&(A.preventDefault(),h*=Math.exp(A.deltaY*.0012))},{passive:!1});function p(A,w){A.addEventListener("pointerdown",C=>{C.preventDefault(),C.stopPropagation(),a&&w(),A.classList.add("ditekan")});for(const C of["pointerup","pointercancel","pointerleave"])A.addEventListener(C,()=>A.classList.remove("ditekan"))}p(t,()=>{o=!0}),p(e,()=>{c=!0});for(const[A,w]of Object.entries(n))p(w,()=>{l=A});const y=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"];window.addEventListener("keydown",A=>{!a||A.target instanceof HTMLInputElement||(y.includes(A.code)&&A.preventDefault(),A.code==="Space"&&!A.repeat&&(o=!0),A.code==="KeyF"&&!A.repeat&&(c=!0),zf[A.code]&&!A.repeat&&(l=zf[A.code]),r.add(A.code))}),window.addEventListener("keyup",A=>r.delete(A.code));function v(){r.clear(),f.clear(),g=0}window.addEventListener("blur",v),document.addEventListener("visibilitychange",v);const _=(...A)=>A.some(w=>r.has(w));return{read(){let A=0,w=0;const C=_("KeyD","ArrowRight")-_("KeyA","ArrowLeft"),z=_("KeyW","ArrowUp")-_("KeyS","ArrowDown");if(C||z){const E=Math.hypot(C,z),I=_("ShiftLeft","ShiftRight")?.45:1;A=C/E*I,w=z/E*I}const b={moveX:A,moveY:w,jump:o,attack:c,skill:l,lookDX:u,zoom:h,taps:d.splice(0)};return o=!1,c=!1,l=null,u=0,h=1,b},setEnabled(A){a=A,A||v();for(const w of[t,e,...Object.values(n)])w.hidden=!A||!s}}}const Xb=.006,oc=10,Nf=60,jb=22,Uf=.85,Yb=1.12,Kb=.8,cc=.3;function qb(i,t){const e={yaw:0,dist:jb},n=new B,s=new B;let r=!0,a=0,o=0;const c=()=>Uf+(Yb-Uf)*(e.dist-oc)/(Nf-oc);return{state:e,get yaw(){return e.yaw},lookFrom(l,u=!0){e.yaw=l,r=u},shake(l){o=Math.max(o*(a/cc),l),a=cc},update(l,u,h){e.yaw-=h.lookDX*Xb,e.dist=di.clamp(e.dist*h.zoom,oc,Nf);const d=u.x,f=u.y+Kb,g=u.z;if(r)n.set(d,f,g);else{const y=1-Math.exp(-10*l);n.x+=(d-n.x)*y,n.z+=(g-n.z)*y,n.y+=(f-n.y)*(1-Math.exp(-5*l))}const x=c(),m=Math.cos(x);s.set(n.x+Math.sin(e.yaw)*m*e.dist,n.y+Math.sin(x)*e.dist,n.z+Math.cos(e.yaw)*m*e.dist);const p=Math.max(t.surfaceAt(s.x,s.z),0)+3;if(s.y<p&&(s.y=p),r?i.position.copy(s):i.position.lerp(s,1-Math.exp(-10*l)),a>0){a=Math.max(0,a-l);const y=2*o*(a/cc);i.position.x+=(Math.random()-.5)*y,i.position.y+=(Math.random()-.5)*y,i.position.z+=(Math.random()-.5)*y}i.lookAt(n),r=!1}}}function Zb(i,t){return new je({color:i,transparent:!0,opacity:t,depthTest:!1,depthWrite:!1,toneMapped:!1})}const kf=new B(0,1,0),lc=new B;function $b(i,t,e,n,s){const a=Math.max(t.surfaceAt(e,n),0);lc.set(-(t.surfaceAt(e+.6,n)-t.surfaceAt(e-.6,n))/(2*.6),1,-(t.surfaceAt(e,n+.6)-t.surfaceAt(e,n-.6))/(2*.6)).normalize(),a<=.001&&lc.copy(kf),i.position.set(e,a+s,n),i.quaternion.setFromUnitVectors(kf,lc)}function Jb(i){const t=new Ce,e=Zb("#ffe26a",.95),n=new ne(new co(.5,.72,40).rotateX(-Math.PI/2),e),s=new ne(new Fl(.15,20).rotateX(-Math.PI/2),e);t.add(n,s),t.visible=!1,t.renderOrder=10,n.renderOrder=10,s.renderOrder=10;let r=0,a=!1;return{objects:[t],showTarget(o,c,l=!0){$b(t,i,o,c,.06),e.color.set(l?"#ffe26a":"#ff5a5a"),e.opacity=.95,t.visible=!0,a=!l,r=0},hideTarget(){a||(t.visible=!1)},update(o){if(!t.visible)return;r+=o;const c=1+.14*Math.sin(r*7);n.scale.setScalar(c),a&&(e.opacity=Math.max(0,.95-r*1.2),r>.8&&(t.visible=!1,a=!1))}}}const br=60,Qb=12,Of={pohon:["#6b4423","#8a5a2e","#a8743f","#4f8f2f","#6fb03a"],batu:["#7d7a74","#a19d96","#c9c5bd","#ffd27a"],debu:["#d8c497","#c4ab7a","#a88f63","#e6d8b0"],bata:["#9c4a30","#b8603c","#7e3a26","#d9b48a"],kayu:["#6b4423","#8a5a2e","#a8743f","#c99a5f"],prajurit:["#c9cfdc","#eef1f7","#ffd27a","#8a5a2e"]},Oa=(i={})=>new je({transparent:!0,opacity:0,depthWrite:!1,side:en,toneMapped:!1,...i});function tS(i,t,e,n){const s=[],r=[],a=[];for(let c=0;c<=n;c++){const l=c/n,u=-i/2+i*l,h=Math.sin(Math.PI*l),d=t-e*h,f=Math.pow(h,.7);if(s.push(Math.sin(u)*t,0,Math.cos(u)*t,Math.sin(u)*d,0,Math.cos(u)*d),r.push(1,1,1,f,1,1,1,f*.15),c<n){const g=c*2;a.push(g,g+1,g+2,g+1,g+3,g+2)}}const o=new le;return o.setAttribute("position",new Vt(s,3)),o.setAttribute("color",new Vt(r,4)),o.setIndex(a),o}function eS(i){const t=[[.55,1,0],[.84,1,1],[1,.12,.55]],e=[],n=[],s=[];for(let a=0;a<=i;a++){const o=a/i*Math.PI*2;for(const[c,l,u]of t)e.push(Math.sin(o)*c,0,Math.cos(o)*c),n.push(l,l,l,u);if(a<i)for(let c=0;c<t.length-1;c++){const l=a*t.length+c,u=l+t.length;s.push(l,u,l+1,l+1,u,u+1)}}const r=new le;return r.setAttribute("position",new Vt(e,3)),r.setAttribute("color",new Vt(n,4)),r.setIndex(s),r}function nS(){const i=new le;return i.setAttribute("position",new Vt([-.5,0,0,.5,0,0,-.5,0,1,.5,0,1],3)),i.setAttribute("color",new Vt([1,1,1,0,1,1,1,0,1,1,1,.9,1,1,1,.9],4)),i.setIndex([0,1,2,1,3,2]),i}function iS(){const i=[],t=[],e=[];for(let r=0;r<=8;r++){const a=r/8,o=Math.sin(Math.PI*a);i.push(a-.5,0,-.04,a-.5,0,.04),t.push(1,1,1,o,1,1,1,o),r<8&&e.push(r*2,r*2+1,r*2+2,r*2+1,r*2+3,r*2+2)}const s=new le;return s.setAttribute("position",new Vt(i,3)),s.setAttribute("color",new Vt(t,4)),s.setIndex(e),s}const uc=9,sS=new _e().setFromAxisAngle(new B(1,0,0),Math.PI/2);function rS(i){const t=new Ce;t.name="efek-serangan";const e={slashes:0,spins:0,pulses:0,streaks:0,bursts:0,cracks:0,cuts:0,sparks:0,lastKind:null,lastMove:null};function n(M,S,R,T,k,F){const P=tS(S,R,T,40),N=Array.from({length:M},()=>{const H=Oa({vertexColors:!0}),V=new ne(P,H);return V.visible=!1,V.renderOrder=8,t.add(V),{mesh:V,mat:H,t:0,heading:0,dir:1,tilt:0}});let j=0;return{show(H,V,tt,Y,K=1,it=0){const G=N[j];j=(j+1)%M,G.mesh.position.set(H,V,tt),Object.assign(G,{t:0,heading:Y,dir:K,tilt:it}),G.mesh.visible=!0},update(H){for(const V of N){if(!V.mesh.visible)continue;V.t+=H;const tt=V.t/k;if(tt>=1){V.mesh.visible=!1;continue}V.mesh.rotation.set(V.tilt,V.heading+(tt-.5)*F*V.dir,0,"YXZ"),V.mesh.scale.setScalar(.85+.3*tt),V.mat.opacity=.95*Math.pow(1-tt,1.3)}}}}const s=n(4,Math.PI*.85,1.35,.6,.22,.9),r=n(1,Math.PI*1.85,2.3,1,.34,2.6),a=eS(48),o=Array.from({length:12},()=>{const M=Oa({vertexColors:!0}),S=new ne(a,M);return S.visible=!1,S.renderOrder=8,t.add(S),{mesh:S,mat:M,t:0,time:1,r0:0,r1:1,alpha:1}});let c=0;function l(M,S,R,T,k,F,P,N,j=null){const H=o[c];c=(c+1)%o.length,H.mesh.position.set(M,S,R),j?H.mesh.quaternion.copy(j).multiply(sS):H.mesh.quaternion.identity(),H.mat.color.set(P),Object.assign(H,{t:0,time:F,r0:T,r1:k,alpha:N}),H.mesh.scale.setScalar(T),H.mesh.visible=!0,e.pulses++}const u=nS(),h=Array.from({length:7},()=>{const M=Oa({vertexColors:!0}),S=new ne(u,M);return S.visible=!1,S.renderOrder=7,t.add(S),{mesh:S,mat:M,t:0}}),d=.5,f=Array.from({length:2},()=>{const M=new le;M.setAttribute("position",new Vt(new Float32Array(uc*9),3));const S=new je({color:"#2b1d12",transparent:!0,opacity:0,depthWrite:!1,side:en}),R=new ne(M,S);return R.visible=!1,R.frustumCulled=!1,R.renderOrder=6,t.add(R),{mesh:R,mat:S,t:0}});let g=0;const x=1.6;function m(M,S){const R=f[g];g=(g+1)%f.length;const T=R.mesh.geometry.attributes.position,k=.05;for(let F=0;F<uc;F++){const P=F/uc*Math.PI*2+(Math.random()-.5)*.5,N=1.3+Math.random()*1.6,j=.07+Math.random()*.05,H=M+Math.sin(P)*.15,V=S+Math.cos(P)*.15;[[H+Math.cos(P)*j,V-Math.sin(P)*j],[H-Math.cos(P)*j,V+Math.sin(P)*j],[M+Math.sin(P)*N,S+Math.cos(P)*N]].forEach(([Y,K],it)=>T.setXYZ(F*3+it,Y,Math.max(i.surfaceAt(Y,K),0)+k,K))}T.needsUpdate=!0,R.t=0,R.mesh.visible=!0,e.cracks++}const p=iS(),y=Array.from({length:5},()=>{const M=Oa({vertexColors:!0,depthTest:!1}),S=new ne(p,M);return S.visible=!1,S.renderOrder=14,t.add(S),{mesh:S,mat:M,t:0}});let v=0;const _=.4,A=new rr(new jn(.21,.21,.21),new je,br);A.instanceMatrix.setUsage(Hi),A.frustumCulled=!1,A.visible=!1,t.add(A);const w=Array.from({length:br},()=>({alive:!1,t:0,life:1,size:1,spin:1,floor:0,p:new B,v:new B})),C=new Te,z=new zt,b=new Ut().makeScale(0,0,0);for(let M=0;M<br;M++)A.setMatrixAt(M,b),A.setColorAt(M,z.set("#ffffff"));let E=0,I=0;function X(M,S,R,T,k,F,P,N){const j=Of[T]||Of.batu;for(let H=0;H<k;H++){const V=w[E];V.alive=!0,V.t=0,V.life=.45+Math.random()*.4,V.size=.6+Math.random()*.7,V.spin=(Math.random()-.5)*24,V.floor=N;const tt=F===null?Math.random()*Math.PI*2:F+(Math.random()-.5)*P,Y=1.5+Math.random()*3;V.p.set(M,S,R),V.v.set(Math.sin(tt)*Y,1.5+Math.random()*3.5,Math.cos(tt)*Y),A.setColorAt(E,z.set(j[H%j.length])),E=(E+1)%br}A.instanceColor.needsUpdate=!0,A.visible=!0,e.bursts++,e.lastKind=T}function W(M,S,R,T,k){const F=S-M.x,P=R-M.z,N=Math.hypot(F,P)||1,j=M.x+F/N*M.radius,H=M.z+P/N*M.radius;X(j,T,H,M.kind,k,Math.atan2(F,P),2.4,i.surfaceAt(j,H))}let q=new _e;return{object:t,stats:()=>({...e,alive:I}),attack(M,S=[],R=[]){const T=M.origin;if(e.lastMove=M.move,M.type==="dash"){const j=M.path;for(let H=0;H+1<j.length&&H<h.length;H++){const V=j[H],tt=j[H+1],Y=Math.hypot(tt.x-V.x,tt.z-V.z);if(Y<.3)continue;const K=h[H];K.mesh.position.set(V.x,M.y,V.z),K.mesh.rotation.y=Math.atan2(tt.x-V.x,tt.z-V.z),K.mesh.scale.set(.7,1,Y),K.mesh.visible=!0,K.t=-H*.04}e.streaks++;return}if(M.type!=="hit")return;const{x:k,y:F,z:P}=M;let N=14;if(M.chop)s.show(T.x,F,T.z,M.heading,M.swing,(Math.random()-.5)*.5),e.slashes++,N=6;else if(M.move==="tebas")s.show(T.x,F,T.z,M.heading),e.slashes++;else if(M.move==="tinju")l(k,F,P,.15,.7,.2,"#ffffff",1),N=8;else if(M.move==="tendang"){l(k,F,P,.2,.95,.24,"#ffe3a0",1);const j=i.surfaceAt(k,P);j>-.3&&X(k,Math.max(j,0)+.15,P,"debu",5,M.heading,1.6,j),N=10}else if(M.spin)r.show(T.x,F,T.z,M.heading),e.spins++,N=10;else if(M.plant){const j=i.surfaceAt(T.x,T.z),H=Math.max(j,0)+.08;m(M.plant.x,M.plant.z),l(M.plant.x,H+.05,M.plant.z,.1,1.2,.25,"#ffffff",1),l(T.x,H,T.z,.4,4,.5,"#fff6dc",.9),l(T.x,H+.02,T.z,.2,2.5,.35,"#ffffff",.7),X(M.plant.x,H+.1,M.plant.z,"debu",16,null,0,j),N=8}for(const j of S)W(j,T.x,T.z,M.plant?F+.5:F,N);for(const j of R)l(j.x,j.y+1,j.z,.1,.65,.16,"#fff3c0",1,q),e.sparks++},execute(M,S){for(const R of M){const T=y[v];v=(v+1)%y.length,T.mesh.position.set(R.x,R.y+.85,R.z),T.mesh.rotation.set(0,Math.atan2(R.x-S.x,R.z-S.z)+Math.PI/2+(Math.random()-.5)*.5,0),T.t=0,T.mesh.visible=!0,l(R.x,R.y+.85,R.z,.1,.8,.2,"#ffffff",1,q),e.cuts++}},update(M,S){S&&(q=S.quaternion),s.update(M),r.update(M);for(const R of o){if(!R.mesh.visible)continue;R.t+=M;const T=R.t/R.time;if(T>=1){R.mesh.visible=!1;continue}const k=1-Math.pow(1-T,3);R.mesh.scale.setScalar(R.r0+(R.r1-R.r0)*k),R.mat.opacity=R.alpha*(1-T)}for(const R of h){if(!R.mesh.visible)continue;R.t+=M;const T=Math.max(0,R.t)/d;T>=1?R.mesh.visible=!1:R.mat.opacity=.95*(1-T)}for(const R of f){if(!R.mesh.visible)continue;R.t+=M;const T=R.t/x;T>=1?R.mesh.visible=!1:R.mat.opacity=.75*Math.min(1,(1-T)*2.5)}for(const R of y){if(!R.mesh.visible)continue;R.t+=M;const T=R.t/_;if(T>=1){R.mesh.visible=!1;continue}R.mesh.scale.set(.5+1.1*Math.min(1,T*3),1,1+2*(1-T)),R.mat.opacity=Math.min(1,(1-T)*2)}if(A.visible){I=0;for(let R=0;R<br;R++){const T=w[R];if(T.alive){if(T.t+=M,T.t>=T.life){T.alive=!1,A.setMatrixAt(R,b);continue}I++,T.v.y-=Qb*M,T.p.addScaledVector(T.v,M),T.p.y<T.floor+.05&&(T.p.y=T.floor+.05,T.v.set(T.v.x*.5,0,T.v.z*.5)),C.position.copy(T.p),C.rotation.set(T.t*T.spin,T.t*T.spin*.7,0),C.scale.setScalar(T.size*(1-Math.pow(T.t/T.life,3))),C.updateMatrix(),A.setMatrixAt(R,C.matrix)}}A.instanceMatrix.needsUpdate=!0,I||(A.visible=!1)}}}}const hc={tebas:{clip:"attack-melee-right",speed:.9,hit:.24,reach:1,radius:.7,y:.9,damage:1,knock:2.5},tinju:{clip:"attack-melee-left",speed:1,hit:.21,reach:.8,radius:.55,y:1,damage:1,knock:2.5},tendang:{clip:"attack-kick-right",speed:1,hit:.27,reach:.95,radius:.65,y:.45,damage:2,knock:4}},fc=["tebas","tinju","tendang"],aS=.7,dl={cincang:6,hentak:7,putar:5,penggal:15},oS=["attack-melee-right","attack-melee-left","attack-kick-right"],Fn={time:.14,from:.1,speed:2.9,hit:.05,reach:1.1,radius:.95,damage:1,knock:.8,advance:.9},cS=10,Di={chops:3,time:.55,hit:.3,radius:2.4,damage:2,knock:6},Bn={up:9.5,forward:2.2,radius:3.3,plant:.75,damage:3,knock:7,stuck:.35,recover:.35},is={range:14,max:5,aim:.55,seg:.08,pause:.35,recover:.3,past:1.6},lS=.15,Ff=.45,uS=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function hS(i){let t=null,e=0,n=0,s=null;const r={cincang:0,hentak:0,putar:0,penggal:0};let a=()=>{},o={pickTargets:()=>[],position:()=>null,standable:()=>!0};const c=()=>({x:Math.sin(i.heading),z:Math.cos(i.heading)});function l(v,_){a({type:v,move:t.name,heading:i.heading,origin:{x:i.pos.x,z:i.pos.z},..._})}function u(v,_,A,w,C,z={}){const b=c();l("hit",{x:i.pos.x+b.x*v,z:i.pos.z+b.z*v,r:_,y:i.pos.y+A,damage:w,knock:C,...z})}function h(v,_,A,w,C={}){l("hit",{x:i.pos.x,z:i.pos.z,r:v,y:i.pos.y+_,damage:A,knock:w,area:!0,...C})}function d(v,_,A,w){const C=i.clipLength(_);t={name:v,t:0,dur:C?C/A:Ff,hitAt:C?w/A:Ff*.55,struck:!1},i.playClip(_,A)}function f(){t.t=0,t.struck=!1,i.playClip("attack-melee-right",Fn.speed,Fn.from)}function g(v){if(v==="pukul"){e=n>0?(e+1)%fc.length:0;const _=hc[fc[e]];d(fc[e],_.clip,_.speed,_.hit)}else{if(!(v in dl)||r[v]>0)return!1;if(v==="cincang")t={name:"cincang",phase:"cincang",n:0,of:cS},f();else if(v==="putar")t={name:"putar",phase:"cincang",n:0,of:Di.chops},f();else if(v==="hentak"){if(!i.grounded||i.depthAt(i.pos.x,i.pos.z)>.9)return!1;const _=c();i.launch(_.x*Bn.forward,Bn.up,_.z*Bn.forward),t={name:"hentak",phase:"naik",t:0},i.pose("attack-melee-right",.16)}else{const _=o.pickTargets(i.pos.x,i.pos.z,is.range,is.max);if(!_.length)return a({type:"gagal",move:"penggal",reason:"musuh"}),!1;t={name:"penggal",phase:"bidik",t:0,ids:_.map(A=>A.id)},i.heading=Math.atan2(_[0].x-i.pos.x,_[0].z-i.pos.z),i.pose("attack-melee-right",.14),l("aim",{targets:t.ids})}r[v]=dl[v],n=0}return i.stopWalking(),!0}function x(){const v=t.name in hc;t=null,n=v?aS:0;const _=s;s=null,_&&g(_)}function m(){if(!t.struck&&t.t>=Fn.hit&&(t.struck=!0,u(Fn.reach,Fn.radius,.9,Fn.damage,Fn.knock,{swing:t.n%2?-1:1,chop:t.n+1})),!(t.t<Fn.time))if(t.n++,t.n<t.of)f();else if(t.name==="putar"){const v=i.clipLength("attack-melee-right");Object.assign(t,{phase:"putar",t:0,struck:!1,h0:i.heading}),i.playClip("attack-melee-right",v?v/Di.time:1)}else Object.assign(t,{phase:"pulih",t:0})}function p(){const v=[{x:i.pos.x,z:i.pos.z}];for(const C of t.ids){const z=o.position(C);z&&v.push(z)}if(v.length<2)return v;const _=v[v.length-2],A=v[v.length-1],w=Math.hypot(A.x-_.x,A.z-_.z)||1;for(const C of[is.past,1,.6]){const z=A.x+(A.x-_.x)/w*C,b=A.z+(A.z-_.z)/w*C;if(o.standable(z,b)){v.push({x:z,z:b});break}}return v}function y(v){t.t+=v;const{name:_,phase:A}=t;if(A==="cincang"){m();return}if(A==="pulih"){t.t>=(_==="hentak"?Bn.recover:_==="penggal"?is.recover:lS)&&x();return}if(_==="putar"){i.heading=t.h0+uS(.04,Di.time-.08,t.t)*Math.PI*2,!t.struck&&t.t>=Di.hit&&(t.struck=!0,h(Di.radius,.85,Di.damage,Di.knock,{spin:!0})),t.t>=Di.time&&(i.heading=t.h0,x());return}if(_==="hentak"){if(A==="naik"&&i.vel.y<0)t.phase="turun",i.pose("attack-melee-right",.27),i.swordDown(!0);else if(A==="turun"&&i.grounded&&t.t>.15||t.t>2.5){const w=c(),C={x:i.pos.x+w.x*Bn.plant,z:i.pos.z+w.z*Bn.plant};i.crouch(.28),h(Bn.radius,.05,Bn.damage,Bn.knock,{plant:C}),Object.assign(t,{phase:"tancap",t:0})}else A==="tancap"&&t.t>=Bn.stuck&&(i.crouch(0),i.swordDown(!1),i.release(),Object.assign(t,{phase:"pulih",t:0}));return}if(_==="penggal"){if(A==="bidik"&&t.t>=is.aim&&(t.path=p(),Object.assign(t,{phase:"kilat",t:0})),t.phase==="kilat"){const w=t.path,C=Math.min(t.t/is.seg,w.length-1),z=Math.min(Math.floor(C),w.length-2);if(z>=0){const b=w[z],E=w[z+1],I=C-z;i.teleport(b.x+(E.x-b.x)*I,b.z+(E.z-b.z)*I),i.heading=Math.atan2(E.x-b.x,E.z-b.z)}C>=w.length-1&&(l("dash",{path:w,y:i.pos.y+.9}),i.pose("attack-melee-right",.33),Object.assign(t,{phase:"diam",t:0}))}else A==="diam"&&t.t>=is.pause&&(l("execute",{targets:t.ids}),i.release(),Object.assign(t,{phase:"pulih",t:0}));return}if(!t.struck&&t.t>=t.hitAt){t.struck=!0;const w=hc[_];u(w.reach,w.radius,w.y,w.damage,w.knock,{swing:1})}t.t>=t.dur&&x()}return{cooldown:r,get busy(){return t!==null},get current(){return t?t.name:null},get phase(){return t&&t.phase||null},onEvent(v){a=v},setArena(v){o=v},drive(){if(!t)return null;if(t.name==="hentak"&&(t.phase==="naik"||t.phase==="turun"))return{keep:!0};if(t.phase==="cincang"){const v=c();return{vx:v.x*Fn.advance,vz:v.z*Fn.advance}}return{vx:0,vz:0,instant:t.name==="penggal"}},update(v,_){for(const w in r)r[w]=Math.max(0,r[w]-v);!t&&n>0&&(n-=v);const A=_.skill||(_.attack?"pukul":null);A&&t?s=A:A&&g(A),t&&y(v)},reset(){t&&(i.swordDown(!1),i.crouch(0)),t=null,s=null,n=0}}}const fS=2.3,dS=.35,Fa=2,Bf=5.6,pS=26,mS=8,gS=21,xS=7.2,_S=.12,vS=.15,yS=1.3,MS=.35,Hf=1.3,bS=30,dc={hand:[-.265,0,.068],blade:[-.45,0,.9],grip:.05};async function SS(i,t,e){var n;try{const s=(await t(e)).scene,r=new B().fromArray(dc.blade).normalize();s.quaternion.setFromUnitVectors(new B(0,-1,0),r),s.position.fromArray(dc.hand).addScaledVector(r,dc.grip),(n=i.getObjectByName("arm-right"))==null||n.add(s),Object.defineProperty(i.userData,"sword",{value:s,enumerable:!1})}catch(s){console.warn("Senjata gagal dimuat:",s)}}async function Gf(i,t,e=null){const n=new il,s=o=>typeof o=="string"?n.loadAsync(o):n.parseAsync(o,""),r=await s(i),a=r.scene;return a.scale.setScalar(fS),e&&await SS(a,s,e),a.traverse(o=>{if(!o.isMesh)return;const c=o.material;o.material=new Yn({map:c.map}),c.dispose(),o.castShadow=t.shadows,o.receiveShadow=t.shadows,o.frustumCulled=!1}),{model:a,clips:r.animations}}function AS(i){const t=new Ce,e=new ne(new Ol(.3,.6,4,8),new Yn({color:"#3f8f4a"}));e.position.y=.6;const n=new ne(new lo(.26,12,8),new Yn({color:"#e0b48a"}));return n.position.y=1.32,t.add(e,n),t.traverse(s=>{s.castShadow=i.shadows}),t}function wS({ground:i,colliders:t,quality:e,asset:n}){const s=new Ce;s.name="pemain";const r=n?n.model:AS(e);s.add(r);const a=n?new jl(r):null,o={},c=["jump",...oS];if(a)for(const Y of["idle","walk","sprint","fall",...c]){const K=us.findByName(n.clips,Y);if(!K)continue;const it=a.clipAction(K);c.includes(Y)&&(it.setLoop(Al,1),it.clampWhenFinished=!0),o[Y]=it}let l=null;function u(Y,K=.15){const it=o[Y];!it||l===it||(it.reset().play(),l&&it.crossFadeFrom(l,K,!1),l=it)}u("idle");let h=null;if(!e.shadows){const Y=document.createElement("canvas");Y.width=Y.height=64;const K=Y.getContext("2d"),it=K.createRadialGradient(32,32,0,32,32,32);it.addColorStop(0,"rgba(0,0,0,0.5)"),it.addColorStop(1,"rgba(0,0,0,0)"),K.fillStyle=it,K.fillRect(0,0,64,64),h=new ne(new bn(1.2,1.2).rotateX(-Math.PI/2),new je({map:new Lv(Y),transparent:!0,depthWrite:!1})),h.renderOrder=2}const d=s.position,f=new B,g=new B;let x=0,m=0,p=!0,y=0,v=0,_=0,A=0,w=0,C=()=>{},z=!1;const b=[];let E=0,I=1/0;function X(){for(;b.length;){const at=b[0];if(Math.hypot(at.x-d.x,at.z-d.z)>(b.length>1?.8:.25))break;b.shift(),I=1/0,E=0}if(!b.length)return null;const Y=b[0].x-d.x,K=b[0].z-d.z,it=Math.hypot(Y,K);let G=it;for(let at=1;at<b.length;at++)G+=Math.hypot(b[at].x-b[at-1].x,b[at].z-b[at-1].z);const ct=Math.min(G>7?Bf:Fa*1.4,.8+G*2.2);return{dx:Y/it,dz:K/it,speed:ct}}const W={x:0,z:0,len:0};function q(Y,K){return W.x=(i.surfaceAt(Y+.5,K)-i.surfaceAt(Y-.5,K))/(2*.5),W.z=(i.surfaceAt(Y,K+.5)-i.surfaceAt(Y,K-.5))/(2*.5),W.len=Math.hypot(W.x,W.z),W}function M(Y,K,it){d.set(Y,i.surfaceAt(Y,K),K),f.set(0,0,0),x=it,s.rotation.y=it,p=!0,A=0,d.y>.4&&(g.copy(d),m=it)}const S=r.userData.sword||null,R=S?S.quaternion.clone():null,T=r.getObjectByName("arm-right");let k=!1;const F=new _e,P=new _e,N=new _e().setFromAxisAngle(new B(1,0,0),-.3),j=new B(0,1,0);function H(){if(S){if(!k){S.quaternion.copy(R);return}T.getWorldQuaternion(F),P.setFromAxisAngle(j,x).multiply(N),S.quaternion.copy(F.invert().multiply(P))}}const V=hS({pos:d,vel:f,get heading(){return x},set heading(Y){x=Y},get grounded(){return p},depthAt:(Y,K)=>we.seaLevel-i.surfaceAt(Y,K),clipLength:Y=>{var K;return((K=o[Y])==null?void 0:K.getClip().duration)||0},play:u,playClip(Y,K,it=0){const G=o[Y];G&&(G.timeScale=K,l===G?G.reset().play():u(Y,.06),G.time=it)},pose(Y,K){const it=o[Y];it&&(l!==it&&u(Y,.06),it.time=K,it.paused=!0)},release(){l&&(l.paused=!1)},launch(Y,K,it){f.set(Y,K,it),p=!1,y=0,_=0},teleport(Y,K){d.set(Y,i.surfaceAt(Y,K),K),f.set(0,0,0),p=!0},swordDown(Y){k=Y},crouch(Y){r.position.y=-Y},stopWalking(){b.length=0}});function tt(Y,K,it){let G=0,ct=0,at=0,mt=0;const U=V.drive();if(U)G=U.vx||0,ct=U.vz||0,mt=1;else if(Math.abs(K.moveX)+Math.abs(K.moveY)>.01){b.length=0;const st=-Math.sin(it),ht=-Math.cos(it),ut=Math.cos(it),At=-Math.sin(it);G=ut*K.moveX+st*K.moveY,ct=At*K.moveX+ht*K.moveY;const Mt=Math.hypot(G,ct);at=Math.min(1,Mt),G/=Mt,ct/=Mt,mt=at<.7?Fa*(at/.7):Fa+(Bf-Fa)*(at-.7)/.3}else{const st=X();st&&({dx:G,dz:ct,speed:mt}=st,at=1)}const xt=we.seaLevel-i.surfaceAt(d.x,d.z);xt>MS&&!U&&(mt*=.55);const ft=(p?pS:mS)*Y,yt=G*mt,vt=ct*mt,Bt=yt-f.x,Et=vt-f.z,D=Math.hypot(Bt,Et);if(U!=null&&U.keep||(D<=ft||U!=null&&U.instant?(f.x=yt,f.z=vt):(f.x+=Bt/D*ft,f.z+=Et/D*ft)),at>.05){let ht=Math.atan2(G,ct)-x;ht=Math.atan2(Math.sin(ht),Math.cos(ht)),x+=ht*Math.min(1,12*Y)}y=p?_S:y-Y,v=K.jump?vS:v-Y,v>0&&y>0&&xt<Hf*.8&&!U&&(f.y=xS,p=!1,y=0,v=0,_=0,u("jump",.08)),f.y-=gS*Y,d.x+=f.x*Y,d.z+=f.z*Y,d.y+=f.y*Y,t.resolve(d,dS,f);const L=q(d.x,d.z);if(L.len>yS){const st=L.x/L.len,ht=L.z/L.len,ut=f.x*st+f.z*ht;ut>0&&(f.x-=ut*st,f.z-=ut*ht,d.x-=ut*st*Y,d.z-=ut*ht*Y),p&&(f.x-=st*6*Y,f.z-=ht*6*Y)}const J=i.surfaceAt(d.x,d.z);d.y<=J?(d.y=J,f.y<0&&(f.y=0),p=!0):p&&f.y<=0&&d.y-J<.6?(d.y=J,f.y=0):p=!1,p?_=0:_+=Y}return{root:s,blob:h,get position(){return d},get heading(){return x},get speed(){return Math.hypot(f.x,f.z)},get grounded(){return p},get usingModel(){return!!n},get hasPath(){return b.length>0},get attacking(){return V.busy},get attackMove(){return V.current},get attackPhase(){return V.phase},get cooldowns(){return V.cooldown},placeAt:M,followPath(Y){b.length=0,b.push(...Y),I=1/0,E=0},stop(){b.length=0},onRespawnNeeded(Y){C=Y},onAttack(Y){V.onEvent(Y)},setArena(Y){V.setArena(Y)},respawn(){M(g.x,g.z,m),b.length=0,V.reset(),z=!1,u("idle",.05)},freeze(){z=!0,f.set(0,0,0)},update(Y,K,it){if(z||V.update(Y,K),!z){const mt=V.drive(),U=mt&&!mt.keep?Math.hypot(mt.vx,mt.vz):0,xt=Math.max(Math.hypot(f.x,f.z),U),ft=Math.min(12,Math.max(Y>1/45?2:1,Math.ceil(xt*Y/.3)));for(let yt=0;yt<ft;yt++)tt(Y/ft,yt===0?K:{...K,jump:!1},it)}if(s.rotation.y=x,b.length&&!z&&!V.busy){const mt=Math.hypot(b[0].x-d.x,b[0].z-d.z);mt<I-.25?(I=mt,E=0):(E+=Y)>1.2&&(b.shift(),I=1/0,E=0)}const G=i.surfaceAt(d.x,d.z);A=we.seaLevel-G>Hf?A+Y:0,!z&&A>.6?C("laut"):!z&&!G1(d.x,d.z,bS)&&C("jauh"),w+=Y,w>.4&&p&&G>.4&&q(d.x,d.z).len<.8&&(w=0,g.copy(d),m=x);const at=Math.hypot(f.x,f.z);if(!V.busy){let mt=null;p?mt=at<.3?"idle":at<3.6?"walk":"sprint":_>.12&&(mt=f.y>0&&l===o.jump?"jump":"fall"),mt&&u(mt,.18)}if(o.walk&&(o.walk.timeScale=di.clamp(at/1.4,.6,1.6)),o.sprint&&(o.sprint.timeScale=di.clamp(at/3.6,.8,1.6)),a==null||a.update(Y),H(),h){const mt=d.y-G;h.position.set(d.x,G+.05,d.z),h.material.opacity=Math.max(0,1-mt/3),h.scale.setScalar(1+mt*.15)}}}}const ce=i=>document.getElementById(i);function jr(i){ce("loading").hidden=!0,ce("error").hidden=!1,ce("error-teks").textContent=String(i)}window.addEventListener("error",i=>{var t;return jr(((t=i.error)==null?void 0:t.stack)||i.message)});window.addEventListener("unhandledrejection",i=>{var t;return jr(((t=i.reason)==null?void 0:t.stack)||i.reason)});function TS(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function Pn(i){ce("loading-teks").textContent=i}const Hn=()=>new Promise(i=>requestAnimationFrame(()=>setTimeout(i,0))),Vf={rendah:"Rendah",sedang:"Sedang",tinggi:"Tinggi"};let Wf=0;function Ba(i,t=2800){const e=ce("pesan");e.textContent=i,e.hidden=!1,clearTimeout(Wf),Wf=setTimeout(()=>{e.hidden=!0},t)}function ES(i,t){const e=Math.SQRT1_2;for(let n=140;n<280;n+=1){const s=-e*n,r=e*n,a=i.heightAt(s,r);if(a>.9&&a<2.2&&i.slopeAt(s,r)<.3&&t.isFree(s,r,.9))return{x:s,z:r,heading:Math.atan2(-s,-r)}}return{x:-128,z:128,heading:Math.atan2(128,-128)}}const RS="<b>Ketuk tanah</b> untuk berjalan ke sana (jauh = lari)<br>Geser: putar kamera · Cubit: zoom<br><b>Pukul</b> berulang = kombo · 4 tombol <b>jurus</b> · musuh orc ada di depan<br><b>Peta</b>: Kerajaan Kencana di barat (Jembatan Agung), bala tentaranya di Pulau Wira",CS="<b>Klik tanah</b> untuk berjalan ke sana · WASD / panah juga bisa<br>Seret mouse: putar kamera · Roda: zoom · Spasi: lompat<br>F: pukul (kombo) · 1–4: jurus Cincang, Hentak, Putar, Penggal<br>M: peta — Kerajaan Kencana di barat (Jembatan Agung), bala tentaranya di Pulau Wira",PS={main:[55,42],lihat:[70,55]};function IS(){const i=ce("btn-kualitas"),t=ce("panel-kualitas");i.textContent=`Kualitas: ${Vf[Ee.level]}`,t.querySelectorAll("button[data-q]").forEach(e=>{e.classList.toggle("aktif",e.dataset.q===Ee.level),e.addEventListener("click",()=>{if(e.dataset.q===Ee.level){t.hidden=!0;return}t.hidden=!0,ce("loading").hidden=!1,Pn(`Mengganti kualitas ke ${Vf[e.dataset.q]}…`),setTimeout(()=>A1(e.dataset.q),50)})}),i.addEventListener("click",()=>{t.hidden=!t.hidden,ce("saran").hidden=!0}),ce("btn-tutup-kualitas").addEventListener("click",()=>{t.hidden=!0})}async function LS(){if(!TS()){jr(`Browser ini tidak mendukung WebGL 2.
Coba gunakan Chrome versi terbaru di Android.`);return}const i=ce("game"),t=new Av({canvas:i,antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,Ee.maxPixelRatio)),t.outputColorSpace=Ne,t.toneMapping=jf,t.toneMappingExposure=1,Ee.shadows&&(t.shadowMap.enabled=!0,t.shadowMap.type=Ee.softShadows?Xf:ml);const e=new Ka,n=new tn(55,1,.5,5e3);Pn("Menyiapkan tekstur…"),await Hn();const s=T1(t),r={noiseTexture:s,quality:Ee};Pn("Membuat langit dan cahaya…"),await Hn();const a=sM(e,r);Pn("Membentuk pulau-pulau…"),await Hn();const o=Jh(Ee.terrainSegments),c=X1(o,Ee.water.shoreRes),l=NM(o),u=kM(l,o),h=$1(o,{...r,region:u});e.add(h),Pn("Menanam pohon dan menebar batu…"),await Hn();const d=new C1(8),f=Jh(Ee.terrainSegments,{heightFn:Hd,rect:{minX:-500,maxX:500,minZ:-500,maxZ:500}}),g=lM({ground:f,grid:d,quality:Ee,noiseTexture:s,reserved:u.reserved}),x=hM({ground:f,grid:d,quality:Ee,reserved:u.reserved});e.add(g,x),Pn("Membangun Kerajaan Kencana…"),await Hn();const m=Sb({ground:o,plan:l,mask:u,grid:d,quality:Ee,noiseTexture:s});e.add(m.object),o.setSurfaces(m.surfaces),h.userData.applyOcclusion([...g.userData.occlusion,...x.userData.occlusion,...m.occlusion]);const p=vM([...g.userData.trunks,...x.userData.colliders.filter(dt=>dt.radius>=.8),...m.colliders]),y=AM(o,p);Pn("Menumbuhkan rumput…"),await Hn();const v=xM({ground:o,grid:d,quality:Ee});e.add(v),Pn("Mengisi lautan…"),await Hn();const _=E1(t),A=eM({ground:o,shore:c,env:a,noiseTexture:s,normalTexture:_,quality:Ee});e.add(A),Pn("Menyiapkan karakter…"),await Hn();const w=dt=>new URL(`models/${dt}`,document.baseURI).href;let C=null;try{C=await Gf(w("prajurit.glb"),Ee,w("pedang.glb"))}catch(dt){console.warn("Model karakter gagal dimuat:",dt)}let z=null;try{z=await Gf(w("orc.glb"),Ee)}catch(dt){console.warn("Model musuh gagal dimuat:",dt)}Pn("Mengundang penduduk kerajaan…"),await Hn();let b=null;try{const dt=await new il().loadAsync(w("penduduk.glb"));b=Cb({ground:o,routes:m.routes,spots:m.spots,quality:Ee,villagerGltf:dt,soldier:C}),e.add(b.object)}catch(dt){console.warn("Penduduk gagal dimuat:",dt)}Pn("Membariskan 25.000 prajurit…"),await Hn();let E=null;if(C)try{const dt=await new il().loadAsync(w("bala.glb"));E=Nb({ground:o,plan:l,quality:Ee,soldier:C,bala:Ub(dt),renderer:t,env:a}),e.add(E.object)}catch(dt){console.warn("Bala tentara gagal dimuat:",dt)}const I=wS({ground:o,colliders:p,quality:Ee,asset:C});e.add(I.root),I.blob&&e.add(I.blob);const X=ES(o,p);I.placeAt(X.x,X.z,X.heading);const W=z?LM({ground:o,colliders:p,nav:y,asset:z,spawn:X}):null;W&&e.add(W.object),I.setArena({pickTargets:(dt,pt,_t,Ct)=>W?W.pickTargets(dt,pt,_t,Ct):[],position:dt=>W?W.position(dt):null,standable:(dt,pt)=>y.walkableAt(dt,pt)&&p.isFree(dt,pt,.45)&&o.heightAt(dt,pt)>-.9});const q=navigator.maxTouchPoints>0||"ontouchstart"in window,M=qb(n,o);M.lookFrom(X.heading+Math.PI);const S={cincang:ce("btn-cincang"),hentak:ce("btn-hentak"),putar:ce("btn-putar"),penggal:ce("btn-penggal")},R=Wb({canvas:i,jumpButton:ce("btn-lompat"),attackButton:ce("btn-pukul"),skillButtons:S,touch:q}),T={moveX:0,moveY:0,jump:!1,attack:!1,skill:null,lookDX:0,zoom:1,taps:[]},k=Jb(o);e.add(...k.objects);const F=rS(o);e.add(F.object),I.onAttack(dt=>{if(dt.type==="gagal"){Ba("Tidak ada musuh dalam jangkauan Penggal (±14 m).",1800);return}if(dt.type==="aim"){W==null||W.mark(dt.targets,!0);return}if(dt.type==="execute"){W==null||W.mark(dt.targets,!1);const pt=W?W.decapitate(dt.targets,I.position):[];F.execute(pt,I.position),pt.length&&M.shake(.22);return}if(dt.type==="hit"){const pt={x:dt.x,z:dt.z,r:dt.r},_t=W?W.hit(pt,dt.damage,dt.knock,dt.origin):[];F.attack(dt,p.hitAll(dt.x,dt.z,dt.r,5),_t),dt.plant?M.shake(.4):_t.length&&dt.spin&&M.shake(.12);return}F.attack(dt)});const P={};function N(){for(const[dt,pt]of Object.entries(S)){const _t=I.cooldowns[dt],Ct=_t>0?Math.ceil(_t*10):0;P[dt]!==Ct&&(P[dt]=Ct,pt.style.setProperty("--cd",(_t/dl[dt]).toFixed(3)),pt.querySelector(".cd").textContent=_t>0?Math.ceil(_t):"",pt.classList.toggle("siap",_t<=0))}}const j=new wy,H=new St,V=(dt,pt)=>Math.max(o.surfaceAt(dt,pt),we.seaLevel);function tt(dt,pt){const _t=i.getBoundingClientRect();H.set((dt-_t.left)/_t.width*2-1,-((pt-_t.top)/_t.height)*2+1),j.setFromCamera(H,n);const{origin:Ct,direction:Nt}=j.ray;let Tt=0,jt=0;for(;jt<1500;){const Wt=Ct.y+Nt.y*jt-V(Ct.x+Nt.x*jt,Ct.z+Nt.z*jt);if(Wt<=0){let Gt=Tt,Z=jt;for(let wt=0;wt<14;wt++){const lt=(Gt+Z)/2;Ct.y+Nt.y*lt>V(Ct.x+Nt.x*lt,Ct.z+Nt.z*lt)?Gt=lt:Z=lt}return{x:Ct.x+Nt.x*Z,z:Ct.z+Nt.z*Z}}Tt=jt,jt+=di.clamp(Wt*.5,.3,25)}return null}function Y(dt){const pt=tt(dt.x,dt.y);if(!pt)return;const _t=y.findPath(I.position,pt);if(_t){I.followPath(_t);const Ct=_t[_t.length-1];k.showTarget(Ct.x,Ct.z,!0),D()}else k.showTarget(pt.x,pt.z,!1),Ba("Tidak ada jalan ke sana.",1600)}const K=new Ry(n,i);K.target.set(0,8,0),n.position.set(-260,140,330),K.enabled=!1,K.enableDamping=!0,K.dampingFactor=.08,K.minDistance=12,K.maxDistance=1500,K.maxPolarAngle=Math.PI*.47,K.rotateSpeed=Ee.isMobile?.6:.8,K.zoomSpeed=.9,K.screenSpacePanning=!1,K.touches={ONE:Ui.ROTATE,TWO:Ui.DOLLY_PAN};function it(){const dt=Math.max(o.surfaceAt(n.position.x,n.position.z),we.seaLevel);n.position.y<dt+3&&(n.position.y=dt+3),K.target.x=di.clamp(K.target.x,Xt.minX+50,Xt.maxX-50),K.target.z=di.clamp(K.target.z,Xt.minZ+50,Xt.maxZ-50),K.target.y=Math.max(o.surfaceAt(K.target.x,K.target.z),0)+3}let G="main";function ct(){const dt=window.innerWidth,pt=window.innerHeight;t.setSize(dt,pt,!1),n.aspect=dt/pt,n.fov=PS[G][dt<pt?0:1],n.updateProjectionMatrix()}window.addEventListener("resize",ct),window.addEventListener("orientationchange",()=>setTimeout(ct,200)),ct();const at=ce("btn-layar-penuh");document.documentElement.requestFullscreen||(at.hidden=!0),at.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{at.textContent=document.fullscreenElement?"Keluar layar penuh":"Layar penuh"}),IS();function mt(dt){const pt=G;G=dt;const _t=G==="main";if(K.enabled=!_t,R.setEnabled(_t),ce("btn-mode").textContent=_t?"Lihat pulau":"Main lagi",_t&&pt==="lihat"){const Ct=I.position,Nt=n.position.x-Ct.x,Tt=n.position.z-Ct.z;M.lookFrom(Math.atan2(Nt,Tt),!1)}else _t||(I.stop(),k.hideTarget(),K.target.copy(I.position),K.update());ct()}ce("btn-mode").addEventListener("click",()=>mt(G==="main"?"lihat":"main"));const U=Bb({ground:o,plan:l,region:u,camps:W?W.camps:[]}),xt=Hb({ground:o,spans:l.spans});function ft(){U.open?U.hide():(ce("panel-kualitas").hidden=!0,D(),U.show(I.position,I.heading))}ce("btn-peta").addEventListener("click",ft),ce("btn-tutup-peta").addEventListener("click",()=>U.hide()),ce("peta").addEventListener("click",dt=>{dt.target.id==="peta"&&U.hide()}),window.addEventListener("keydown",dt=>{dt.code==="KeyM"&&!dt.repeat?ft():dt.code==="Escape"&&U.hide()}),mt("main");let yt=!1;I.onRespawnNeeded(dt=>{yt||(yt=!0,I.freeze(),ce("tirai").classList.add("gelap"),setTimeout(()=>{I.respawn(),M.lookFrom(I.heading+Math.PI),ce("tirai").classList.remove("gelap"),Ba(dt==="laut"?"Airnya terlalu dalam! Kamu kembali ke pantai.":"Terlalu jauh dari pulau. Kamu kembali ke pantai."),yt=!1},450))}),C||Ba("Model karakter gagal dimuat — memakai karakter sederhana.",5e3);const vt=ce("petunjuk");vt.innerHTML=q?RS:CS;let Bt=0,Et=!1;function D(){Et||(Et=!0,vt.style.opacity=0,setTimeout(()=>{vt.hidden=!0},1e3))}i.addEventListener("webglcontextlost",dt=>{dt.preventDefault(),jr(`Grafis HP kehilangan konteks WebGL (biasanya karena memori penuh).
Muat ulang halaman, lalu pilih Kualitas: Rendah.`)});const L=new hy;let J=0,st=0,ht=0,ut=0,At=Ee.level==="rendah",Mt=0;const Dt={timeScale:1};t.setAnimationLoop(()=>{Mt++;const dt=Math.min(L.getDelta(),.1)*Dt.timeScale,pt=L.elapsedTime;if(G==="main"){const _t=R.read();for(const Tt of _t.taps)Y(Tt);I.update(dt,_t,M.yaw),b==null||b.pushOut(I.position),I.hasPath||k.hideTarget(),M.update(dt,I.position,_t),!Et&&(I.speed>.5||(Bt+=dt)>15)&&D(),zn.a.value.copy(n.position),zn.b.value.copy(I.position).y+=1;const Ct=I.position,Nt=m.roofs.find(Tt=>Math.abs(Ct.x-Tt.x)<Tt.hx&&Math.abs(Ct.z-Tt.z)<Tt.hz);zn.r.value+=((Nt?Nt.r:3.5)-zn.r.value)*(1-Math.exp(-6*dt))}else I.update(dt,T,M.yaw),K.update(),it(),zn.r.value=0;k.update(dt),W==null||W.update(dt,n,I),xt.update(dt,I.position,G==="main")&&D(),b==null||b.update(dt,n,G==="main"?I.position:K.target,I.position,G==="main"?110:260),E==null||E.update(dt,n,G==="main"?I.position:K.target),F.update(dt,n),N(),a.update(pt,n,G==="main"?I.position:K.target),Zl.value=pt,g.userData.update(pt),m.update(pt),v.userData.update(n,pt),t.render(e,n),J++,st+=dt,st>=.5&&(ce("fps").textContent=`${Math.round(J/st)} FPS · kualitas ${Ee.level}`,J=0,st=0),!At&&pt>3&&(ht+=dt,ut++,ht>6&&(At=!0,ut/ht<24&&(D(),ce("saran").hidden=!1,setTimeout(()=>{ce("saran").hidden=!0},9e3))))}),ce("loading").hidden=!0,ce("hud").hidden=!1,window.__pulau={renderer:t,scene:e,camera:n,controls:K,ground:o,shore:c,quality:Ee,trees:g,rocks:x,grass:v,water:A,env:a,kencana:m,region:u,plan:l,villagers:b,army:E,worldMap:U,banner:xt,player:I,cam:M,input:R,colliders:p,nav:y,markers:k,effects:F,enemies:W,pickGround:tt,setMode:mt,getMode:()=>G,frames:()=>Mt,debug:Dt}}LS().catch(jr);
