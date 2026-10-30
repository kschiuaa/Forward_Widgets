WidgetMetadata = {
  "id": "zen.cheyong.rex.stream",
  "title": "官方線路",
  "description": "只走官方索引 + 索引下發的第三方解析。",
  "author": "TG@ZenMoFiShi",
  "site": "http://app2.dsx.ac",
  "version": "1.6.3",
  "requiredVersion": "0.0.1",
  "modules": [
    {
      "id": "loadResource",
      "title": "官方線路",
      "functionName": "loadResource",
      "description": "只走官方索引 + 索引下發的第三方解析",
      "type": "stream",
      "cacheDuration": 0,
      "requiresWebView": false,
      "params": []
    }
  ]
};

var DSCryptoLicense = "# License\n\n[The MIT License (MIT)](http://opensource.org/licenses/MIT)\n\nCopyright (c) 2009-2013 Jeff Mott  \nCopyright (c) 2013-2016 Evan Vosberg\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n";

var DSCrypto=(()=>{var $=(k=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(k,{get:(u,A)=>(typeof require!="undefined"?require:u)[A]}):k)(function(k){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+k+'" is not supported')});var I=(k,u)=>()=>{try{return u||k((u={exports:{}}).exports,u),u.exports}catch(A){throw u=0,A}};var N=I((O,rr)=>{(function(k,u){typeof O=="object"?rr.exports=O=u():typeof define=="function"&&define.amd?define([],u):k.CryptoJS=u()})(O,function(){var k=k||(function(u,A){var w;if(typeof window!="undefined"&&window.crypto&&(w=window.crypto),typeof self!="undefined"&&self.crypto&&(w=self.crypto),typeof globalThis!="undefined"&&globalThis.crypto&&(w=globalThis.crypto),!w&&typeof window!="undefined"&&window.msCrypto&&(w=window.msCrypto),!w&&typeof global!="undefined"&&global.crypto&&(w=global.crypto),!w&&typeof $=="function")try{w=$("crypto")}catch(r){}var K=function(){if(w){if(typeof w.getRandomValues=="function")try{return w.getRandomValues(new Uint32Array(1))[0]}catch(r){}if(typeof w.randomBytes=="function")try{return w.randomBytes(4).readInt32LE()}catch(r){}}throw new Error("Native crypto module could not be used to get secure random number.")},H=Object.create||(function(){function r(){}return function(e){var v;return r.prototype=e,v=new r,r.prototype=null,v}})(),P={},n=P.lib={},m=n.Base=(function(){return{extend:function(r){var e=H(this);return r&&e.mixIn(r),(!e.hasOwnProperty("init")||this.init===e.init)&&(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var r=this.extend();return r.init.apply(r,arguments),r},init:function(){},mixIn:function(r){for(var e in r)r.hasOwnProperty(e)&&(this[e]=r[e]);r.hasOwnProperty("toString")&&(this.toString=r.toString)},clone:function(){return this.init.prototype.extend(this)}}})(),_=n.WordArray=m.extend({init:function(r,e){r=this.words=r||[],e!=A?this.sigBytes=e:this.sigBytes=r.length*4},toString:function(r){return(r||x).stringify(this)},concat:function(r){var e=this.words,v=r.words,h=this.sigBytes,C=r.sigBytes;if(this.clamp(),h%4)for(var z=0;z<C;z++){var F=v[z>>>2]>>>24-z%4*8&255;e[h+z>>>2]|=F<<24-(h+z)%4*8}else for(var B=0;B<C;B+=4)e[h+B>>>2]=v[B>>>2];return this.sigBytes+=C,this},clamp:function(){var r=this.words,e=this.sigBytes;r[e>>>2]&=4294967295<<32-e%4*8,r.length=u.ceil(e/4)},clone:function(){var r=m.clone.call(this);return r.words=this.words.slice(0),r},random:function(r){for(var e=[],v=0;v<r;v+=4)e.push(K());return new _.init(e,r)}}),d=P.enc={},x=d.Hex={stringify:function(r){for(var e=r.words,v=r.sigBytes,h=[],C=0;C<v;C++){var z=e[C>>>2]>>>24-C%4*8&255;h.push((z>>>4).toString(16)),h.push((z&15).toString(16))}return h.join("")},parse:function(r){for(var e=r.length,v=[],h=0;h<e;h+=2)v[h>>>3]|=parseInt(r.substr(h,2),16)<<24-h%8*4;return new _.init(v,e/2)}},l=d.Latin1={stringify:function(r){for(var e=r.words,v=r.sigBytes,h=[],C=0;C<v;C++){var z=e[C>>>2]>>>24-C%4*8&255;h.push(String.fromCharCode(z))}return h.join("")},parse:function(r){for(var e=r.length,v=[],h=0;h<e;h++)v[h>>>2]|=(r.charCodeAt(h)&255)<<24-h%4*8;return new _.init(v,e)}},p=d.Utf8={stringify:function(r){try{return decodeURIComponent(escape(l.stringify(r)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(r){return l.parse(unescape(encodeURIComponent(r)))}},y=n.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new _.init,this._nDataBytes=0},_append:function(r){typeof r=="string"&&(r=p.parse(r)),this._data.concat(r),this._nDataBytes+=r.sigBytes},_process:function(r){var e,v=this._data,h=v.words,C=v.sigBytes,z=this.blockSize,F=z*4,B=C/F;r?B=u.ceil(B):B=u.max((B|0)-this._minBufferSize,0);var W=B*z,q=u.min(W*4,C);if(W){for(var t=0;t<W;t+=z)this._doProcessBlock(h,t);e=h.splice(0,W),v.sigBytes-=q}return new _.init(e,q)},clone:function(){var r=m.clone.call(this);return r._data=this._data.clone(),r},_minBufferSize:0}),E=n.Hasher=y.extend({cfg:m.extend(),init:function(r){this.cfg=this.cfg.extend(r),this.reset()},reset:function(){y.reset.call(this),this._doReset()},update:function(r){return this._append(r),this._process(),this},finalize:function(r){r&&this._append(r);var e=this._doFinalize();return e},blockSize:512/32,_createHelper:function(r){return function(e,v){return new r.init(v).finalize(e)}},_createHmacHelper:function(r){return function(e,v){return new b.HMAC.init(r,v).finalize(e)}}}),b=P.algo={};return P})(Math);return k})});var Q=I((T,er)=>{(function(k,u){typeof T=="object"?er.exports=T=u(N()):typeof define=="function"&&define.amd?define(["./core"],u):u(k.CryptoJS)})(T,function(k){return(function(){var u=k,A=u.lib,w=A.WordArray,K=u.enc,H=K.Base64={stringify:function(n){var m=n.words,_=n.sigBytes,d=this._map;n.clamp();for(var x=[],l=0;l<_;l+=3)for(var p=m[l>>>2]>>>24-l%4*8&255,y=m[l+1>>>2]>>>24-(l+1)%4*8&255,E=m[l+2>>>2]>>>24-(l+2)%4*8&255,b=p<<16|y<<8|E,r=0;r<4&&l+r*.75<_;r++)x.push(d.charAt(b>>>6*(3-r)&63));var e=d.charAt(64);if(e)for(;x.length%4;)x.push(e);return x.join("")},parse:function(n){var m=n.length,_=this._map,d=this._reverseMap;if(!d){d=this._reverseMap=[];for(var x=0;x<_.length;x++)d[_.charCodeAt(x)]=x}var l=_.charAt(64);if(l){var p=n.indexOf(l);p!==-1&&(m=p)}return P(n,m,d)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function P(n,m,_){for(var d=[],x=0,l=0;l<m;l++)if(l%4){var p=_[n.charCodeAt(l-1)]<<l%4*2,y=_[n.charCodeAt(l)]>>>6-l%4*2,E=p|y;d[x>>>2]|=E<<24-x%4*8,x++}return w.create(d,x)}})(),k.enc.Base64})});var Y=I((V,tr)=>{(function(k,u){typeof V=="object"?tr.exports=V=u(N()):typeof define=="function"&&define.amd?define(["./core"],u):u(k.CryptoJS)})(V,function(k){return(function(){var u=k,A=u.lib,w=A.WordArray,K=A.Hasher,H=u.algo,P=[],n=H.SHA1=K.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(m,_){for(var d=this._hash.words,x=d[0],l=d[1],p=d[2],y=d[3],E=d[4],b=0;b<80;b++){if(b<16)P[b]=m[_+b]|0;else{var r=P[b-3]^P[b-8]^P[b-14]^P[b-16];P[b]=r<<1|r>>>31}var e=(x<<5|x>>>27)+E+P[b];b<20?e+=(l&p|~l&y)+1518500249:b<40?e+=(l^p^y)+1859775393:b<60?e+=(l&p|l&y|p&y)-1894007588:e+=(l^p^y)-899497514,E=y,y=p,p=l<<30|l>>>2,l=x,x=e}d[0]=d[0]+x|0,d[1]=d[1]+l|0,d[2]=d[2]+p|0,d[3]=d[3]+y|0,d[4]=d[4]+E|0},_doFinalize:function(){var m=this._data,_=m.words,d=this._nDataBytes*8,x=m.sigBytes*8;return _[x>>>5]|=128<<24-x%32,_[(x+64>>>9<<4)+14]=Math.floor(d/4294967296),_[(x+64>>>9<<4)+15]=d,m.sigBytes=_.length*4,this._process(),this._hash},clone:function(){var m=K.clone.call(this);return m._hash=this._hash.clone(),m}});u.SHA1=K._createHelper(n),u.HmacSHA1=K._createHmacHelper(n)})(),k.SHA1})});var Z=I((M,nr)=>{(function(k,u){typeof M=="object"?nr.exports=M=u(N()):typeof define=="function"&&define.amd?define(["./core"],u):u(k.CryptoJS)})(M,function(k){(function(){var u=k,A=u.lib,w=A.Base,K=u.enc,H=K.Utf8,P=u.algo,n=P.HMAC=w.extend({init:function(m,_){m=this._hasher=new m.init,typeof _=="string"&&(_=H.parse(_));var d=m.blockSize,x=d*4;_.sigBytes>x&&(_=m.finalize(_)),_.clamp();for(var l=this._oKey=_.clone(),p=this._iKey=_.clone(),y=l.words,E=p.words,b=0;b<d;b++)y[b]^=1549556828,E[b]^=909522486;l.sigBytes=p.sigBytes=x,this.reset()},reset:function(){var m=this._hasher;m.reset(),m.update(this._iKey)},update:function(m){return this._hasher.update(m),this},finalize:function(m){var _=this._hasher,d=_.finalize(m);_.reset();var x=_.finalize(this._oKey.clone().concat(d));return x}})})()})});var ar=I((U,ir)=>{(function(k,u){typeof U=="object"?ir.exports=U=u(N()):typeof define=="function"&&define.amd?define(["./core"],u):u(k.CryptoJS)})(U,function(k){return(function(u){var A=k,w=A.lib,K=w.WordArray,H=w.Hasher,P=A.algo,n=[];(function(){for(var p=0;p<64;p++)n[p]=u.abs(u.sin(p+1))*4294967296|0})();var m=P.MD5=H.extend({_doReset:function(){this._hash=new K.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(p,y){for(var E=0;E<16;E++){var b=y+E,r=p[b];p[b]=(r<<8|r>>>24)&16711935|(r<<24|r>>>8)&4278255360}var e=this._hash.words,v=p[y+0],h=p[y+1],C=p[y+2],z=p[y+3],F=p[y+4],B=p[y+5],W=p[y+6],q=p[y+7],t=p[y+8],c=p[y+9],g=p[y+10],a=p[y+11],S=p[y+12],D=p[y+13],L=p[y+14],R=p[y+15],i=e[0],o=e[1],s=e[2],f=e[3];i=_(i,o,s,f,v,7,n[0]),f=_(f,i,o,s,h,12,n[1]),s=_(s,f,i,o,C,17,n[2]),o=_(o,s,f,i,z,22,n[3]),i=_(i,o,s,f,F,7,n[4]),f=_(f,i,o,s,B,12,n[5]),s=_(s,f,i,o,W,17,n[6]),o=_(o,s,f,i,q,22,n[7]),i=_(i,o,s,f,t,7,n[8]),f=_(f,i,o,s,c,12,n[9]),s=_(s,f,i,o,g,17,n[10]),o=_(o,s,f,i,a,22,n[11]),i=_(i,o,s,f,S,7,n[12]),f=_(f,i,o,s,D,12,n[13]),s=_(s,f,i,o,L,17,n[14]),o=_(o,s,f,i,R,22,n[15]),i=d(i,o,s,f,h,5,n[16]),f=d(f,i,o,s,W,9,n[17]),s=d(s,f,i,o,a,14,n[18]),o=d(o,s,f,i,v,20,n[19]),i=d(i,o,s,f,B,5,n[20]),f=d(f,i,o,s,g,9,n[21]),s=d(s,f,i,o,R,14,n[22]),o=d(o,s,f,i,F,20,n[23]),i=d(i,o,s,f,c,5,n[24]),f=d(f,i,o,s,L,9,n[25]),s=d(s,f,i,o,z,14,n[26]),o=d(o,s,f,i,t,20,n[27]),i=d(i,o,s,f,D,5,n[28]),f=d(f,i,o,s,C,9,n[29]),s=d(s,f,i,o,q,14,n[30]),o=d(o,s,f,i,S,20,n[31]),i=x(i,o,s,f,B,4,n[32]),f=x(f,i,o,s,t,11,n[33]),s=x(s,f,i,o,a,16,n[34]),o=x(o,s,f,i,L,23,n[35]),i=x(i,o,s,f,h,4,n[36]),f=x(f,i,o,s,F,11,n[37]),s=x(s,f,i,o,q,16,n[38]),o=x(o,s,f,i,g,23,n[39]),i=x(i,o,s,f,D,4,n[40]),f=x(f,i,o,s,v,11,n[41]),s=x(s,f,i,o,z,16,n[42]),o=x(o,s,f,i,W,23,n[43]),i=x(i,o,s,f,c,4,n[44]),f=x(f,i,o,s,S,11,n[45]),s=x(s,f,i,o,R,16,n[46]),o=x(o,s,f,i,C,23,n[47]),i=l(i,o,s,f,v,6,n[48]),f=l(f,i,o,s,q,10,n[49]),s=l(s,f,i,o,L,15,n[50]),o=l(o,s,f,i,B,21,n[51]),i=l(i,o,s,f,S,6,n[52]),f=l(f,i,o,s,z,10,n[53]),s=l(s,f,i,o,g,15,n[54]),o=l(o,s,f,i,h,21,n[55]),i=l(i,o,s,f,t,6,n[56]),f=l(f,i,o,s,R,10,n[57]),s=l(s,f,i,o,W,15,n[58]),o=l(o,s,f,i,D,21,n[59]),i=l(i,o,s,f,F,6,n[60]),f=l(f,i,o,s,a,10,n[61]),s=l(s,f,i,o,C,15,n[62]),o=l(o,s,f,i,c,21,n[63]),e[0]=e[0]+i|0,e[1]=e[1]+o|0,e[2]=e[2]+s|0,e[3]=e[3]+f|0},_doFinalize:function(){var p=this._data,y=p.words,E=this._nDataBytes*8,b=p.sigBytes*8;y[b>>>5]|=128<<24-b%32;var r=u.floor(E/4294967296),e=E;y[(b+64>>>9<<4)+15]=(r<<8|r>>>24)&16711935|(r<<24|r>>>8)&4278255360,y[(b+64>>>9<<4)+14]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360,p.sigBytes=(y.length+1)*4,this._process();for(var v=this._hash,h=v.words,C=0;C<4;C++){var z=h[C];h[C]=(z<<8|z>>>24)&16711935|(z<<24|z>>>8)&4278255360}return v},clone:function(){var p=H.clone.call(this);return p._hash=this._hash.clone(),p}});function _(p,y,E,b,r,e,v){var h=p+(y&E|~y&b)+r+v;return(h<<e|h>>>32-e)+y}function d(p,y,E,b,r,e,v){var h=p+(y&b|E&~b)+r+v;return(h<<e|h>>>32-e)+y}function x(p,y,E,b,r,e,v){var h=p+(y^E^b)+r+v;return(h<<e|h>>>32-e)+y}function l(p,y,E,b,r,e,v){var h=p+(E^(y|~b))+r+v;return(h<<e|h>>>32-e)+y}A.MD5=H._createHelper(m),A.HmacMD5=H._createHmacHelper(m)})(Math),k.MD5})});var X=I((j,or)=>{(function(k,u,A){typeof j=="object"?or.exports=j=u(N(),Y(),Z()):typeof define=="function"&&define.amd?define(["./core","./sha1","./hmac"],u):u(k.CryptoJS)})(j,function(k){return(function(){var u=k,A=u.lib,w=A.Base,K=A.WordArray,H=u.algo,P=H.MD5,n=H.EvpKDF=w.extend({cfg:w.extend({keySize:128/32,hasher:P,iterations:1}),init:function(m){this.cfg=this.cfg.extend(m)},compute:function(m,_){for(var d,x=this.cfg,l=x.hasher.create(),p=K.create(),y=p.words,E=x.keySize,b=x.iterations;y.length<E;){d&&l.update(d),d=l.update(m).finalize(_),l.reset();for(var r=1;r<b;r++)d=l.finalize(d),l.reset();p.concat(d)}return p.sigBytes=E*4,p}});u.EvpKDF=function(m,_,d){return n.create(d).compute(m,_)}})(),k.EvpKDF})});var fr=I((J,sr)=>{(function(k,u,A){typeof J=="object"?sr.exports=J=u(N(),X()):typeof define=="function"&&define.amd?define(["./core","./evpkdf"],u):u(k.CryptoJS)})(J,function(k){k.lib.Cipher||(function(u){var A=k,w=A.lib,K=w.Base,H=w.WordArray,P=w.BufferedBlockAlgorithm,n=A.enc,m=n.Utf8,_=n.Base64,d=A.algo,x=d.EvpKDF,l=w.Cipher=P.extend({cfg:K.extend(),createEncryptor:function(t,c){return this.create(this._ENC_XFORM_MODE,t,c)},createDecryptor:function(t,c){return this.create(this._DEC_XFORM_MODE,t,c)},init:function(t,c,g){this.cfg=this.cfg.extend(g),this._xformMode=t,this._key=c,this.reset()},reset:function(){P.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){t&&this._append(t);var c=this._doFinalize();return c},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:(function(){function t(c){return typeof c=="string"?q:F}return function(c){return{encrypt:function(g,a,S){return t(a).encrypt(c,g,a,S)},decrypt:function(g,a,S){return t(a).decrypt(c,g,a,S)}}}})()}),p=w.StreamCipher=l.extend({_doFinalize:function(){var t=this._process(!0);return t},blockSize:1}),y=A.mode={},E=w.BlockCipherMode=K.extend({createEncryptor:function(t,c){return this.Encryptor.create(t,c)},createDecryptor:function(t,c){return this.Decryptor.create(t,c)},init:function(t,c){this._cipher=t,this._iv=c}}),b=y.CBC=(function(){var t=E.extend();t.Encryptor=t.extend({processBlock:function(g,a){var S=this._cipher,D=S.blockSize;c.call(this,g,a,D),S.encryptBlock(g,a),this._prevBlock=g.slice(a,a+D)}}),t.Decryptor=t.extend({processBlock:function(g,a){var S=this._cipher,D=S.blockSize,L=g.slice(a,a+D);S.decryptBlock(g,a),c.call(this,g,a,D),this._prevBlock=L}});function c(g,a,S){var D,L=this._iv;L?(D=L,this._iv=u):D=this._prevBlock;for(var R=0;R<S;R++)g[a+R]^=D[R]}return t})(),r=A.pad={},e=r.Pkcs7={pad:function(t,c){for(var g=c*4,a=g-t.sigBytes%g,S=a<<24|a<<16|a<<8|a,D=[],L=0;L<a;L+=4)D.push(S);var R=H.create(D,a);t.concat(R)},unpad:function(t){var c=t.words[t.sigBytes-1>>>2]&255;t.sigBytes-=c}},v=w.BlockCipher=l.extend({cfg:l.cfg.extend({mode:b,padding:e}),reset:function(){var t;l.reset.call(this);var c=this.cfg,g=c.iv,a=c.mode;this._xformMode==this._ENC_XFORM_MODE?t=a.createEncryptor:(t=a.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,g&&g.words):(this._mode=t.call(a,this,g&&g.words),this._mode.__creator=t)},_doProcessBlock:function(t,c){this._mode.processBlock(t,c)},_doFinalize:function(){var t,c=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(c.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),c.unpad(t)),t},blockSize:128/32}),h=w.CipherParams=K.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}}),C=A.format={},z=C.OpenSSL={stringify:function(t){var c,g=t.ciphertext,a=t.salt;return a?c=H.create([1398893684,1701076831]).concat(a).concat(g):c=g,c.toString(_)},parse:function(t){var c,g=_.parse(t),a=g.words;return a[0]==1398893684&&a[1]==1701076831&&(c=H.create(a.slice(2,4)),a.splice(0,4),g.sigBytes-=16),h.create({ciphertext:g,salt:c})}},F=w.SerializableCipher=K.extend({cfg:K.extend({format:z}),encrypt:function(t,c,g,a){a=this.cfg.extend(a);var S=t.createEncryptor(g,a),D=S.finalize(c),L=S.cfg;return h.create({ciphertext:D,key:g,iv:L.iv,algorithm:t,mode:L.mode,padding:L.padding,blockSize:t.blockSize,formatter:a.format})},decrypt:function(t,c,g,a){a=this.cfg.extend(a),c=this._parse(c,a.format);var S=t.createDecryptor(g,a).finalize(c.ciphertext);return S},_parse:function(t,c){return typeof t=="string"?c.parse(t,this):t}}),B=A.kdf={},W=B.OpenSSL={execute:function(t,c,g,a,S){if(a||(a=H.random(64/8)),S)var D=x.create({keySize:c+g,hasher:S}).compute(t,a);else var D=x.create({keySize:c+g}).compute(t,a);var L=H.create(D.words.slice(c),g*4);return D.sigBytes=c*4,h.create({key:D,iv:L,salt:a})}},q=w.PasswordBasedCipher=F.extend({cfg:F.cfg.extend({kdf:W}),encrypt:function(t,c,g,a){a=this.cfg.extend(a);var S=a.kdf.execute(g,t.keySize,t.ivSize,a.salt,a.hasher);a.iv=S.iv;var D=F.encrypt.call(this,t,c,S.key,a);return D.mixIn(S),D},decrypt:function(t,c,g,a){a=this.cfg.extend(a),c=this._parse(c,a.format);var S=a.kdf.execute(g,t.keySize,t.ivSize,c.salt,a.hasher);a.iv=S.iv;var D=F.decrypt.call(this,t,c,S.key,a);return D}})})()})});var vr=I((G,cr)=>{(function(k,u,A){typeof G=="object"?cr.exports=G=u(N(),Q(),ar(),X(),fr()):typeof define=="function"&&define.amd?define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],u):u(k.CryptoJS)})(G,function(k){return(function(){var u=k,A=u.lib,w=A.BlockCipher,K=u.algo,H=[],P=[],n=[],m=[],_=[],d=[],x=[],l=[],p=[],y=[];(function(){for(var r=[],e=0;e<256;e++)e<128?r[e]=e<<1:r[e]=e<<1^283;for(var v=0,h=0,e=0;e<256;e++){var C=h^h<<1^h<<2^h<<3^h<<4;C=C>>>8^C&255^99,H[v]=C,P[C]=v;var z=r[v],F=r[z],B=r[F],W=r[C]*257^C*16843008;n[v]=W<<24|W>>>8,m[v]=W<<16|W>>>16,_[v]=W<<8|W>>>24,d[v]=W;var W=B*16843009^F*65537^z*257^v*16843008;x[C]=W<<24|W>>>8,l[C]=W<<16|W>>>16,p[C]=W<<8|W>>>24,y[C]=W,v?(v=z^r[r[r[B^z]]],h^=r[r[h]]):v=h=1}})();var E=[0,1,2,4,8,16,32,64,128,27,54],b=K.AES=w.extend({_doReset:function(){var r;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var e=this._keyPriorReset=this._key,v=e.words,h=e.sigBytes/4,C=this._nRounds=h+6,z=(C+1)*4,F=this._keySchedule=[],B=0;B<z;B++)B<h?F[B]=v[B]:(r=F[B-1],B%h?h>6&&B%h==4&&(r=H[r>>>24]<<24|H[r>>>16&255]<<16|H[r>>>8&255]<<8|H[r&255]):(r=r<<8|r>>>24,r=H[r>>>24]<<24|H[r>>>16&255]<<16|H[r>>>8&255]<<8|H[r&255],r^=E[B/h|0]<<24),F[B]=F[B-h]^r);for(var W=this._invKeySchedule=[],q=0;q<z;q++){var B=z-q;if(q%4)var r=F[B];else var r=F[B-4];q<4||B<=4?W[q]=r:W[q]=x[H[r>>>24]]^l[H[r>>>16&255]]^p[H[r>>>8&255]]^y[H[r&255]]}}},encryptBlock:function(r,e){this._doCryptBlock(r,e,this._keySchedule,n,m,_,d,H)},decryptBlock:function(r,e){var v=r[e+1];r[e+1]=r[e+3],r[e+3]=v,this._doCryptBlock(r,e,this._invKeySchedule,x,l,p,y,P);var v=r[e+1];r[e+1]=r[e+3],r[e+3]=v},_doCryptBlock:function(r,e,v,h,C,z,F,B){for(var W=this._nRounds,q=r[e]^v[0],t=r[e+1]^v[1],c=r[e+2]^v[2],g=r[e+3]^v[3],a=4,S=1;S<W;S++){var D=h[q>>>24]^C[t>>>16&255]^z[c>>>8&255]^F[g&255]^v[a++],L=h[t>>>24]^C[c>>>16&255]^z[g>>>8&255]^F[q&255]^v[a++],R=h[c>>>24]^C[g>>>16&255]^z[q>>>8&255]^F[t&255]^v[a++],i=h[g>>>24]^C[q>>>16&255]^z[t>>>8&255]^F[c&255]^v[a++];q=D,t=L,c=R,g=i}var D=(B[q>>>24]<<24|B[t>>>16&255]<<16|B[c>>>8&255]<<8|B[g&255])^v[a++],L=(B[t>>>24]<<24|B[c>>>16&255]<<16|B[g>>>8&255]<<8|B[q&255])^v[a++],R=(B[c>>>24]<<24|B[g>>>16&255]<<16|B[q>>>8&255]<<8|B[t&255])^v[a++],i=(B[g>>>24]<<24|B[q>>>16&255]<<16|B[t>>>8&255]<<8|B[c&255])^v[a++];r[e]=D,r[e+1]=L,r[e+2]=R,r[e+3]=i},keySize:256/32});u.AES=w._createHelper(b)})(),k.AES})});var dr=I((_r,hr)=>{var ur=N();Q();Y();Z();vr();hr.exports=ur});return dr();})();

var DS_BUILD = "1791855838435";
var DS_PACKAGE = "com.zyx.cheyong";
var DS_RSA = {"p":"fbc7ab9d75533e39971e41b554990a57149ea3d115298d9d17630138a40f315339b7a69c6254dde2ffed520f5ad8c48fd2ef18ffd6c97ea0ca8d7329cf0146d5","q":"f36bda059d298c1cf92fae597fcccc5ccb715e3935b485cb4185d20c6c19a3249ca195f4e604ebf1c26f08f75174e72764499d722ee2e10232f16e3aacd9f0fb","dp":"7f28e1d0bd6f944eabb6d942c67e208dc85932ad273dfc4aa984141ad228e6257d51f670a6ecebbf78b81828af1e296fe5fd61a7dc87994f85dd189bb5f3941d","dq":"6d86a9a2bd0464b6e4a83f9aa596509db02c6268fb712e8236093069c67a029e069bee0d333223b7b3f4a1e42612a3af65c079c756b15eecce5f3369d33c7ce1","qi":"88911352f605c0254a3464d8333520eefdd06e5a985c1f88873714dfbb0764e9fa6b8e95e5e24369d6af22fb849a8c491d64f26e2fb566437b2de514838ca50b"};

function dsText(value) { return value == null ? "" : String(value).trim(); }
function dsBytes(word) {
  var out = [];
  for (var i = 0; i < word.sigBytes; i++) out.push((word.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 255);
  return out;
}
function dsWord(bytes) {
  var words = [];
  for (var i = 0; i < bytes.length; i++) words[i >>> 2] = (words[i >>> 2] || 0) | ((bytes[i] & 255) << (24 - (i % 4) * 8));
  return DSCrypto.lib.WordArray.create(words, bytes.length);
}
function dsBase64(value) {
  value = dsText(value).replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(value) || value.length % 4 === 1) throw new Error("解析響應編碼無效");
  while (value.length % 4) value += "=";
  return dsBytes(DSCrypto.enc.Base64.parse(value));
}
function dsStatus(response) { return Number(response && (response.statusCode || response.status)) || 0; }
function dsHeader(headers, name) {
  headers = headers || {};
  var target = name.toLowerCase();
  for (var key in headers) if (key.toLowerCase() === target) return dsText(headers[key]);
  return "";
}
function dsOK(response) { var s = dsStatus(response); return s >= 200 && s < 300; }
function dsJSON(value) {
  if (value && typeof value === "object") return value;
  return JSON.parse(dsText(value).replace(/^\uFEFF/, ""));
}
function dsUTF8(bytes) { return DSCrypto.enc.Utf8.stringify(dsWord(bytes)); }
function dsRandomIV() {
  var a = [];
  for (var i = 0; i < 16; i++) a.push(Math.floor(Math.random() * 256));
  return dsWord(a);
}
function dsRequest(method, data) {
  var key = DSCrypto.MD5(DS_BUILD + "^~!@#[-" + DS_PACKAGE);
  var iv = dsRandomIV();
  var input = {};
  Object.keys(data || {}).forEach(function (k) { input[k] = data[k]; });
  input.token = "";
  var body = JSON.stringify({ method: method, data: input, csrf: Date.now() });
  var encrypted = DSCrypto.AES.encrypt(body, key, { iv: iv, mode: DSCrypto.mode.CBC, padding: DSCrypto.pad.Pkcs7 });
  return iv.clone().concat(encrypted.ciphertext).toString(DSCrypto.enc.Base64).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function dsPow(base, exponent, modulus) {
  var out = BigInt(1), zero = BigInt(0), one = BigInt(1);
  base %= modulus;
  while (exponent > zero) {
    if ((exponent & one) !== zero) out = out * base % modulus;
    exponent >>= one;
    if (exponent > zero) base = base * base % modulus;
  }
  return out;
}
var dsRSAState;
function dsRSA(value) {
  if (typeof BigInt !== "function") throw new Error("播放器的 JavaScript 引擎不支持片源解析");
  if (!dsRSAState) {
    var k = DS_RSA;
    dsRSAState = { p: BigInt("0x" + k.p), q: BigInt("0x" + k.q), dp: BigInt("0x" + k.dp), dq: BigInt("0x" + k.dq), qi: BigInt("0x" + k.qi) };
  }
  var bytes = dsBase64(value), size = 128, decoded = [], r = dsRSAState;
  if (!bytes.length || bytes.length % size || bytes.length > 8192) throw new Error("解析響應分塊無效");
  for (var offset = 0; offset < bytes.length; offset += size) {
    var hex = "";
    for (var i = offset; i < offset + size; i++) hex += ("0" + bytes[i].toString(16)).slice(-2);
    var c = BigInt("0x" + hex), a = dsPow(c, r.dp, r.p), b = dsPow(c, r.dq, r.q);
    var h = (a - b) % r.p;
    if (h < BigInt(0)) h += r.p;
    var m = b + r.q * (r.qi * h % r.p);
    var blockHex = m.toString(16);
    while (blockHex.length < size * 2) blockHex = "0" + blockHex;
    var block = [];
    for (var z = 0; z < blockHex.length; z += 2) block.push(parseInt(blockHex.slice(z, z + 2), 16));
    if (block.length !== size || block[0] !== 0 || (block[1] !== 2 && block[1] !== 1)) throw new Error("解析響應填充校驗失敗");
    var end = 2;
    while (end < block.length && block[end] !== 0) end++;
    if (end < 10 || end === block.length) throw new Error("解析響應填充過短");
    for (var n = end + 1; n < block.length; n++) decoded.push(block[n]);
  }
  return dsUTF8(decoded);
}
function dsReply(value) {
  if (value && typeof value === "object") return value;
  var text = dsText(value);
  if (/^[\[{]/.test(text)) return dsJSON(text);
  if (/^https?:\/\//i.test(text)) return { code: 200, url: text };
  return dsJSON(dsRSA(text));
}
// ---------- 主機容錯 ----------
//
// 背景：本腳本只走官方索引（search/video_detail），
// 一旦該主機不可達就會搜不到片，因此同時嘗試多個索引主機，
// 並與本地快照重放平行進行。
//
// 索引主機候選：app/app2/app3（歷史觀察：app 與 app3 曾解析到同一網段）。
// 平行而非循序：循序嘗試會把整體時間預算燒光，導致快照重放來不及跑；
// 改成全部同時打、第一個成功者贏。
var dsAPIHosts = ["http://app2.dsx.ac", "http://app.dsx.ac", "http://app3.dsx.ac"];
// 單一主機的連線逾時上限（毫秒）。超過就放棄該主機。
// Widget.http 沒有 timeout 選項，所以自己用 Promise.race + setTimeout 兜底。
var dsHostTimeout = 6000;
// 連續失敗的主機，在這個時間窗內不再嘗試（避免每次搜尋都白等逾時）。
var dsHostDownUntil = {};
var dsHostDownWindow = 10 * 60 * 1000;
function dsHostAvailable(host) {
  return !(dsHostDownUntil[host] > Date.now());
}
function dsMarkHostDown(host) {
  dsHostDownUntil[host] = Date.now() + dsHostDownWindow;
}
async function dsRequestWithTimeout(host, body) {
  // Promise.race + setTimeout：若沙箱沒有 setTimeout，退化成不設逾時
  // （Widget.http 底層 fetch 自己會因連線逾時而 reject，不會永久卡死）。
  var request = Widget.http.post(host + "/ndsx.php/v7/logs", body, {
    headers: { "User-Agent": "Dart/3.13 (dart:io)", "Content-Type": "text/plain", version: "2.0.0", "version-number": "220", "pk-id": DS_PACKAGE, "build-time": DS_BUILD, platform: "ios", "platform-version": "Version 27.2 (Build 24B5110a)" }
  });
  if (typeof setTimeout !== "function") return request;
  var timer = null;
  var timeout = new Promise(function (resolve) {
    timer = setTimeout(function () { resolve({ timedOut: true }); }, dsHostTimeout);
  });
  try {
    var result = await Promise.race([request, timeout]);
    return result && result.timedOut ? Promise.reject(new Error("主機連線逾時")) : result;
  } finally {
    if (timer !== null) { try { clearTimeout(timer); } catch (e) {} }
  }
}
// ★ 判斷是否為「連線層」故障（該換主機）。業務層錯誤（HTTP 非 2xx、
//   code != 1）代表主機是活的，只是這次失敗 → 不換主機。
function dsIsConnectionError(error) {
  var message = dsText(error && error.message);
  return /逾時|超時|timeout|ENOTFOUND|ECONN|EAI_AGAIN|fetch failed|socket|網絡|unreachable|aborted/i.test(message);
}
/**
 * 對所有可用主機**平行**發請求，第一個成功者贏。
 * 全部失敗時拋出最有代表性的錯誤。
 */
async function dsAPI(method, input) {
  var body = dsRequest(method, input), candidates = dsAPIHosts.filter(dsHostAvailable);
  if (!candidates.length) {
    // 全部被標記為故障 → 清掉標記再試一次（避免永久鎖死）。
    dsHostDownUntil = {};
    candidates = dsAPIHosts.slice();
  }
  var attempts = candidates.map(function (host) {
    return dsRequestWithTimeout(host, body).then(function (response) {
      if (!dsOK(response)) throw new Error("官方索引接口暫不可用（HTTP " + dsStatus(response) + "）");
      var data = dsJSON(response.data);
      if (!data || Number(data.code) !== 1) throw new Error("官方索引未返回有效影視數據");
      return { ok: true, data: data };
    }).catch(function (error) {
      if (dsIsConnectionError(error)) dsMarkHostDown(host);
      return { ok: false, error: error, host: host };
    });
  });
  var results = [];
  // 競速：首個成功即回，不等最慢主機（功能不變，只是少等慢主機）。
  await new Promise(function (resolve) {
    var pending = attempts.length;
    if (!pending) resolve();
    attempts.forEach(function (p) {
      p.then(function (r) {
        results.push(r);
        if (r.ok) resolve();
        else if (--pending === 0) resolve();
      }, function (e) {
        results.push({ ok: false, error: e });
        if (--pending === 0) resolve();
      });
    });
  });
  for (var i = 0; i < results.length; i++) if (results[i].ok) return results[i].data;
  // 全部失敗：挑一個「連線層」錯誤當主要錯誤（它纔是使用者該看到的根因）。
  var connectionError = null, businessError = null;
  for (var j = 0; j < results.length; j++) {
    var r = results[j];
    if (!r.error) continue;
    if (dsIsConnectionError(r.error)) { if (!connectionError) connectionError = r.error; }
    else if (!businessError) businessError = r.error;
  }
  throw connectionError || businessError || new Error("官方索引接口暫不可用");
}
function dsResolve(base, value) {
  value = dsText(value);
  if (/^https?:\/\//i.test(value)) return value;
  var match = dsText(base).match(/^(https?:)\/\/([^/]+)/i);
  if (!match) return "";
  if (value.indexOf("//") === 0) return match[1] + value;
  var origin = match[1] + "//" + match[2], clean = String(base).split("#")[0];
  if (value.charAt(0) === "?") return clean.split("?")[0] + value;
  var suffix = (value.match(/[?#].*$/) || [""])[0], path = value.split(/[?#]/)[0];
  if (path.charAt(0) !== "/") path = clean.slice(origin.length).split("?")[0].replace(/[^/]*$/, "") + path;
  var stack = [];
  path.split("/").forEach(function (part) { if (!part || part === ".") return; if (part === "..") stack.pop(); else stack.push(part); });
  return origin + "/" + stack.join("/") + suffix;
}
function dsHeaders(value) {
  var out = {};
  if (value && typeof value === "object") {
    Object.keys(value).forEach(function (key) { if (!/^(host|content-length|connection|range|cookie|authorization)$/i.test(key)) out[key] = String(value[key]); });
    return out;
  }
  dsText(value).split(/\r?\n|\\n/).forEach(function (line) {
    var m = line.match(/^\s*([^:]+):\s*(.*?)\s*$/);
    if (m && !/^(host|content-length|connection|range|cookie|authorization)$/i.test(m[1])) out[m[1]] = m[2];
  });
  return out;
}
function dsMerge(a, b) {
  var out = {};
  [a || {}, b || {}].forEach(function (x) { Object.keys(x).forEach(function (k) {
    Object.keys(out).forEach(function (old) { if (old.toLowerCase() === k.toLowerCase()) delete out[old]; });
    out[k] = x[k];
  }); });
  return out;
}
function dsValidURL(url) {
  var match = dsText(url).match(/^https?:\/\/([^/?#]+)/i);
  if (!match || /@|\s/.test(match[1])) return false;
  return !/^(?:localhost|127(?:\.\d{1,3}){1,3}|0\.0\.0\.0|\[::1\])(?::|$)/i.test(match[1]);
}
// 無損加速 2+3+4：單次請求逾時（避免一條死線卡住整批；正常線 1~3 秒內回，不受影響）。
function dsWithTimeout(promise, ms) {
  if (typeof setTimeout !== "function") return promise;
  var timer = null;
  var timeout = new Promise(function (resolve) {
    timer = setTimeout(function () { resolve({ __dsTimedOut: true }); }, ms);
  });
  return Promise.race([promise, timeout]).then(function (r) {
    if (timer !== null) { try { clearTimeout(timer); } catch (e) {} }
    return r && r.__dsTimedOut ? Promise.reject(new Error("請求逾時")) : r;
  }, function (e) {
    if (timer !== null) { try { clearTimeout(timer); } catch (e2) {} }
    throw e;
  });
}
async function dsMedia(url, headers, binary, deadline) {
  if (!dsValidURL(url)) throw new Error("播放地址無效");
  for (var i = 0; i < 4; i++) {
    if (Date.now() >= deadline) throw new Error("探測時限已到");
    var response = await dsWithTimeout(Widget.http.get(url, { headers: headers, base64Data: !!binary, allow_redirects: false }), 5500);
    var status = dsStatus(response);
    if (status >= 300 && status < 400) {
      var location = dsHeader(response.headers, "Location");
      if (!location) throw new Error("媒體跳轉無地址");
      url = dsResolve(url, location);
      if (!dsValidURL(url)) throw new Error("媒體跳轉無效");
      continue;
    }
    if (!dsOK(response)) throw new Error("媒體探測失敗");
    return { response: response, url: url };
  }
  throw new Error("媒體跳轉過多");
}
function dsLooksMedia(bytes) {
  var text = "";
  for (var i = 0; i < Math.min(bytes.length, 64); i++) text += String.fromCharCode(bytes[i]);
  // ★ 先擋掉「看起來像媒體但其實不是」的常見容器頭。
  //   已知誤判類型：某些線路的 segment 302 → image/png（1x1 佔位圖），
  //   若只看媒體頭/不擋 image/*，圖片會被當成影片回傳。
  //   完善：PNG/GIF/WEBP 一律用位元組比對（原正則依賴源文件編碼藏 0x89，易失效）。
  if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) return false;
  if (bytes[0] === 71 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 56) return false;
  // RIFF 本身是容器（AVI/WAV/WebP 共用頭），只有 bytes[8..11]=="WEBP" 纔是圖片。
  if (bytes[0] === 82 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 70
    && bytes[8] === 87 && bytes[9] === 69 && bytes[10] === 66 && bytes[11] === 80) return false;
  if (/(ftyp|styp|moof|moov|mdat)/.test(text.slice(0, 32))) return true;
  if (bytes[0] === 26 && bytes[1] === 69 && bytes[2] === 223 && bytes[3] === 163) return true;
  if (bytes[0] === 0 && bytes[1] === 0 && bytes[2] === 1 && bytes[3] === 186) return true;
  if (bytes[0] === 255 && (bytes[1] & 246) === 240) return true;
  if (text.indexOf("ID3") === 0) return true;
  for (var n = 0; n < Math.min(512, bytes.length - 376); n++) {
    if (bytes[n] === 71 && bytes[n + 188] === 71 && bytes[n + 376] === 71) return true;
  }
  return false;
}
// ★ 判斷「這段內容其實是錯誤頁/文字，不是媒體」。
//   既有缺陷：某些第三方線路的 segment 回 302 → 轉到 image/png，
//   而舊檢查式 /^\s*(?:<!doctype|<html|<\?xml|\{"(?:code|error|message))/i
//   漏掉了 <pre> 開頭的錯誤頁（Python/Node 風格的 stack trace），
//   於是錯誤頁被當成「可播線路」回傳，使用者點了只會轉圈。
function dsLooksErrorPage(head, contentType) {
  var text = dsText(head);
  // 明確的媒體型別 → 不可能是錯誤頁
  if (/^(video|audio)\//.test(contentType) || /application\/(?:octet-stream|mp4|x-mpegurl|vnd\.apple\.mpegurl)/.test(contentType)) return false;
  // HTML / JSON / XML → 直接判定不是媒體
  if (/text\/html|application\/(?:json|xml)|image\/svg/.test(contentType)) return true;
  // ★ 補上原本漏掉的 <pre> / <body> / <h1> 等文字型錯誤頁
  if (/^\s*(?:<!doctype|<html|<head|<body|<pre|<h1|<h2|<title|<\?xml|\{"(?:code|error|message|msg)|error\s*[:：]|404|403|500|502|503)\b/i.test(text)) return true;
  // 純文字（沒有二進位控制字元）→ 幾乎確定是錯誤訊息
  var binary = 0;
  for (var i = 0; i < Math.min(text.length, 512); i++) { var c = text.charCodeAt(i); if (c < 9 || (c > 13 && c < 32)) binary++; }
  if (binary === 0 && text.length >= 8) return true;
  return false;
}
async function dsProbeBytes(url, headers, kind, offset, length, deadline, encrypted, initial) {
  var start = Number(offset) || 0, amount = Math.min(4096, Number(length) || 1024);
  var requestHeaders = dsMerge(headers, { Range: "bytes=" + start + "-" + (start + amount - 1) });
  var got = initial || await dsMedia(url, requestHeaders, true, deadline);
  var response = got.response, type = dsHeader(response.headers, "Content-Type").toLowerCase();
  // ★ content-type 檢查：image/* 一律不是影片（某些第三方線路的 segment
  //   302 → image/png 的 1x1 佔位圖，原本會被當成影片放行）。
  if (typeof response.data !== "string" || /^image\//.test(type) || /text\/html|application\/(?:json|xml)|image\/svg/.test(type)) throw new Error("媒體返回非視頻正文");
  var bytes = dsBase64(response.data);
  if (kind === "key") {
    if (bytes.length !== 16) throw new Error("HLS 密鑰不是 16 字節");
    return got.url;
  }
  if (bytes.length < 32) throw new Error("媒體片段爲空或過短");
  var head = "";
  for (var i = 0; i < Math.min(bytes.length, 64); i++) head += String.fromCharCode(bytes[i]);
  // ★ 用擴充後的錯誤頁判定（涵蓋 <pre> stack trace、純文字錯誤訊息）。
  if (dsLooksErrorPage(head, type)) throw new Error("媒體實際爲錯誤頁面");
  if (!encrypted && !dsLooksMedia(bytes)) throw new Error("未識別到可解複用媒體頭");
  return got.url;
}
function dsAttr(line, name) {
  var exp = new RegExp("(?:^|[:,])\\s*" + name + "=(?:\"([^\"]*)\"|([^,]*))", "i"), m = line.match(exp);
  return m ? (m[1] == null ? m[2] : m[1]) : "";
}
function dsRange(value) {
  var m = dsText(value).match(/^(\d+)(?:@(\d+))?$/);
  return m ? { length: Number(m[1]), offset: Number(m[2] || 0) } : { length: 1024, offset: 0 };
}
async function dsProbeHLS(url, headers, deadline, depth, inheritedKey) {
  if (depth > 3) throw new Error("HLS 層級過深");
  var got = await dsMedia(url, headers, false, deadline), text = dsText(got.response.data);
  if (!/^#EXTM3U/.test(text) || text.length > 3000000) throw new Error("非有效 HLS 播放列表");
  var lines = text.split(/\r?\n/).map(dsText).filter(function (x) { return !!x; }), variants = [], audio = {};
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf("#EXT-X-MEDIA:") === 0 && dsAttr(lines[i], "TYPE") === "AUDIO" && dsAttr(lines[i], "URI")) audio[dsAttr(lines[i], "GROUP-ID")] = dsResolve(got.url, dsAttr(lines[i], "URI"));
    if (lines[i].indexOf("#EXT-X-STREAM-INF:") !== 0) continue;
    for (var j = i + 1; j < lines.length; j++) {
      if (lines[j].charAt(0) === "#") continue;
      variants.push({ url: dsResolve(got.url, lines[j]), bandwidth: Number(dsAttr(lines[i], "BANDWIDTH")), resolution: dsAttr(lines[i], "RESOLUTION"), audio: dsAttr(lines[i], "AUDIO") });
      break;
    }
  }
  if (variants.length) {
    variants.sort(function (a, b) { return b.bandwidth - a.bandwidth; });
    for (var v = 0; v < Math.min(variants.length, 3); v++) {
      try {
        var child = await dsProbeHLS(variants[v].url, headers, deadline, depth + 1, inheritedKey);
        var audioURL = audio[variants[v].audio];
        if (audioURL) await dsProbeHLS(audioURL, headers, deadline, depth + 1, inheritedKey);
        var res = variants[v].resolution.match(/\d+x(\d+)/i);
        return { url: audioURL ? got.url : child.url, type: "HLS", quality: res ? res[1] + "P" : child.quality || "" };
      } catch (error) {}
    }
    throw new Error("沒有子播放列表通過探測");
  }
  var segment = "", init = "", key = inheritedKey || "", range = { length: 1024, offset: 0 }, initRange = range;
  for (var n = 0; n < lines.length; n++) {
    var line = lines[n];
    if (line.indexOf("#EXT-X-MAP:") === 0) { init = dsResolve(got.url, dsAttr(line, "URI")); initRange = dsRange(dsAttr(line, "BYTERANGE")); }
    if (line.indexOf("#EXT-X-KEY:") === 0) {
      var method = dsAttr(line, "METHOD");
      if (method === "NONE") key = "";
      else if (method === "AES-128" && dsAttr(line, "URI")) key = dsResolve(got.url, dsAttr(line, "URI"));
      else throw new Error("不支持的加密媒體類型");
    }
    if (line.indexOf("#EXT-X-BYTERANGE:") === 0) range = dsRange(line.slice(17));
    if (line.charAt(0) !== "#") { segment = dsResolve(got.url, line); break; }
  }
  if (!segment) throw new Error("HLS 無媒體片段");
  var tasks = [dsProbeBytes(segment, headers, "segment", range.offset, range.length, deadline, !!key)];
  if (init && init !== segment) tasks.push(dsProbeBytes(init, headers, "init", initRange.offset, initRange.length, deadline, false));
  if (key) tasks.push(dsProbeBytes(key, headers, "key", 0, 16, deadline, false));
  await Promise.all(tasks);
  return { url: got.url, type: "HLS", quality: "" };
}
// ---------- 列表秒出：輕量探測（只驗文本，不拉分片） ----------
//
// A 方案：列表階段只打解析 + 拉一層 m3u8 驗 #EXTM3U（或直鏈驗媒體頭），
// 不拉分片/key，點播時播放器自己會拉。所以壞線可能混進列表，點了才轉圈。
async function dsProbeFast(url, headers, mediaHint, deadline) {
  if (/\.m3u8(?:[?#]|$)/i.test(url)) {
    var got = await dsMedia(url, headers, false, deadline), text = dsText(got.response.data);
    if (!/^#EXTM3U/.test(text) || text.length > 3000000) throw new Error("非有效 HLS 播放列表");
    return { url: got.url, type: "HLS", quality: "" };
  }
  var initial = await dsMedia(url, dsMerge(headers, { Range: "bytes=0-4095" }), true, deadline);
  if (typeof initial.response.data !== "string") throw new Error("媒體首包無效");
  var bytes = dsBase64(initial.response.data), prefix = "";
  for (var i = 0; i < Math.min(bytes.length, 64); i++) prefix += String.fromCharCode(bytes[i]);
  if (/^(?:\u00ef\u00bb\u00bf)?\s*#EXTM3U/.test(prefix)) {
    var got2 = await dsMedia(initial.url, headers, false, deadline), text2 = dsText(got2.response.data);
    if (!/^#EXTM3U/.test(text2)) throw new Error("非有效 HLS 播放列表");
    return { url: got2.url, type: "HLS", quality: "" };
  }
  var head = "";
  for (var j = 0; j < Math.min(bytes.length, 64); j++) head += String.fromCharCode(bytes[j]);
  var ctype = dsHeader(initial.response.headers, "Content-Type").toLowerCase();
  if (dsLooksErrorPage(head, ctype)) throw new Error("媒體實際為錯誤頁面");
  if (!dsLooksMedia(bytes)) throw new Error("未識別到可解複用媒體頭");
  return { url: initial.url, type: "直鏈", quality: "" };
}
async function dsProbe(url, headers, mediaHint, deadline) {
  if (/\.m3u8(?:[?#]|$)/i.test(url)) return await dsProbeHLS(url, headers, deadline, 0, "");
  var initial = await dsMedia(url, dsMerge(headers, { Range: "bytes=0-4095" }), true, deadline);
  if (typeof initial.response.data !== "string") throw new Error("媒體首包無效");
  var bytes = dsBase64(initial.response.data), prefix = "";
  for (var i = 0; i < Math.min(bytes.length, 64); i++) prefix += String.fromCharCode(bytes[i]);
  if (/^(?:\u00ef\u00bb\u00bf)?\s*#EXTM3U/.test(prefix)) return await dsProbeHLS(initial.url, headers, deadline, 0, "");
  var finalURL = await dsProbeBytes(url, headers, "video", 0, 4096, deadline, false, initial);
  return { url: finalURL, type: "直鏈", quality: "" };
}
// ==================== 繁簡互通（照 VOD源流式增強專業版做法） ====================
// 官方索引只收簡體；Forward 帶入多為繁體。搜尋前轉簡體送索引，
// 比對時兩邊都正規化到繁體鍵，顯示層已是繁體故不二次轉換。
var dsSimpChars='万与丑专业丛东丝丢两严丧个丰临为丽举么义乌乐乔习乡书买乱争于亏云亘亚产亩亲亵亸亿仅仆从仑仓仪们价众优伙会伛伞伟传伡伣伤伥伦伧伪伫体余佣佥侠侣侥侦侧侨侩侪侬俣俦俨俩俪俫俭债倾偬偻偾偿傤傥傧储傩儿兑兖党兰关兴兹养兽冁内冈册写军农冯冲决况冻净凄准凉减凑凛几凤凫凭凯凶击凿刍划刘则刚创删别刬刭刹刽刿剀剂剐剑剥剧劝办务劢动励劲劳势勋勚匀匦匮区医华协单卖占卢卤卧卫却卺厂厅历厉压厌厍厐厕厘厢厣厦厨厩厮县叁参叆叇双发变叙叠台叶号叹叽吁吃后吓吕吗吣吨听启吴呐呒呓呕呖呗员呙呛呜咏咙咛咝咤咨咸响哑哒哓哔哕哗哙哜哝哟唇唛唝唠唡唢唤啧啬啭啮啯啰啴啸喂喷喽喾嗫嗳嘘嘤嘱噜嚣团园囱围囵国图圆圣圹场坏块坚坛坜坝坞坟坠垄垅垆垒垦垩垫垭垯垱垲垴埘埙埚堑堕塆墙壮声壳壶壸处备复够头夸夹夺奁奂奋奖奥妆妇妈妩妪妫姗姹娄娅娆娇娈娱娲娴婳婴婵婶媪媭嫒嫔嫱嬷孙学孪宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尝尧尴尸尽层屃屉届属屡屦屿岁岂岖岗岘岚岛岩岭岳岽岿峃峄峡峣峤峥峦峰崂崃崄崭嵘嵚嵝巅巩巯币帅师帏帐帘帜带帧帮帱帻帼幂干并广庄庆床庐庑库应庙庞废庼廪开异弃弑张弥弪弯弹强归当录彟彦彨彻征径徕忆忏忧忾怀态怂怃怄怅怆怜总怼怿恋恒恳恶恸恹恺恻恼恽悦悫悬悭悮悯惊惧惨惩惫惬惭惮惯愠愤愦愿慑慭懑懒懔戆戋戏戗战戬戯户扑托执扩扪扫扬扰抚抛抟抠抡抢护报担拟拢拣拥拦拧拨择挂挚挛挜挝挞挟挠挡挢挣挤挥挦捝捞损捡换捣据掳掴掷掸掺掼揽揾揿搀搁搂搄搅携摄摅摆摇摈摊撄撑撵撷撸撺擞攒敌敚敛敩数斋斓斗斩断无旧时旷旸昙昵昼昽显晋晒晓晔晕晖暂暧术朴机杀杂权杠条来杨杩杰极构枞枢枣枥枧枨枪枫枭柜柠柽栀栅标栈栉栊栋栌栎栏树栖栗样栾桠桡桢档桤桥桦桧桨桩桪梦梼梾梿检棁棂椁椝椟椠椢椤椫椭椮楼榄榅榇榈榉榝槚槛槟槠横樯樱橥橱橹橼檩欢欤欧歼殁殇残殒殓殚殡殴毁毂毕毙毡毵氇气氢氩氲汇汉汤汹沟没沣沤沥沦沧沨沩沪泞泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浉浊测浍济浏浐浑浒浓浔浕涂涌涚涛涝涞涟涠涡涢涣涤润涧涨涩淀渊渌渍渎渐渑渔渗温游湾湿溁溃溅溆溇滗滚滞滟滠满滢滤滥滦滨滩滪漤潆潇潋潍潜潴澛澜濑濒灏灭灯灵灶灾灿炀炉炖炜炝点炼炽烁烂烃烛烟烦烧烨烩烫烬热焕焖焘煴熏爱爷牍牦牵牺犊状犷犸犹狈狝狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玙玚玛玮环现玱玺珐珑珰珲琎琏琐琼瑶瑷瑸璎瓒瓮瓯电画畅畴疖疗疟疠疡疬疭疮疯疱疴痈痉痒痖痨痪痫痳痴瘅瘆瘗瘘瘪瘫瘾瘿癞癣癫皂皑皱皲盏盐监盖盗盘眍眦眬睁睐睑瞆瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硁硕硖硗硙硚确硵硷碍碛碜碱礼祃祎祢祯祷祸禀禄禅离秃秆种秘积称秽秾税稣稳穑穞穷窃窍窎窑窜窝窥窦窭竖竞笃笋笔笕笺笼笾筑筚筛筜筝筹筼签筿简箓箦箧箨箩箪箫篑篓篮篯篱簖籁籴类籼粜粝粤粪粮粽糁糇糍紧絷纟纠纡红纣纤纥约级纨纩纪纫纬纭纮纯纰纱纲纳纴纵纶纷纸纹纺纻纼纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绖绗绘给绚绛络绝绞统绠绡绢绣绤绥绦继绨绩绪绫绬续绮绯绰绱绲绳维绵绶绷绸绹绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缊缋缌缍缎缏缑缒缓缔缕编缗缘缙缚缛缜缝缞缟缠缡缢缣缤缥缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡群翘翙翚耢耧耸耻聂聋职聍联聩聪肃肠肤肮肴肾肿胀胁胆胜胧胨胪胫胶脉脍脏脐脑脓脔脚脱脶脸腊腌腘腭腻腼腽腾膑膻臜舆舣舰舱舻艰艳艺节芈芗芜芦苁苇苈苋苌苍苏苧苹范茎茏茑茔茕茧荆荐荙荚荛荜荝荞荟荠荡荣荤荥荦荧荨荩荪荫荬荭荮药莅莱莲莳莴莶获莸莹莺莼萚萝萤营萦萧萨葱蒀蒇蒉蒋蒌蒏蓝蓟蓠蓣蓥蓦蔂蔷蔹蔺蔼蕰蕲蕴薮藓蘖虏虑虚虫虬虮虱虽虾虿蚀蚁蚂蚃蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝎蝼蝾螀螨蟏衅衔补衬衮袄袅袆袜袭袯装裆裈裢裣裤裥褛褴襕见观觃规觅视觇览觉觊觋觌觍觎觏觐觑觞触觯訚詟誉誊讠计订讣认讥讦讧讨让讪讫训议讯记讱讲讳讴讵讶讷许讹论讻讼讽设访诀证诂诃评诅识诇诈诉诊诋诌词诎诏诐译诒诓诔试诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诪诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谉谊谋谌谍谎谏谐谑谒谓谔谕谖谗谙谚谛谜谝谞谟谠谡谢谣谤谥谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶豮贝贞负贠贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赑赒赓赔赕赖赗赘赙赚赛赜赝赞赟赠赡赢赣赪赵赶趋趱趸跃跄跖跞践跶跷跸跹跻踊踌踪踬踯蹑蹒蹰蹿躏躜躯车轧轨轩轪轫转轭轮软轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辀辁辂较辄辅辆辇辈辉辊辋辌辍辎辏辐辑辒输辔辕辖辗辘辙辚辞辟辩辫边辽达迁过迈运还这进远违连迟迩迳迹适选逊递逦逻遗遥邓邝邬邮邹邺邻郁郏郐郑郓郦郧郸酂酝酦酱酽酾酿采释里鉴銮錾钅钆钇针钉钊钋钌钍钎钏钐钑钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铇铈铉铊铋铌铍铎铏铐铑铒铓铔铕铖铗铘铙铚铛铜铝铞铟铠铡铢铣铤铥铦铧铨铩铪铫铬铭铮铯铰铱铲铳铴铵银铷铸铹铺铻铼铽链铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗锘错锚锛锜锝锞锟锠锡锢锣锤锥锦锧锨锩锪锫锬锭键锯锰锱锲锳锴锵锶锷锸锹锻锼锽锾锿镀镁镂镃镄镅镆镇镈镉镊镋镌镍镎镏镐镑镒镓镔镕镖镗镘镙镚镛镜镝镞镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镵镶长门闩闪闫闬闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾闿阀阁阂阃阄阅阆阇阈阉阊阋阌阍阎阏阐阑阒阓阔阕阖阗阘阙阚阛队阳阴阵阶际陆陇陈陉陕陦陧陨险随隐隶隽难雇雏雠雳雾霁霉霡霭靓靔静靥鞑鞒鞯鞲韦韧韨韩韪韫韬韵页顶顷顸项顺须顼顽顾顿颀颁颂颃预颅领颇颈颉颊颋颌颍颎颏颐频颒颓颔颕颖颗题颙颚颛颜额颞颟颠颡颢颣颤颥颦颧风飏飐飑飒飓飔飕飖飗飘飙飚飞飨餍饣饤饥饦饧饨饩饪饫饬饭饮饯饰饱饲饳饴饵饶饷饸饹饺饻饼饽饾饿馁馂馃馄馅馆馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕马驭驮驯驰驱驲驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骃骄骅骆骇骈骉骊骋验骍骎骏骐骑骒骓骔骕骖骗骘骙骚骛骜骝骞骟骠骡骢骣骤骥骦骧髅髋髌鬓鬶魇魉鱼鱽鱾鱿鲀鲁鲂鲄鲅鲆鲇鲈鲉鲊鲋鲌鲍鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲜鲝鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳛鳜鳝鳞鳟鳠鳡鳢鳣鸟鸠鸡鸢鸣鸤鸥鸦鸧鸨鸩鸪鸫鸬鸭鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鸿鹀鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹍鹎鹏鹐鹑鹒鹓鹔鹕鹖鹗鹘鹙鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹤鹥鹦鹧鹨鹩鹪鹫鹬鹭鹯鹰鹱鹲鹳鹴鹾麦麸黄黉黡黩黪黾鼋鼌鼍鼗鼹齐齑齿龀龁龂龃龄龅龆龇龈龉龊龋龌龙龚龛龟鿒鿔鿭';
var dsTradChars='萬與醜專業叢東絲丟兩嚴喪個豐臨爲麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅僕從侖倉儀們價衆優夥會傴傘偉傳俥俔傷倀倫傖僞佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷倈儉債傾傯僂僨償儎儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農馮衝決況凍淨悽準涼減湊凜幾鳳鳧憑凱兇擊鑿芻劃劉則剛創刪別剗剄剎劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳勩勻匭匱區醫華協單賣佔盧滷臥衛卻巹廠廳歷厲壓厭厙龎廁釐廂厴廈廚廄廝縣叄參靉靆雙發變敘疊臺葉號嘆嘰籲喫後嚇呂嗎唚噸聽啓吳吶嘸囈嘔嚦唄員咼嗆嗚詠嚨嚀噝吒諮鹹響啞噠嘵嗶噦譁噲嚌噥喲脣嘜嗊嘮啢嗩喚嘖嗇囀齧嘓囉嘽嘯餵噴嘍嚳囁噯噓嚶囑嚕囂團園囪圍圇國圖圓聖壙場壞塊堅壇壢壩塢墳墜壟壠壚壘墾堊墊埡墶壋塏堖塒壎堝塹墮壪牆壯聲殼壺壼處備復夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗嬀姍奼婁婭嬈嬌孌娛媧嫺嫿嬰嬋嬸媼嬃嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵嘗堯尷屍盡層屓屜屆屬屢屨嶼歲豈嶇崗峴嵐島巖嶺嶽崬巋嶨嶧峽嶢嶠崢巒峯嶗崍嶮嶄嶸嶔嶁巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪幹並廣莊慶牀廬廡庫應廟龐廢廎廩開異棄弒張彌弳彎彈強歸當錄彠彥彲徹徵徑徠憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀恆懇惡慟懨愷惻惱惲悅愨懸慳悞憫驚懼慘懲憊愜慚憚慣慍憤憒願懾憖懣懶懍戇戔戲戧戰戩戱戶撲託執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏挩撈損撿換搗據擄摑擲撣摻摜攬搵撳攙擱摟揯攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵敓斂斆數齋斕鬥斬斷無舊時曠暘曇暱晝曨顯晉曬曉曄暈暉暫曖術樸機殺雜權槓條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲慄樣欒椏橈楨檔榿橋樺檜槳樁樳夢檮棶槤檢梲欞槨槼櫝槧槶欏樿橢槮樓欖榲櫬櫚櫸樧檟檻檳櫧橫檣櫻櫫櫥櫓櫞檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳匯漢湯洶溝沒灃漚瀝淪滄渢潙滬濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧涗濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁滲溫遊灣溼濚潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦灠瀠瀟瀲濰潛瀦瀂瀾瀨瀕灝滅燈靈竈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾熅燻愛爺牘犛牽犧犢狀獷獁猶狽獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽琺瓏璫琿璡璉瑣瓊瑤璦璸瓔瓚甕甌電畫暢疇癤療瘧癘瘍癧瘲瘡瘋皰痾癰痙癢瘂癆瘓癇痲癡癉瘮瘞瘻癟癱癮癭癩癬癲皁皚皺皸盞鹽監蓋盜盤瞘眥矓睜睞瞼瞶瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜碩硤磽磑礄確磠礆礙磧磣鹼禮禡禕禰禎禱禍稟祿禪離禿稈種祕積稱穢穠稅穌穩穡穭窮竊竅窵窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌篔籤篠簡籙簀篋籜籮簞簫簣簍籃籛籬籪籟糴類秈糶糲粵糞糧糉糝餱餈緊縶糹糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺紲紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽鞝緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒繮繾繰繯繳纘罌網羅罰罷羆羈羥羨羣翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚骯餚腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏羶臢輿艤艦艙艫艱豔藝節羋薌蕪蘆蓯葦藶莧萇蒼蘇薴蘋範莖蘢蔦塋煢繭荊薦薘莢蕘蓽萴蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蒕蕆蕢蔣蔞醟藍薊蘺蕷鎣驀虆薔蘞藺藹薀蘄蘊藪蘚櫱虜慮虛蟲虯蟣蝨雖蝦蠆蝕蟻螞蠁蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襉褸襤襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶誾讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談讅誼謀諶諜謊諫諧謔謁謂諤諭諼讒諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗贊贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭闢辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郟鄶鄭鄆酈鄖鄲酇醞醱醬釅釃釀採釋裏鑑鑾鏨釒釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷鉢鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鉋鈰鉉鉈鉍鈮鈹鐸鉶銬銠鉺鋩錏銪鋮鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鎩鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺鍩錯錨錛錡鍀錁錕錩錫錮鑼錘錐錦鑕鍁錈鍃錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍛鎪鍠鍰鎄鍍鎂鏤鎡鐨鎇鏌鎮鎛鎘鑷钂鐫鎳鎿鎦鎬鎊鎰鎵鑌鎔鏢鏜鏝鏍鏰鏞鏡鏑鏃鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑱鑲長門閂閃閆閈閉問闖閏闈閒閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隯隉隕險隨隱隸雋難僱雛讎靂霧霽黴霢靄靚靝靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飈飛饗饜飠飣飢飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢鬹魘魎魚魛魢魷魨魯魴魺鮁鮃鮎鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鰺鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鰲鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鷽鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鵾鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶖鷀鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜鿓鎶鉨';
var dsVariantMap={'迴':'回','鍊':'炼','裡':'里','裏':'里','臺':'台','檯':'台','週':'周','餘':'余','髮':'发','佈':'布','纔':'才','眾':'众','傢':'家','牀':'床','綫':'线','絨':'绒','網':'网','嶽':'岳','麪':'面','麵':'面','祕':'秘','菸':'烟','囉':'啰','啟':'启','剋':'克','勩':'勚','囑':'嘱','彆':'别','註':'注','讚':'赞','昇':'升','誌':'志','爲':'为','牠':'它','衆':'众','妳':'你','衹':'只','祗':'只','鍾':'钟','靑':'青','儘':'尽','顛':'颠','睏':'困','稜':'棱','糉':'粽'};
var dsTradToSimp={}, dsSimpToTrad={};
(function(){for(var i=0;i<dsSimpChars.length;i++){var s=dsSimpChars.charAt(i),t=dsTradChars.charAt(i);if(s==='咤'&&t==='吒')continue;dsSimpToTrad[s]=t;if(!dsTradToSimp[t])dsTradToSimp[t]=s;}for(var k in dsVariantMap){if(!dsTradToSimp[k])dsTradToSimp[k]=dsVariantMap[k];var sv=dsVariantMap[k];if(!dsSimpToTrad[sv])dsSimpToTrad[sv]=k;}})();
function dsToSimp(text){text=dsText(text);var out='';for(var i=0;i<text.length;i++){var ch=text.charAt(i);out+=dsTradToSimp[ch]||ch;}return out;}
function dsSearchVariants(keyword){var out=[],seen={};function push(v){v=dsText(v);if(v&&!seen[v]){seen[v]=true;out.push(v);}}push(keyword);push(dsToSimp(keyword));return out;}
function dsNormKey(text){text=dsToSimp(dsText(text)).toLowerCase().replace(/\[[^\]]*\]|【[^】]*】|\([^)]*\)|（[^）]*）/g,'').replace(/[\s\-_:：·.,，。!！?？/\\'"“”‘’]/g,'');var out='';for(var i=0;i<text.length;i++){var ch=text.charAt(i);out+=dsSimpToTrad[ch]||ch;}return out;}
function dsTitleKey(value) {
  return dsNormKey(value);
}
function dsNumber(value) {
  if (/^\d+$/.test(value)) return Number(value);
  var map = { 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 零: 0 }, parts = String(value || "").split("十");
  if (parts.length === 2) return (map[parts[0]] || 1) * 10 + (map[parts[1]] || 0);
  return map[value] || 0;
}
function dsSeason(value) {
  var m = dsToSimp(value).match(/第\s*([一二三四五六七八九十两零\d]+)\s*季|\bseason\s*(\d+)\b|\bs(\d+)\b/i);
  return m ? dsNumber(m[1] || m[2] || m[3]) : 0;
}
function dsBaseTitle(value) { return dsToSimp(value).replace(/第\s*[一二三四五六七八九十两零\d]+\s*季|\bseason\s*\d+\b|\bs\d+\b/gi, ""); }
function dsExclude(item, wanted) { return !/解说|预告|花絮|片段/.test(wanted) && /解说|预告|花絮|片段/.test(dsText(item.vod_name) + " " + dsText(item.vod_state)); }
function dsMatch(item, wanted, params) {
  if (!item.vod_id || dsExclude(item, wanted)) return 0;
  var type = dsText(params.type || params.mediaType).toLowerCase();
  if (type === "movie" && Number(item.type_id) !== 1) return 0;
  if (type === "tv" && Number(item.type_id) === 1) return 0;
  var season = Number(params.season) || dsSeason(wanted), foundSeason = dsSeason(item.vod_name);
  if (season > 1 && foundSeason !== season) return 0;
  if (season === 1 && foundSeason > 1) return 0;
  var key = dsTitleKey(item.vod_name), target = dsTitleKey(wanted), score = key === target ? 100 : 0;
  if (!score && dsTitleKey(dsBaseTitle(item.vod_name)) === dsTitleKey(dsBaseTitle(wanted))) score = 95;
  if (params.year && dsText(item.vod_year) === String(params.year)) score += score ? 5 : 0;
  return score;
}
function dsEpisode(source, requested, movie) {
  var text = dsText(source.url), entries = [], explicit = false;
  text.split("#").forEach(function (part) {
    var at = part.indexOf("$");
    if (at < 1) return;
    var title = part.slice(0, at), url = part.slice(at + 1), m = title.match(/^\s*(?:第\s*)?0*(\d{1,4})\s*(?:[集话話期]|$)/);
    if (m) explicit = true;
    entries.push({ title: title, origin: url, number: m ? Number(m[1]) : null });
  });
  if (movie) return requested === 1 ? entries[0] || null : null;
  for (var i = 0; i < entries.length; i++) if (entries[i].number === requested) return entries[i];
  return explicit ? null : entries[requested - 1] || null;
}
function dsParseTargets(source, origin) {
  var apis = [source.parse_api].concat(dsText(source.extra_parse_api).split(/\r?\n/));
  var seen = {}, targets = [];
  apis.forEach(function (api) {
    api = dsText(api);
    if (!dsValidURL(api) || seen[api]) return;
    seen[api] = true;
    if (api.indexOf("{url}") >= 0) targets.push(api.replace(/\{url\}/g, encodeURIComponent(origin)));
    else targets.push(api + encodeURIComponent(origin));
  });
  return targets.slice(0, 3);
}
function dsPlayData(object) {
  if (Array.isArray(object)) {
    for (var i = 0; i < object.length; i++) { var entry = dsPlayData(object[i]); if (entry) return entry; }
    return null;
  }
  if (typeof object === "string") return dsValidURL(object) ? { url: object, type: "", headers: {} } : null;
  if (!object || typeof object !== "object") return null;
  if (object.code != null && [1, 200].indexOf(Number(object.code)) < 0) return null;
  if (typeof object.url === "string" && dsValidURL(object.url)) return { url: object.url, type: dsText(object.type), headers: dsHeaders(object.headers || object.header) };
  return object.data && object.data !== object ? dsPlayData(object.data) : null;
}
async function dsLine(source, episode, title, deadline) {
  var start = Date.now(), headers = dsHeaders(source.headers), targetList = dsParseTargets(source, episode.origin);
  // 來源放 name（官方頻道直接顯示頻道名 / 其餘顯示官方線路·線路X）；description 只留劇名·集數，保持 REX 顯示乾淨。
  // 索引原名若含「獨家」字樣洗成中性「線路」；官方頻道不加前綴、不加編號。
  function dsCleanLineName(value) {
    var name = dsText(value) || "未知線路";
    name = name.replace(/獨家|独家|獨播|独播|專享|专享|專屬|专属|獨享|独享/g, "線路");
    return name || "未知線路";
  }
  // 官方平臺歸屬（只判有實證的，其餘留空不硬猜；僅用於 name 前綴）。
  function dsPlatformShort(source, token, mediaUrl) {
    var code = dsText(source.code).toLowerCase();
    var parseApi = dsText(source.parse_api).toLowerCase();
    var media = dsText(mediaUrl), tok = dsText(token);
    if (/ixigua\.com|douyin|douyinvod|bytitop|bytetos|byteimg|pstatp\.com/i.test(media)) return "西瓜視頻";
    if (code === "bytedance" || code === "bba" || /mtbytedance|\/bt2?\.php/.test(parseApi)) return "西瓜視頻";
    if (/v\.qq\.com/i.test(tok) || code === "qq" || /\/qq_301\//.test(media)) return "騰訊視頻";
    return "";
  }
  async function probeAndReturn(play) {
    var mediaHeaders = dsMerge(headers, play.headers), result = await dsProbeFast(play.url, mediaHeaders, play.type, deadline);
    var plat = dsPlatformShort(source, episode.origin, play.url);
    var lineName, suffix = result.quality ? "·" + result.quality : "";
    if (plat) {
      // 官方頻道 → 直接顯示頻道名，不加「官方線路·」前綴、不加編號（如 西瓜視頻、騰訊視頻）。
      lineName = plat + suffix;
    } else {
      lineName = "官方線路·" + dsCleanLineName(source.name || source.code) + suffix;
    }
    var platRank = !plat ? 10 : (plat === "騰訊視頻" ? 0 : (plat === "西瓜視頻" ? 1 : 2));
    return { name: lineName, description: title + " · " + episode.title, url: result.url, headers: mediaHeaders, customHeaders: mediaHeaders, _latency: Date.now() - start, _platRank: platRank };
  }
  if (source.parse_secret) {
    try {
      var secret = await dsAPI("secret_parse_api_url", { url: episode.origin, player_code: dsText(source.code) });
      var secretPlay = dsPlayData(secret.data);
      if (secretPlay) return await probeAndReturn(secretPlay);
    } catch (error) {}
  } else if (targetList.length) {
    // 無損加深：每條解析目標「解析+探測」一條龍並行跑，首個可用即回；
    // 之前是等全部解析完再逐個探測，快目標會被慢目標拖住。單目標 5.5 秒超時，死線不等。
    var raceDone = false;
    var racers = targetList.map(function (target) {
      return (async function () {
        if (Date.now() >= deadline || raceDone) return null;
        var play = null;
        try {
          var response = await dsWithTimeout(Widget.http.get(target, { headers: { "User-Agent": "Dart/3.13 (dart:io)" } }), 5500);
          if (!dsOK(response)) return null;
          play = dsPlayData(dsReply(response.data));
        } catch (error) { return null; }
        if (!play || Date.now() >= deadline || raceDone) return null;
        try {
          var probed = await dsWithTimeout(probeAndReturn(play), Math.max(1000, Math.min(6000, deadline - Date.now())));
          if (probed) raceDone = true;
          return probed;
        } catch (error) { return null; }
      })();
    });
    var first = null;
    // 首個成功即回，不等最慢目標；全部失敗才繼續往下走（直鏈兜底）。
    await new Promise(function (resolve) {
      var pending = racers.length;
      if (!pending) resolve();
      racers.forEach(function (p) {
        p.then(function (r) {
          if (r && !first) { first = r; resolve(); }
          else if (--pending === 0) resolve();
        }, function () { if (--pending === 0) resolve(); });
      });
    });
    if (first) return first;
  }
  if (!source.parse_secret && /\.(?:m3u8|mp4|mkv|mov)(?:[?#]|$)/i.test(episode.origin) && Date.now() < deadline) {
    try { return await probeAndReturn({ url: episode.origin, headers: {}, type: /\.m3u8(?:[?#]|$)/i.test(episode.origin) ? "hls" : "mp4" }); }
    catch (error) {}
  }
  return null;
}
async function dsPool(items, limit, task) {
  var next = 0, output = new Array(items.length), workers = [];
  async function run() {
    while (next < items.length) { var index = next++; try { output[index] = await task(items[index], index); } catch (error) { output[index] = null; } }
  }
  for (var i = 0; i < Math.min(limit, items.length); i++) workers.push(run());
  await Promise.all(workers);
  return output;
}

// ============================================================
// 實際鏈路說明（只走官方線路）
// ------------------------------------------------------------
// 本腳本不擁有任何片源，所有媒體都來自第三方：
//
//  A. 主路徑 — 索引：官方索引服務
//     search / video_detail 僅返回「劇名 + 線路名 + 每集 token + 該線路的
//     parse_api / secret 解析地址」。索引主機 ≠ 媒體主機。
//  B. 主路徑 — 解析：索引下發的第三方 parse_api / secret_parse_api_url
//     token → 真實 m3u8/mp4 由這些第三方解析服務返回（地址由索引動態下發，
//     本腳本不硬編碼解析 IP）。本腳本只做探測過濾。
//  C. 主路徑 — 媒體：解析返回的 CDN m3u8/mp4（HLS/直鏈），經探測才返回。
//  D. 備援 — 本地快照重放：之前成功時存下的 (B) 線路+token，用同樣的
//     第三方解析重放。只在索引掛掉時用，name 追加「·快照」。
//  不含任何公開 MacCMS 資源站。
//
// 命名規則（REX 顯示用：來源放 name，description 只留劇名·集數）：
//   主路徑  → name「西瓜視頻 / 騰訊視頻 / 官方線路·線路X[·清晰度]」，description「劇名 · 集」
//   快照    → 同上，name 追加「·快照」
// ============================================================
// ---------- 本地快照 ----------
//
// 主索引只來自官方索引服務，不可達時搜不到片；因此每次主路徑成功時，
// 把「線路清單 + 每集 token + 第三方 parse_api 地址」存到本機 storage。
// 快照存的是索引下發的 token 與第三方解析地址，不是最終網址；
// 重放時仍走原第三方解析服務（與索引主機不同），索引掛了仍可能出片。
// 快照 14 天過期、只留最近 40 片（LRU），避免 storage 膨脹。
var dsSnapshotPrefix = "dsx_snap_";
var dsSnapshotMax = 40;
var dsSnapshotTTL = 14 * 24 * 60 * 60 * 1000;

function dsSnapshotKey(title) {
  return dsSnapshotPrefix + dsText(title).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "_");
}
function dsStorageGet(key) {
  try {
    var v = Widget.storage && Widget.storage.get(key);
    return v && typeof v.then === "function" ? v : Promise.resolve(v);
  } catch (error) { return Promise.resolve(null); }
}
function dsStorageSet(key, value) {
  try {
    var v = Widget.storage && Widget.storage.set(key, value);
    return v && typeof v.then === "function" ? v : Promise.resolve(v);
  } catch (error) { return Promise.resolve(); }
}
function dsStorageKeys() {
  try {
    var v = Widget.storage && Widget.storage.keys();
    return v && typeof v.then === "function" ? v : Promise.resolve(v);
  } catch (error) { return Promise.resolve([]); }
}
async function dsSnapshotSave(title, payload) {
  var key = dsSnapshotKey(title);
  if (!key || key === dsSnapshotPrefix) return;
  await dsStorageSet(key, JSON.stringify({ savedAt: Date.now(), payload: payload }));
  // LRU 修剪：只保留最近 dsSnapshotMax 片
  try {
    var keys = await dsStorageKeys();
    var mine = (Array.isArray(keys) ? keys : []).filter(function (k) { return dsText(k).indexOf(dsSnapshotPrefix) === 0; });
    if (mine.length > dsSnapshotMax) {
      var stamped = [];
      for (var i = 0; i < mine.length; i++) {
        var raw = await dsStorageGet(mine[i]);
        var at = 0;
        try { at = JSON.parse(raw).savedAt || 0; } catch (e) {}
        stamped.push({ key: mine[i], at: at });
      }
      stamped.sort(function (a, b) { return a.at - b.at; });
      for (var j = 0; j < stamped.length - dsSnapshotMax; j++) {
        try { await Widget.storage.remove(stamped[j].key); } catch (e) {}
      }
    }
  } catch (error) {}
}
async function dsSnapshotLoad(title) {
  try {
    var raw = await dsStorageGet(dsSnapshotKey(title));
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    if (!parsed || !parsed.payload) return null;
    if (Date.now() - (parsed.savedAt || 0) > dsSnapshotTTL) return null;
    return parsed.payload;
  } catch (error) { return null; }
}

// ============================================================
// ---------- 快照重放：用本地快照走原第三方解析 ----------
//
// 用快照裡的 parse_api + token 重新解析（與索引主機不同的解析服務），
// 所以索引不可達時仍可能出片。
async function dsReplaySnapshot(snapshot, wanted, requested, deadline) {
  var results = [];
  if (!snapshot || !Array.isArray(snapshot.sources)) return results;
  var movie = Number(snapshot.type_id) === 1;
  var candidates = [];
  snapshot.sources.forEach(function (source) {
    var episodes = Array.isArray(source.episodes) ? source.episodes : [];
    var episode = null;
    if (movie) episode = episodes[0];
    else {
      for (var i = 0; i < episodes.length; i++) if (episodes[i].number === requested) { episode = episodes[i]; break; }
      if (!episode) episode = episodes[requested - 1] || null;
    }
    if (!episode || !episode.origin) return;
    candidates.push({ source: source, episode: episode });
  });
  var all = await dsPool(candidates.slice(0, 20), 12, function (entry) {
    if (Date.now() >= deadline) return null;
    return dsLine(entry.source, entry.episode, dsText(snapshot.vod_name || wanted), deadline);
  });
  all.sort(function (a, b) { if (!a) return 1; if (!b) return -1; return ((a._platRank == null ? 10 : a._platRank) - (b._platRank == null ? 10 : b._platRank)) || (a._latency - b._latency); });
  all.forEach(function (entry) {
    if (!entry) return;
    // 快照重放走同一第三方解析；name 追加「·快照」以區分時效，description 保持乾淨。
    entry.name = dsText(entry.name) + "·快照";
    delete entry._latency; delete entry._platRank;
    results.push(entry);
  });
  return results;
}

// 把官方索引的 video_detail 轉成快照格式
function dsMakeSnapshot(detail, title) {
  var sources = Array.isArray(detail.vod_url_with_player) ? detail.vod_url_with_player : [];
  return {
    vod_name: dsText(detail.vod_name), type_id: Number(detail.type_id),
    vod_year: dsText(detail.vod_year),
    sources: sources.map(function (source) {
      var episodes = [];
      dsText(source.url).split("#").forEach(function (part) {
        var at = part.indexOf("$");
        if (at < 1) return;
        var label = part.slice(0, at).trim(), url = part.slice(at + 1).trim();
        if (!url) return;
        var m = label.match(/(\d{1,4})/);
        episodes.push({ title: label, origin: url, number: m ? Number(m[1]) : null });
      });
      return {
        code: dsText(source.code), name: dsText(source.name),
        parse_api: dsText(source.parse_api), extra_parse_api: dsText(source.extra_parse_api),
        headers: source.headers || null, parse_secret: !!source.parse_secret,
        episodes: episodes
      };
    }).filter(function (s) { return s.episodes.length; })
  };
}

// ---------- 備援路徑：只有本地快照重放（同一批官方線路） ----------
//
// 不依賴主索引，與主路徑平行跑：主路徑成功用主路徑，
// 主路徑失敗/超時則交付已在跑的快照重放結果。
async function dsSnapshotFallback(wanted, requested) {
  var deadline = Date.now() + 16000;
  var snapshot = await dsSnapshotLoad(wanted);
  if (!snapshot) return [];
  var replayed = await dsReplaySnapshot(snapshot, wanted, requested, deadline);
  var usedSnap = {}, results = [];
  replayed.forEach(function (entry) {
    if (!entry || usedSnap[entry.url]) return;
    usedSnap[entry.url] = true;
    results.push(entry);
  });
  return results;
}

async function loadResource(params) {
  params = params || {};
  var wanted = dsText(params.seriesName || params.title), requested = params.episode == null ? 1 : Number(params.episode);
  if (!wanted || !isFinite(requested) || requested < 1 || requested !== Math.floor(requested)) return [];
  var wantedVariants = dsSearchVariants(wanted);
  var deadline = Date.now() + 18000;
  // 快照懶啟動：主路徑 4 秒內成功就不啟動快照（省頻寬、省並行開銷）；
  // 主路徑慢或失敗才啟動，交付時序不變。
  var snapshotStarted = false, snapshotPromise = null;
  function dsEnsureSnapshot() {
    if (!snapshotStarted) {
      snapshotStarted = true;
      snapshotPromise = dsSnapshotFallback(wanted, requested).catch(function () { return []; });
    }
    return snapshotPromise;
  }
  var snapshotTimer = (typeof setTimeout === "function") ? setTimeout(function () { dsEnsureSnapshot(); }, 4000) : null;
  if (!snapshotTimer) dsEnsureSnapshot();
  // ---------- 主路徑：官方索引（繁簡雙查：原字 + 簡體各查一次，合併去重） ----------
  var found = null, indexError = null, pagecount = 1;
  var items = [], seenIds = {};
  for (var vi = 0; vi < wantedVariants.length && Date.now() < deadline; vi++) {
    try {
      var fres = await dsAPI("search", { text: wantedVariants[vi], pg: 1 });
      if (vi === 0) found = fres;
      if (fres && Number(fres.pagecount) > pagecount) pagecount = Number(fres.pagecount);
      (fres && Array.isArray(fres.data) ? fres.data : []).forEach(function (it) {
        var k = dsText(it.vod_id);
        if (k && !seenIds[k]) { seenIds[k] = true; items.push(it); }
      });
      if (items.length) break;
    } catch (error) { indexError = error; }
  }
  if (!found) found = { data: items, pagecount: pagecount };
  function rank() { return items.map(function (item) { return { item: item, score: dsMatch(item, wanted, params) }; }).filter(function (x) { return x.score >= 95; }).sort(function (a, b) { return b.score - a.score; }); }
  var ranked = rank();
  if (!ranked.length) dsEnsureSnapshot();
  if (!ranked.length && Number(pagecount) > 1 && Date.now() < deadline) {
    for (var pi = 0; pi < wantedVariants.length && Date.now() < deadline; pi++) {
      try { var page = await dsAPI("search", { text: wantedVariants[pi], pg: 2 }); (Array.isArray(page.data) ? page.data : []).forEach(function (it) { var k = dsText(it.vod_id); if (k && !seenIds[k]) { seenIds[k] = true; items.push(it); } }); ranked = rank(); if (ranked.length) break; } catch (error) {}
    }
  }
  if (!ranked.length && dsSeason(wanted) > 0 && Date.now() < deadline) {
    var baseQueries = dsSearchVariants(dsBaseTitle(wanted));
    for (var bi = 0; bi < baseQueries.length && Date.now() < deadline; bi++) {
      try { var base = await dsAPI("search", { text: baseQueries[bi], pg: 1 }); (Array.isArray(base.data) ? base.data : []).forEach(function (it) { var k = dsText(it.vod_id); if (k && !seenIds[k]) { seenIds[k] = true; items.push(it); } }); ranked = rank(); if (ranked.length) break; } catch (error) {}
    }
  }
  if (ranked.length) {
    try {
      var info = await dsAPI("video_detail", { id: ranked[0].item.vod_id, sign_md5: "", apk_path: "", apk_length: 0 });
      var detail = info.data && info.data.vod_info;
      if (detail && Number(detail.vod_id) === Number(ranked[0].item.vod_id) && !dsExclude(detail, wanted)) {
        var movie = Number(detail.type_id) === 1, sources = Array.isArray(detail.vod_url_with_player) ? detail.vod_url_with_player : [], candidates = [], seen = {};
        sources.forEach(function (source) {
          var episode = dsEpisode(source, requested, movie), identity = dsText(source.code || source.name) + ":" + (episode && episode.origin || "");
          if (!episode || !episode.origin || seen[identity]) return;
          seen[identity] = true;
          candidates.push({ source: source, episode: episode });
        });
        var all = await dsPool(candidates.slice(0, 20), 12, function (entry) {
          return Date.now() >= deadline ? null : dsLine(entry.source, entry.episode, dsText(detail.vod_name), deadline);
        });
        var used = {}, output = all.filter(function (entry) { if (!entry || used[entry.url]) return false; used[entry.url] = true; return true; }).sort(function (a, b) { return (a._platRank - b._platRank) || (a._latency - b._latency); }).map(function (entry) { delete entry._latency; delete entry._platRank; return entry; });
        // 主路徑成功時順手存快照，供索引不可達時重放。
        if (output.length) { try { await dsSnapshotSave(wanted, dsMakeSnapshot(detail, wanted)); } catch (error) {} }
        if (output.length) return output;
      }
    } catch (error) { indexError = error; dsEnsureSnapshot(); }
  }
  if (!ranked.length) dsEnsureSnapshot();
  // ---------- 主路徑失敗 → 交付已在平行跑的快照重放結果 ----------
  if (snapshotTimer !== null) { try { clearTimeout(snapshotTimer); } catch (e) {} }
  var snapFallback = await dsEnsureSnapshot();
  if (snapFallback.length) return snapFallback;
  if (indexError) throw indexError;
  return [];
}
