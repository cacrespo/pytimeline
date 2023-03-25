/*!
 * JSQR - JavaScript Quick Response Code Encoder Library v1.0.2
 * http://www.jsqr.de
 *
 * Copyright 2011-2015, Jens Duttke
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.jsqr.de/license
 *
 * Date: 2015-11-13
 */
!function(a,b){
function c(a,b,c){
var d,l,m,n,o,p,x,y=b.version,z=b.errorCorrection,A=new Array(8*r[r.length-1][q.TOTAL_BYTES]),B=0;
switch(b.encodeMode){
case b.ENCODE_MODE.NUMERIC:
var C=0;for(d=0;d<a.length;d++){
if(!(a[d]>=48&&a[d]<=57))throw new TypeError("Invalid data format");
C=10*C+(a[d]-48),d%3===2&&(B=i(A,B,f(C,10)),C=0);
}switch(d%3){
case 1:B=i(A,B,f(C,4));
break;case 2:
B=i(A,B,f(C,7));
}if(y>0)y>=1&&9>=y?p=10:y>=10&&26>=y?p=12:y>=27&&40>=y&&(p=14);else{
if(x=e(B+4+10,z),!(x>0))throw new RangeError("Too much data");
if(x<Math.abs(y)&&(x=Math.abs(y)),x>=1&&9>=x)p=10;else{
if(x=e(B+4+12,z),!(x>0))throw new RangeError("Too much data");
if(x<Math.abs(y)&&(x=Math.abs(y)),x>=10&&26>=x)p=12;else{
if(x=e(B+4+14,z),!(x>0))throw new RangeError("Too much data");
if(x<Math.abs(y)&&(x=Math.abs(y)),!(x>=27&&40>=x))throw new RangeError("Bug in version detection");
p=14}}y=x}break;
case b.ENCODE_MODE.ALPHA_NUMERIC:
var D,E,F=[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,32,36,37,42,43,45,46,47,58];
for(d=0;d<a.length-1;d+=2){
if(D=k(96===(96&a[d])?95&a[d]:a[d],F),E=k(96===(96&a[d+1])?95&a[d+1]:a[d+1],F),-1===D||-1===E)throw new Error("Character not supported in ALPHA_NUMERIC encoding mode");
B=i(A,B,f(45*D+E,11));
}if(d===a.length-1){
if(D=k(96===(96&a[d])?95&a[d]:a[d],F),-1===D)throw new Error("Character not supported in ALPHA_NUMERIC encoding mode");
B=i(A,B,f(D,6));
}if(y>0)y>=1&&9>=y?p=9:y>=10&&26>=y?p=11:y>=27&&40>=y&&(p=13);else{
if(x=e(B+4+9,z),!(x>0))throw new RangeError("Too much data");
if(x<Math.abs(y)&&(x=Math.abs(y)),x>=1&&9>=x)p=9;else{
if(x=e(B+4+11,z),!(x>0))throw new RangeError("Too much data");
if(x<Math.abs(y)&&(x=Math.abs(y)),x>=10&&26>=x)p=11;else{
if(x=e(B+4+13,z),!(x>0))throw new RangeError("Too much data");
if(x<Math.abs(y)&&(x=Math.abs(y)),!(x>=27&&40>=x))throw new RangeError("Bug in version detection");
p=13}}y=x}break;
case b.ENCODE_MODE.BYTE:
case b.ENCODE_MODE.UTF8:
case b.ENCODE_MODE.UTF8_SIGNATURE:
for(d=0;d<a.length;d++)B=i(A,B,f(a[d],8));
if(y>0)y>=0&&9>=y?p=8:y>=10&&40>=y&&(p=16);else{
if(x=e(B+4+8,z),!(x>0))throw new RangeError("Too much data");
if(x<Math.abs(y)&&(x=Math.abs(y)),x>=1&&9>=x)p=8;else{
if(x=e(B+4+16,z),!(x>0))throw new RangeError("Too much data");
if(x<Math.abs(y)&&(x=Math.abs(y)),!(x>=10&&40>=x))throw new RangeError("Bug in version detection");
p=16}y=x}break;
case b.ENCODE_MODE.KANJI:
throw new Error('Encoding mode "KANJI" not supported yet');
default:throw new Error("Unsupported encoding mode");
}if(c)return y;
A=f(15&b.encodeMode,4).concat(f(a.length,p)).concat(A),B+=4+p;
var G=r[y][q.TOTAL_BYTES]-r[y][q.ECC_BYTES][z]<<3;
if(B>G)throw new RangeError("Too much data for the selected version");
var H=G-B;for(H>4&&(H=4),B=i(A,B,h(H,0)),B=i(A,B,h((8-B%8)%8,0)),d=0,o=G-B>>>3;o>d;d++)B=i(A,B,1&d?[0,0,0,1,0,0,0,1]:[1,1,1,0,1,1,0,0]);
var I=Math.floor((r[y][q.TOTAL_BYTES]-r[y][q.ECC_BYTES][z])/(r[y][q.EC_BLOCKS][z][0]+r[y][q.EC_BLOCKS][z][1])),J=Math.floor(r[y][q.ECC_BYTES][z]/(r[y][q.EC_BLOCKS][z][0]+r[y][q.EC_BLOCKS][z][1])),K=[],L=[];
for(d=0,o=r[y][q.EC_BLOCKS][z][0];o>d;d++){
for(L=[],l=0;I>l;l++)L.push(g(A.splice(0,8)));
K.push(L)}for(d=0,o=r[y][q.EC_BLOCKS][z][1];o>d;d++){
for(L=[],l=0;I>=l;l++)L.push(g(A.splice(0,8)));
K.push(L)}var M=[],N=[];
for(l=1,d=0;255>d;d++)M.push(l),N[l]=d,l<<=1,l>255&&(l=285^l);
var O=[1];for(d=0,o=J;o>d;d++){
for(O[d+1]=1,l=d;l>0;l--)O[l]>0?O[l]=O[l-1]^M[(N[O[l]]+d)%255]:O[l]=O[l-1];
O[0]=M[(N[O[0]]+d)%255];
}var P=[];for(d=O.length-1;d>=0;d--)P.push(O[d]);
var Q=[];for(l=0;l<K.length;l++){
Q[l]=[].concat(K[l]).concat(h(J,0));
for(var R;Q[l].length>=P.length;){
for(R=Q[l][0],d=0;d<P.length;d++)Q[l][d]^=M[(N[P[d]]+N[R])%255];
if(0!==Q[l].shift())throw new Error("Bug while generating the ECC");
}}for(A=new Array(8*r[r.length-1][q.TOTAL_BYTES]),B=0,d=0;I>=d;d++)for(l=0;l<K.length;l++)d<K[l].length&&(B=i(A,B,f(K[l][d],8)));
for(d=0;J>d;d++)for(l=0;l<Q.length;l++)d<Q[l].length&&(B=i(A,B,f(Q[l][d],8)));
var S=17+(y<<2),T=new Array(S);
for(d=0;S>d;d++)T[d]=h(S,0);
for(j(T,0,0,t,w.FINDER),j(T,0,S-7,t,w.FINDER),j(T,S-7,0,t,w.FINDER),d=0;8>d;d++)T[d][7]=w.SEPARATOR,
T[7][d]=w.SEPARATOR,T[d][S-8]=w.SEPARATOR,T[7][S-1-d]=w.SEPARATOR,T[S-1-d][7]=w.SEPARATOR,
T[S-8][d]=w.SEPARATOR;
for(d=8;S-8>d;d++)T[d][6]=w.TIMING|(d+1)%2,T[6][d]=w.TIMING|(d+1)%2;
if(y>1){var U=r[y][q.ALIGNMENT_PATTERN_POSITION_OFFSET],V=4*y+10;
for(n=V;;){
for(m=V;;){
if(6===m&&6===n||6===m&&n===S-7||m===S-7&&6===n||j(T,m-2,n-2,u,w.ALIGNMENT),6===m)break;
m-=U,18>m&&(m=6);
}if(6===n)break;
n-=U,18>n&&(n=6);
}}if(y>=7){
var W=r[y][q.VERSION_PATTERN];
for(d=0;6>d;d++)for(l=0;3>l;l++)T[S-11+l][d]=w.VERSION|1&W,T[d][S-11+l]=w.VERSION|1&W,
W>>=1}for(d=0;8>d;d++)T[S-1-d][8]=0|w.FORMAT,T[8][S-1-d]=0|w.FORMAT,6!==d&&(T[8][d]=0|w.FORMAT,
T[d][8]=0|w.FORMAT);
T[8][8]=0|w.FORMAT,T[S-8][8]=1|w.FORMAT;
var X=-1;for(m=n=S-1,d=0;B>d;d++){
T[n][m]=w.DATA|A[d];
do if(m>6&&0===(1&m)||6>m&&1===(1&m))m--;else if(-1===X&&0===n||1===X&&n===S-1){
if(0===m){if(B-1>d)throw new RangeError("Too much data while writing the symbol");
break}X=-X,m--,6===m&&m--;
}else n+=X,m++;while(0!==T[n][m]);
}var Y,Z=[];
for(d=0;d<v.length;d++){
for(Z[d]=[],n=0;S>n;n++)for(Z[d][n]=[],m=0;S>m;m++)T[n][m]&w.DATA?Z[d][n][m]=1&(T[n][m]^v[d](m,n)):Z[d][n][m]=1&T[n][m];
Y=f(s[z][d],15),Z[d][S-1][8]=Z[d][8][0]=Y[0],Z[d][S-2][8]=Z[d][8][1]=Y[1],Z[d][S-3][8]=Z[d][8][2]=Y[2],
Z[d][S-4][8]=Z[d][8][3]=Y[3],Z[d][S-5][8]=Z[d][8][4]=Y[4],Z[d][S-6][8]=Z[d][8][5]=Y[5],
Z[d][S-7][8]=Z[d][8][7]=Y[6],Z[d][8][S-8]=Z[d][8][8]=Y[7],Z[d][8][S-7]=Z[d][7][8]=Y[8],
Z[d][8][S-6]=Z[d][5][8]=Y[9],Z[d][8][S-5]=Z[d][4][8]=Y[10],Z[d][8][S-4]=Z[d][3][8]=Y[11],
Z[d][8][S-3]=Z[d][2][8]=Y[12],Z[d][8][S-2]=Z[d][1][8]=Y[13],Z[d][8][S-1]=Z[d][0][8]=Y[14];
}var $,_,aa,ba,ca,da=0,ea=4294967295;
for(d=0;d<v.length;d++){
for($=_=aa=ba=ca=0,n=0;S>n;n++)for(m=0;S>m;m++)m>=6&&(1===(Z[d][n][m-6]&Z[d][n][m-5]&Z[d][n][m-4]&Z[d][n][m-3]&Z[d][n][m-2]&Z[d][n][m-1]&Z[d][n][m])||0===(Z[d][n][m-6]|Z[d][n][m-5]|Z[d][n][m-4]|Z[d][n][m-3]|Z[d][n][m-2]|Z[d][n][m-1]|Z[d][n][m]))&&$++,
n>=6&&(1===(Z[d][n-6][m]&Z[d][n-5][m]&Z[d][n-4][m]&Z[d][n-3][m]&Z[d][n-2][m]&Z[d][n-1][m]&Z[d][n][m])||0===(Z[d][n-6][m]|Z[d][n-5][m]|Z[d][n-4][m]|Z[d][n-3][m]|Z[d][n-2][m]|Z[d][n-1][m]|Z[d][n][m]))&&$++,
m>0&&n>0&&(1===(Z[d][n][m]&Z[d][n][m-1]&Z[d][n-1][m]&Z[d][n-1][m-1])||0===(Z[d][n][m]|Z[d][n][m-1]|Z[d][n-1][m]|Z[d][n-1][m-1]))&&_++,
m>=6&&1===Z[d][n][m-6]&&0===Z[d][n][m-5]&&1===Z[d][n][m-4]&&1===Z[d][n][m-3]&&1===Z[d][n][m-2]&&0===Z[d][n][m-1]&&1===Z[d][n][m]&&aa++,
n>=6&&1===Z[d][n-6][m]&&0===Z[d][n-5][m]&&1===Z[d][n-4][m]&&1===Z[d][n-3][m]&&1===Z[d][n-2][m]&&0===Z[d][n-1][m]&&1===Z[d][n][m]&&aa++,
ba+=Z[d][n][m];
ba=Math.abs(100*ba/(S*S)-50)/5,ca=3*$+3*_+40*aa+10*ba,ea>ca&&(ea=ca,da=d);
}for(n=0;S>n;n++)for(m=0;S>m;m++)T[n][m]&(w.DATA|w.FORMAT)?T[n][m]=Z[da][n][m]:T[n][m]=1&T[n][m];
return T}function d(b,c){
var d,e,f,g,h;
switch(typeof b){
case"string":
d=b;break;case"number":
d=b.toString();
break;case"object":
if(b.constructor===a[x].prototype.Input)d=b.toString();else{
if((Array.isArray||function(a){
return"[object Array]"===Object.prototype.toString.call(a);
})(b))return b;
d=new a[x].prototype.Input(b.dataType,b.data).toString();
}break;default:
throw new TypeError("Unsupported input parameter");
}if(e=c.encodeMode===c.ENCODE_MODE.UTF8_SIGNATURE?[239,187,191]:[],c.encodeMode===c.ENCODE_MODE.UTF8_SIGNATURE||c.encodeMode===c.ENCODE_MODE.UTF8)for(f=0,
h=d.length;h>f;f++)g=d.charCodeAt(f),128>g?e.push(g):g>127&&2048>g?e.push(g>>6|192,63&g|128):e.push(g>>12|224,g>>6&63|128,63&g|128);else for(f=0,
h=d.length;h>f;f++)e.push(d.charCodeAt(f));
return e}function e(a,b){
for(var c=1;c<r.length;c++)if(a<=r[c][q.TOTAL_BYTES]-r[c][q.ECC_BYTES][b]<<3)return c;
return 0}function f(a,b){
var c=new Array(b);
if("number"==typeof a&&b>0&&32>=b){
for(var d=b-1;d>=0;d--)c[d]=1&a,a>>=1;
return c}throw new Error("Invalid parameters in toBits().");
}function g(a,b){
return b=b||0,((a[b]||0)<<7)+((a[b+1]||0)<<6)+((a[b+2]||0)<<5)+((a[b+3]||0)<<4)+((a[b+4]||0)<<3)+((a[b+5]||0)<<2)+((a[b+6]||0)<<1)+(a[b+7]||0);
}function h(a,b){
for(var c=new Array(a),d=0;a>d;d++)c[d]=b;
return c}function i(a,b,c){
for(var d=0;d<c.length;d++)a[b+d]=c[d];
return b+c.length;
}function j(a,b,c,d,e){
var f,g,h,i;
for(h=0,i=d.length;i>h;h++)for(f=0,g=d[h].length;g>f;f++)a[c+h][b+f]=d[h][f]^e;
}function k(a,b){
if("function"==typeof b.indexOf)return b.indexOf(a);
for(var c=0;c<b.length;c++)if(b[c]===a)return c;
return-1}function l(a,b){
for(var c in a)if(a.hasOwnProperty(c)&&a[c]===b)return!0;
return!1}function m(a){
if("object"!=typeof a)return a;
var b={};for(var c in a)a.hasOwnProperty(c)&&("object"==typeof a[c]?b[c]=m(a[c]):b[c]=a[c]);
return b}var n=function(a,b){
if("undefined"!=typeof a){
if(!l(this.DATA_TYPE,a))throw new TypeError("Unsupported dataType");
}else a=this.DATA_TYPE.DEFAULT;
try{Object.defineProperty(this,"dataType",{
configurable:!1,
writeable:!0,
get:function(){
return a},set:function(b){
if(!l(this.DATA_TYPE,b))throw new TypeError("Unsupported dataType");
a=b}})}catch(c){
this.dataType=a;
}"object"==typeof b?this.data=m(b):this.data=b;
};n.prototype.DATA_TYPE={
DEFAULT:0,TEXT:0,
URL:1,BOOKMARK:2,
CALL:3,SMS:4,
EMAIL:5,VCARD:6,
MECARD:7,VEVENT:8,
GOOGLE_MAPS:9,
BING_MAPS:10,
GEO:11,ITUNES:12,
ITUNES_REVIEW:13,
ANDROID_MARKET:14,
FACEBOOK_USER_PROFILE:15,
FOURSQUARE:16,
TWEET_FETCH:17,
TWEET:18,BLACKBERRY_MESSENGER_USER:19,
ANDROID_WIFI:20,
WIKIPEDIA:21,
YOUTUBE_USER:22,
YOUTUBE_VIDEO:23,
BITCOIN:24},n.prototype.toString=function(){
function a(a){
var b=i.data;
if("string"==typeof a){
var c,d=a.split(".");
for(c=0;c<d.length;c++)b=b[d[c]];
}return b}function b(b){
var c=a(b);return"undefined"==typeof c?"":c.toString();
}function c(a,b){
for(var c in b)b.hasOwnProperty(c)&&(a=a.replace(c,b[c],"g"));
return a}function d(){
var a,b=arguments[0].split("."),c=i;
for(a=0;a<b.length;a++)c=c[b[a]];
for(a=1;a<arguments.length;a++){
if("object"==typeof c&&"function"==typeof arguments[a]&&null!==c&&c.constructor===arguments[a]||null===c&&null===arguments[a]||typeof c===arguments[a])return!0;
"function"==typeof arguments[a]&&(arguments[a]=arguments[a].name);
}throw"undefined"==typeof c?new TypeError(arguments[0]+" is undefined"):new TypeError("Unexcepted type ("+typeof c+") of "+arguments[0]+" ("+[].slice.call(arguments,1).join("|")+")");
}function e(){
var a,b,c,d;
for(c=0;c<arguments.length;c++){
for(a=arguments[c].split("."),b=i,d=0;d<a.length;d++)b=b[a[d]];
if("string"==typeof b&&0===b.length)throw new Error(arguments[c]+" cannot be empty");
}}var f,g,h,i=this;
switch(this.dataType){
case this.DATA_TYPE.DEFAULT:
case this.DATA_TYPE.TEXT:
return d("data","string","number","object"),"object"==typeof this.data?(d("data.text","string","number"),
e("data.text"),b("text")):(e("data"),b());
case this.DATA_TYPE.URL:
return d("data","string","object"),"object"==typeof this.data?(d("data.url","string"),
e("data.url"),(/^[a-zA-Z]+:\/\//.test(b("url"))?"":"http://")+b("url")):(e("data"),
(/^[a-zA-Z]+:\/\//.test(b())?"":"http://")+b());
case this.DATA_TYPE.BOOKMARK:
return d("data","object"),d("data.title","string","number"),d("data.url","string"),
e("data.title","data.url"),"MEBKM:TITLE:"+b("title")+";URL:"+(/^[a-zA-Z]+:\/\//.test(b("url"))?"":"http://")+b("url");
case this.DATA_TYPE.CALL:
return d("data","string","number","object"),"object"==typeof this.data?(d("data.phoneNumber","string","number"),
e("data.phoneNumber"),"TEL:"+b("phoneNumber")):(e("data"),"TEL:"+b());
case this.DATA_TYPE.SMS:
return d("data","object"),d("data.phoneNumber","string","number"),d("data.message","string","number"),
e("data.phoneNumber"),"SMSTO:"+b("phoneNumber")+":"+b("message");
case this.DATA_TYPE.EMAIL:
return d("data","object"),d("data.recipient","string"),d("data.subject","string"),
d("data.body","string"),e("data.recipient"),"SMTP:"+b("recipient").replace(":","")+":"+b("subject").replace(/:/g,"\\:")+":"+b("body");
case this.DATA_TYPE.VCARD:
switch(d("data","object"),d("data.version","string","number"),d("data.type","string"),
d("data.firstName","string","number"),d("data.middleName","string","number"),d("data.lastName","string","number"),
d("data.organization","string","number"),d("data.title","string","number"),d("data.mobilePhone","string","number"),
d("data.work","object"),d("data.work.street","string","number"),d("data.work.city","string"),
d("data.work.zip","string","number"),d("data.work.state","string"),d("data.work.country","string"),
d("data.work.phone","string","number"),d("data.work.fax","string","number"),d("data.work.eMail","string"),
d("data.work.url","string"),d("data.home","object"),d("data.home.street","string","number"),
d("data.home.city","string","number"),d("data.home.zip","string","number"),d("data.home.state","string","number"),
d("data.home.country","string"),d("data.home.phone","string","number"),d("data.home.eMail","string"),
d("data.home.url","string"),d("data.birthday",Date,null),e("data.version","data.type"),
h={"\\":"\\\\",
";":"\\;",",":"\\,",
"\n":"\\n"},f=[],parseFloat(b("version"))){
case 2.1:f[0]="2.1";
break;case 3:
f[0]="3.0";break;
default:throw new Error("Unsupported VCARD.version ("+b("version")+")");
}switch(b("type").toLowerCase()){
case"person":
f[1]=(b("firstName").length>0||b("middleName").length>0||b("lastName").length>0?"FN:"+(c(b("firstName"),h)+" "+c(b("middleName"),h)+" "+c(b("lastName"),h)).replace(/\s{2,}/g," ").replace(/^\s+|\s+$/g,"")+"\n":"")+(b("organization").length>0?"ORG:"+c(b("organization"),h)+"\n":"");
break;case"company":
f[1]=(b("organization").length>0?"ORG:"+c(b("organization"),h)+"\n":"")+(b("organization").length>0?"FN:"+c(b("organization"),h)+"\n":"")+"X-ABShowAs:COMPANY\n";
break;default:
throw new Error("Unsupported VCARD.type ("+b("type")+")");
}return"BEGIN:VCARD\nVERSION:"+f[0]+"\n"+(b("lastName").length>0||b("firstName").length>0||b("middleName").length>0?"N:"+c(b("lastName"),h)+";"+c(b("firstName"),h)+";"+c(b("middleName"),h)+";;\n":"")+f[1]+(b("title").length>0?"TITLE:"+c(b("title"),h)+"\n":"")+(a("work")&&b("work.eMail").length>0?"EMAIL;"+("3.0"===f[0]?"type=INTERNET;type=":"INTERNET;")+"WORK:"+c(b("work.eMail"),h)+"\n":"")+(a("home")&&b("home.eMail").length>0?"EMAIL;"+("3.0"===f[0]?"type=INTERNET;type=":"INTERNET;")+"HOME:"+c(b("home.eMail"),h)+"\n":"")+(b("mobilePhone").length>0?"TEL;"+("3.0"===f[0]?"type=":"")+"CELL:"+c(b("mobilePhone"),h)+"\n":"")+(a("work")&&b("work.phone").length>0?"TEL;"+("3.0"===f[0]?"type=":"")+"WORK:"+c(b("work.phone"),h)+"\n":"")+(a("home")&&b("home.phone").length>0?"TEL;"+("3.0"===f[0]?"type=":"")+"HOME:"+c(b("home.phone"),h)+"\n":"")+(a("work")&&b("work.fax").length>0?"TEL;"+("3.0"===f[0]?"type=WORK,":"WORK;")+"FAX:"+c(b("work.fax"),h)+"\n":"")+(a("work")&&(b("work.street").length>0||b("work.city").length>0||b("work.state").length>0||b("work.zip").length>0||b("work.country").length>0)?"ADR;"+("3.0"===f[0]?"type=":"")+"WORK:;;"+c(b("work.street"),h)+";"+c(b("work.city"),h)+";"+c(b("work.state"),h)+";"+c(b("work.zip"),h)+";"+c(b("work.country"),h)+"\n":"")+(a("home")&&(b("home.street").length>0||b("home.city").length>0||b("home.state").length>0||b("home.zip").length>0||b("home.country").length>0)?"ADR;"+("3.0"===f[0]?"type=":"")+"HOME:;;"+c(b("home.street"),h)+";"+c(b("home.city"),h)+";"+c(b("home.state"),h)+";"+c(b("home.zip"),h)+";"+c(b("home.country"),h)+"\n":"")+(a("birthday")&&null!==a("birthday")?"BDAY;value=date:"+a("birthday").getFullYear()+("0"+(a("birthday").getMonth()+1)).substr(-2)+("0"+a("birthday").getDate()).substr(-2)+";":"")+(a("work")&&b("work.url").length>0?"URL;"+("3.0"===f[0]?"type=":"")+"WORK:"+c(b("work.url"),h)+"\n":"")+(a("home")&&b("home.url").length>0?"URL;"+("3.0"===f[0]?"type=":"")+"HOME:"+c(b("home.url"),h)+"\n":"")+"END:VCARD";
case this.DATA_TYPE.MECARD:
return d("data","object"),d("data.firstName","string","number"),d("data.lastName","string","number"),
d("data.eMail","string"),d("data.phoneNumber","string","number"),d("data.videoCall","string","number"),
d("data.birthday",Date,null),d("data.poBox","string","number"),d("data.room","string","number"),
d("data.street","string","number"),d("data.city","string"),d("data.state","string"),
d("data.zip","string","number"),d("data.country","string"),d("data.url","string","number"),
d("data.memo","string","number"),h={
"\\":"\\\\",
":":"\\:",";":"\\;",
",":"\\,"},"MECARD:"+(b("lastName").length>0||b("firstName")>0?"N:"+c(b("lastName"),h)+(b("firstName").length>0?","+c(b("firstName"),h):"")+";":"")+(b("phoneNumber").length>0?"TEL:"+c(b("phoneNumber"),h)+";":"")+(b("videoCall").length>0?"TEL-AV:"+c(b("videoCall"),h)+";":"")+(b("eMail").length>0?"EMAIL:"+c(b("eMail"),h)+";":"")+(b("url").length>0?"URL:"+c(b("url"),h)+";":"")+(b("memo").length>0?"NOTE:"+c(b("memo"),h)+";":"")+(a("birthday")&&null!==a("birthday")?"BDAY:"+a("birthday").getFullYear()+("0"+(a("birthday").getMonth()+1)).substr(-2)+("0"+a("birthday").getDate()).substr(-2)+";":"")+(b("street").length>0?"ADR:"+c(b("poBox"),h)+","+c(b("room"),h)+","+c(b("street"),h)+","+c(b("city"),h)+","+c(b("state"),h)+","+c(b("zip"),h)+","+c(b("country"),h)+";":"")+";";
case this.DATA_TYPE.VEVENT:
if(d("data","object"),d("data.format","string"),d("data.summary","string","number"),
d("data.description","string","number"),d("data.locationName","string","number"),
d("data.fullDay","boolean"),d("data.startDate",Date),d("data.endDate",Date),e("data.format","data.summary","data.fullDay","data.startDate","data.endDate"),
Date.parse(b("startDate"))>Date.parse(b("endDate")))throw new RangeError("VEVENT.startDate must be older than VEVENT.endDate");
switch(h={"\\":"\\\\",
";":"\\;",",":"\\,",
"\n":"\\n"},f="BEGIN:VEVENT\nSUMMARY:"+c(b("summary"),h)+"\n"+(b("description").length>0?"DESCRIPTION:"+c(b("description"),h)+"\n":"")+(b("locationName").length>0?"LOCATION:"+c(b("locationName"),h)+"\n":"")+"DTSTART:"+a("startDate").getFullYear()+("0"+(a("startDate").getMonth()+1)).substr(-2)+("0"+a("startDate").getDate()).substr(-2)+(a("fullDay")?"":"T"+("0"+a("startDate").getHours()).substr(-2)+("0"+a("startDate").getMinutes()).substr(-2)+("0"+a("startDate").getSeconds()).substr(-2))+"\nDTEND:"+a("endDate").getFullYear()+("0"+(a("endDate").getMonth()+1)).substr(-2)+("0"+a("endDate").getDate()).substr(-2)+(a("fullDay")?"":"T"+("0"+a("endDate").getHours()).substr(-2)+("0"+a("endDate").getMinutes()).substr(-2)+("0"+a("endDate").getSeconds()).substr(-2))+"\nEND:VEVENT",
b("format").toLowerCase()){
case"icalendar":
return"BEGIN:VCALENDAR\nVERSION:2.0\n"+f+"\nEND:VCALENDAR";
case"zxing":
return f;default:
throw new Error("Unsupported VEVENT.format ("+b("format")+")");
}case this.DATA_TYPE.GOOGLE_MAPS:
return d("data","object"),d("data.locationName","string"),d("data.longitude","string","number"),
d("data.latitude","string","number"),e("data.longitude","data.latitude"),"http://maps.google.com/maps?f=q&q="+b("latitude")+"%2C"+b("longitude")+"+%28"+encodeURIComponent(b("locationName"))+"%29";
case this.DATA_TYPE.BING_MAPS:
return d("data","object"),d("data.longitude","string","number"),d("data.latitude","string","number"),
e("data.longitude","data.latitude"),"http://www.bing.com/maps/?v=2&cp="+b("latitude")+"~"+b("longitude")+"&lvl=16&dir=0&sty=r";
case this.DATA_TYPE.GEO:
return d("data","object"),d("data.longitude","string","number"),d("data.latitude","string","number"),
e("data.longitude","data.latitude"),"GEO:"+b("latitude")+","+b("longitude");
case this.DATA_TYPE.ITUNES:
if(d("data","string","number","object"),"object"==typeof this.data?(d("data.appId","string","number"),
e("data.appId"),f=b("appId")):(e("data"),f=b()),!/\d+$/.test(f))throw new Error("Invalid ITUNES.appId. The id must be numeric");
return"http://itunes.apple.com/app/id"+/\d+$/.exec(f)[0];
case this.DATA_TYPE.ITUNES_REVIEW:
if(d("data","string","number","object"),"object"==typeof this.data?(d("data.appId","string","number"),
e("data.appId"),f=b("appId")):(e("data"),f=b()),!/\d+$/.test(f))throw new Error("Invalid ITUNES.appId. The id must be numeric");
return"itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id="+/\d+$/.exec(f)[0];
case this.DATA_TYPE.ANDROID_MARKET:
switch(d("data","object"),d("data.searchType","string"),d("data.linkType","string"),
d("data.search","string","number"),e("data.searchType","data.linkType","data.search"),
b("linkType").toLowerCase()){
case"market":
f="market://";
break;case"website":
f="http://market.android.com/";
break;default:
throw new Error("Unsupported ANDROID_MARKET.linkType ("+b("linkType")+")");
}switch(b("searchType").toLowerCase()){
case"raw":return f+"search?q="+encodeURIComponent(b("search"));
case"package":
return f+"search?q=pname%3A"+encodeURIComponent(b("search"));
case"publisher":
return f+"search?q=pub%3A"+encodeURIComponent(b("search"));
case"details":
return f+"details?id="+encodeURIComponent(b("search"));
default:throw new Error("Unsupported ANDROID_MARKET.searchType ("+b("searchType")+")");
}case this.DATA_TYPE.FACEBOOK_USER_PROFILE:
if(d("data","string","number","object"),"object"==typeof this.data?(d("data.profileId","string","number"),
e("data.profileId"),f=b("profileId")):(e("data"),f=b()),/^\d{15}$/.test(f))return"fb://profile/"+f;
if(/(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/.test(f))return"fb://profile/"+/(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/.exec(f)[3];
throw new Error("Invalid FACEBOOK_USER_PROFILE.videoId. The id must be numeric, 15 characters in length");
case this.DATA_TYPE.FOURSQUARE:
if(d("data","string","number","object"),"object"==typeof this.data?(d("data.venueId","string","number"),
e("data.venueId"),f=b("venueId")):(e("data"),f=b()),!/\d+$/.test(f))throw new Error("Invalid FOURSQUARE.venueId. The id must be numeric");
return"http://foursquare.com/venue/"+/\d+$/.exec(f)[0];
case this.DATA_TYPE.WIKIPEDIA:
return d("data","string","number","object"),"object"==typeof this.data?(d("data.url","string","number"),
e("data.url"),f=b("url")):(e("data"),f=b()),h={
" ":"_"},g=/\/\/([a-z\-]*)\.?wikipedia.org\/wiki\/(.*)/i.exec(f),null===g||3!==g.length?"http://qrwp.org/"+c(f,h):"http://"+(g[1].length>0?g[1]+".":"")+"qrwp.org/"+c(g[2],h);
case this.DATA_TYPE.YOUTUBE_USER:
return d("data","string","number","object"),"object"==typeof this.data?(d("data.userName","string","number"),
e("data.userName"),f=b("userName")):(e("data"),f=b()),"http://youtube.com/user/"+f;
case this.DATA_TYPE.YOUTUBE_VIDEO:
if(d("data","string","number","object"),"object"==typeof this.data?(d("data.videoId","string","number"),
e("data.videoId"),f=b("videoId")):(e("data"),f=b()),/^[-_A-Za-z0-9]+$/.test(f))return"youtube://"+f;
if(/(youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z0-9]+)(%26|&|$)/.test(f))return"youtube://"+/(youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z0-9]+)(%26|&|$)/.exec(f)[3];
throw new Error("Invalid YOUTUBE.videoId. The id must be alphanumeric");
case this.DATA_TYPE.TWEET_FETCH:
throw new Error("DATA_TYPE.TWEET_FETCH is currently unsupported");
case this.DATA_TYPE.TWEET:
return d("data","string","number","object"),"object"==typeof this.data?(d("data.text","string","number"),
e("data.text"),"http://twitter.com/home?status="+encodeURIComponent(b("text"))):(e("data"),
"http://twitter.com/home?status="+encodeURIComponent(b()));
case this.DATA_TYPE.BLACKBERRY_MESSENGER_USER:
if(d("data","object"),d("data.firstName","string"),d("data.lastName","string"),d("data.bbmPin","string"),
e("data.bbmPin"),!/^[A-Za-z0-9]{8}$/.test(b("bbmPin")))throw new Error("Invalid BLACKBERRY_MESSENGER_USER.bbmPin. The pin must be alphanumeric, eight characters in length");
return"bbm:"+b("bbmPin")+"00000000"+b("firstName")+" "+b("lastName");
case this.DATA_TYPE.ANDROID_WIFI:
return d("data","object"),d("data.ssid","string"),d("data.password","string","number"),
d("data.networkType","string"),e("data.ssid","data.networkType"),"WIFI:S:"+b("ssid")+";T:"+b("networkType")+(b("password").length>0?";P:"+b("password"):"")+";;";
case this.DATA_TYPE.BITCOIN:
return d("data","string","object"),"object"==typeof this.data?(d("data.hash","string"),
e("data.hash"),(/^bitcoin:/.test(b("hash"))?"":"bitcoin:")+b("hash")):(e("data"),
(/^bitcoin:/.test(b())?"":"bitcoin:")+b());
default:throw new TypeError("Unsupported dataType");
}};var o=function(a,b,c){
if("object"==typeof a&&"undefined"==typeof b&&"undefined"==typeof c&&(c=a.errorCorrection,
b=a.version,a=a.encodeMode),"undefined"!=typeof a){
if(!l(this.ENCODE_MODE,a))throw new TypeError("Unsupported encodeMode");
}else a=this.ENCODE_MODE.UTF8;
try{Object.defineProperty(this,"encodeMode",{
configurable:!1,
writeable:!0,
get:function(){
return a},set:function(b){
if(!l(this.ENCODE_MODE,b))throw new TypeError("Unsupported encodeMode");
a=b}})}catch(d){
this.encodeMode=a;
}if("undefined"!=typeof b){
if("number"!=typeof b)throw new TypeError("Invalid version type");
if(-40>b||b>40)throw new RangeError("Invalid version value");
}else b=this.DEFAULT;
try{Object.defineProperty(this,"version",{
configurable:!1,
writeable:!0,
get:function(){
return b},set:function(a){
if("number"!=typeof a)throw new TypeError("Invalid version type");
if(-40>a||a>40)throw new RangeError("Invalid version value");
b=a}})}catch(d){
this.version=b;
}if("undefined"!=typeof c){
if(!l(this.ERROR_CORRECTION,c))throw new TypeError("Invalid errorCorrection");
}else c=this.ERROR_CORRECTION.M;
try{Object.defineProperty(this,"errorCorrection",{
configurable:!1,
writeable:!0,
get:function(){
return c},set:function(a){
if(!l(this.ERROR_CORRECTION,a))throw new TypeError("Invalid errorCorrection");
c=a}})}catch(d){
this.errorCorrection=c;
}};o.prototype.ENCODE_MODE={
NUMERIC:1,ALPHA_NUMERIC:2,
BYTE:4,UTF8:20,
UTF8_SIGNATURE:36,
STRUCTURED_APPEND:3,
FNC1_POS1:5,
ECI:7,KANJI:8,
FNC1_POS2:9
},o.prototype.ERROR_CORRECTION={
L:1,M:0,Q:3,
H:2},o.prototype.DEFAULT=0,o.prototype.getVersion=function(a){
return this.version>0?this.version:c(d(a,this),this,!0);
},o.prototype.getMinVersion=function(a){
var b=new o(this.encodeMode,this.DEFAULT,this.errorCorrection);
return c(d(a,b),b,!0);
};var p=function(a,b){
var e,f,g=this;
for(e=c(d(a,b),b),f=0;f<e.length;f++)this[f]=e[f];
try{Object.defineProperty(this,"scale",{
configurable:!1,
writeable:!0,
get:function(){
return i},set:function(a){
if("number"!=typeof a)throw new TypeError("Invalid scale type");
if(0>=a||a>256)throw new RangeError("Scale value out of range");
i=a}});var i=4;
}catch(j){this.scale=4;
}try{Object.defineProperty(this,"margin",{
configurable:!1,
writeable:!0,
get:function(){
return k},set:function(a){
if("number"!=typeof a)throw new TypeError("Invalid margin type");
if(0>a||a>256)throw new RangeError("Margin value out of range");
k=a}});var k=4;
}catch(j){this.margin=4;
}try{Object.defineProperty(this,"color1",{
configurable:!1,
writeable:!0,
get:function(){
return l},set:function(a){
if("string"!=typeof a)throw new TypeError("Invalid color1 type");
l=a}});var l="rgb(0,0,0)";
}catch(j){this.color1="rgb(0,0,0)";
}try{Object.defineProperty(this,"color0",{
configurable:!1,
writeable:!0,
get:function(){
return m},set:function(a){
if("string"!=typeof a)throw new TypeError("Invalid color2 type");
m=a}});var m="none";
}catch(j){this.color0="none";
}try{Object.defineProperty(this,"length",{
configurable:!1,
writeable:!1,
get:function(){
return e.length;
}})}catch(j){
this.length=new function(){
this.toString=function(){
return e.length;
}}}try{Object.defineProperty(this,"width",{
configurable:!1,
writeable:!1,
get:function(){
return e.length+(g.margin<<1);
}})}catch(j){
this.width=new function(){
this.toString=function(){
return e.length+(g.margin<<1);
}}}try{Object.defineProperty(this,"pixelWidth",{
configurable:!1,
writeable:!1,
get:function(){
return(e.length+(g.margin<<1))*g.scale;
}})}catch(j){
this.pixelWidth=new function(){
this.toString=function(){
return(e.length+(g.margin<<1))*g.scale;
}}}this.draw=function(a,b,c){
var d,f,g=a.getContext("2d"),h=this.scale,i=this.margin;
for(f=0;f<e.length;f++)for(d=0;d<e[f].length;d++)e[f][d]&&g.fillRect(b+(d+i)*h,c+(f+i)*h,h,h);
},this.drawHTML=function(a,b,c){
b=b||"div";var d,f,g,h=this.scale,i=this.margin,j=this.color1,k='<div style="position:relative; background:'+this.color2+'">';
for(f=0;f<e.length;f++)for(d=0;d<e.length;d+=g)if(g=1,1===e[f][d]){
for(;d+g<e.length&&1===e[f][d+g];)g++;
k+=c?"<"+b+' style="width:'+g*h+"px; height:"+h+"px; left:"+(d+i)*h+"px; top:"+(f+i)*h+'px;"></'+b+">":"<"+b+' style="position:absolute; width:'+g*h+"px; height:"+h+"px; left:"+(d+i)*h+"px; top:"+(f+i)*h+"px; background:"+j+';"></'+b+">";
}return k+=NaN,a&&"undefined"!=typeof a.innerHTML&&(a.innerHTML=k),k;
},this.toDataURL=function(){},this.toSVG=function(){},this.toArray=function(){
var a,b,c=h(e.length+(k<<1),0);
for(b=0;b<e.length;b++)for(c[b+k]=h(e[b].length+(k<<1),0),a=0;a<e[b].length;a++)c[b+k][a+k]=e[b][a];
return c},this.toString=function(){
return this.toArray().toString();
}},q={TOTAL_BYTES:0,
REMAINDER_BITS:1,
ECC_BYTES:2,
EC_BLOCKS:3,
ALIGNMENT_PATTERN_POSITION_OFFSET:4,
VERSION_PATTERN:5
},r=[null,[26,0,[10,7,17,13],[[1,0],[1,0],[1,0],[1,0]],0,null],[44,7,[16,10,28,22],[[1,0],[1,0],[1,0],[1,0]],12,null],[70,7,[26,15,44,36],[[1,0],[1,0],[2,0],[2,0]],16,null],[100,7,[36,20,64,52],[[2,0],[1,0],[4,0],[2,0]],20,null],[134,7,[48,26,88,72],[[2,0],[1,0],[2,2],[2,2]],24,null],[172,7,[64,36,112,96],[[4,0],[2,0],[4,0],[4,0]],28,null],[196,0,[72,40,130,108],[[4,0],[2,0],[4,1],[2,4]],16,31892],[242,0,[88,48,156,132],[[2,2],[2,0],[4,2],[4,2]],18,34236],[292,0,[110,60,192,160],[[3,2],[2,0],[4,4],[4,4]],20,39577],[346,0,[130,72,224,192],[[4,1],[2,2],[6,2],[6,2]],22,42195],[404,0,[150,80,264,224],[[1,4],[4,0],[3,8],[4,4]],24,48118],[466,0,[176,96,308,260],[[6,2],[2,2],[7,4],[4,6]],26,51042],[532,0,[198,104,352,288],[[8,1],[4,0],[12,4],[8,4]],28,55367],[581,3,[216,120,384,320],[[4,5],[3,1],[11,5],[11,5]],20,58893],[655,3,[240,132,432,360],[[5,5],[5,1],[11,7],[5,7]],22,63784],[733,3,[280,144,480,408],[[7,3],[5,1],[3,13],[15,2]],24,68472],[815,3,[308,168,532,448],[[10,1],[1,5],[2,17],[1,15]],24,70749],[901,3,[338,180,588,504],[[9,4],[5,1],[2,19],[17,1]],26,76311],[991,3,[364,196,650,546],[[3,11],[3,4],[9,16],[17,4]],28,79154],[1085,3,[416,224,700,600],[[3,13],[3,5],[15,10],[15,5]],28,84390],[1156,4,[442,224,750,644],[[17,0],[4,4],[19,6],[17,6]],22,87683],[1258,4,[476,252,816,690],[[17,0],[2,7],[34,0],[7,16]],24,92361],[1364,4,[504,270,900,750],[[4,14],[4,5],[16,14],[11,14]],24,96236],[1474,4,[560,300,960,810],[[6,14],[6,4],[30,2],[11,16]],26,102084],[1588,4,[588,312,1050,870],[[8,13],[8,4],[22,13],[7,22]],26,102881],[1706,4,[644,336,1110,952],[[19,4],[10,2],[33,4],[28,6]],28,110507],[1828,4,[700,360,1200,1020],[[22,3],[8,4],[12,28],[8,26]],28,110734],[1921,3,[728,390,1260,1050],[[3,23],[3,10],[11,31],[4,31]],24,117786],[2051,3,[784,420,1350,1140],[[21,7],[7,7],[19,26],[1,37]],24,119615],[2185,3,[812,450,1440,1200],[[19,10],[5,10],[23,25],[15,25]],26,126325],[2323,3,[868,480,1530,1290],[[2,29],[13,3],[23,28],[42,1]],26,127568],[2465,3,[924,510,1620,1350],[[10,23],[17,0],[19,35],[10,35]],26,133589],[2611,3,[980,540,1710,1440],[[14,21],[17,1],[11,46],[29,19]],28,136944],[2761,3,[1036,570,1800,1530],[[14,23],[13,6],[59,1],[44,7]],28,141498],[2876,0,[1064,570,1890,1590],[[12,26],[12,7],[22,41],[39,14]],24,145311],[3034,0,[1120,600,1980,1680],[[6,34],[6,14],[2,64],[46,10]],26,150283],[3196,0,[1204,630,2100,1770],[[29,14],[17,4],[24,46],[49,10]],26,152622],[3362,0,[1260,660,2220,1860],[[13,32],[4,18],[42,32],[48,14]],26,158308],[3532,0,[1316,720,2310,1950],[[40,7],[20,4],[10,67],[43,22]],28,161089],[3706,0,[1372,750,2430,2040],[[18,31],[19,6],[20,61],[34,34]],28,167017]],s=[[21522,20773,24188,23371,17913,16590,20375,19104],[30660,29427,32170,30877,26159,25368,27713,26998],[5769,5054,7399,6608,1890,597,3340,2107],[13663,12392,16177,14854,9396,8579,11994,11245]],t=[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,1,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]],u=[[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]],v=[function(a,b){
return(b+a)%2===0;
},function(a,b){
return b%2===0;
},function(a,b){
return a%3===0;
},function(a,b){
return(b+a)%3===0;
},function(a,b){
return(Math.floor(b/2)+Math.floor(a/3))%2===0;
},function(a,b){
return b*a%2+b*a%3===0;
},function(a,b){
return(b*a%2+b*a%3)%2===0;
},function(a,b){
return(b*a%3+(b+a)%2)%2===0;
}],w={FINDER:2,
SEPARATOR:4,
TIMING:8,ALIGNMENT:16,
VERSION:32,
FORMAT:64,DATA:128
},x="JSQR";a[x]=function(){},a[x].prototype.encode=function(b,c){
return new a[x].prototype.Matrix(b,c);
},a[x].prototype.Input=n,a[x].prototype.DATA_TYPE=a[x].prototype.Input.prototype.DATA_TYPE,
a[x].prototype.Code=o,a[x].prototype.ENCODE_MODE=a[x].prototype.Code.prototype.ENCODE_MODE,
a[x].prototype.ERROR_CORRECTION=a[x].prototype.Code.prototype.ERROR_CORRECTION,a[x].prototype.DEFAULT=a[x].prototype.Code.prototype.DEFAULT,
a[x].prototype.Matrix=p;
}(window);
//# sourceMappingURL=jsqr-1.0.2-min.js.map