(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,function(e,t,n){var o=n(11),r=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];e.exports={encrypt:function(e){var t=o.utils.utf8.toBytes(e),n=new o.ModeOfOperation.ctr(r,new o.Counter(5)).encrypt(t),c=o.utils.hex.fromBytes(n);return console.log(c),c},decrypt:function(e){var t=o.utils.hex.toBytes(e),n=new o.ModeOfOperation.ctr(r,new o.Counter(5)).decrypt(t),c=o.utils.utf8.fromBytes(n);return console.log(c),c}}},function(e,t){e.exports={domain:"9f29e1a79d0c96cca74fda4280311e89d7c5b59239bb636b56bfd0"}},function(e,t,n){e.exports=n(12)},,,,,function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),c=n(2),a=n.n(c),i=(n(10),n(3)),u=n(4),s=function(){window.open(Object(i.decrypt)(u.domain))};function d(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"joker",onClick:s}))}var l=document.getElementById("root");a.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(d,null)),l)}],[[5,1,2]]]);
//# sourceMappingURL=main.c8c39aae.chunk.js.map