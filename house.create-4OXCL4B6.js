import{e as N}from"./chunk-G6OCKYB2.js";import{a as D,b as F,c as I,d as k,e as L,f as G,g as M,h as V,i as w}from"./chunk-EYJ7QIQW.js";import{J as p,K as g,Pa as y,_ as m,aa as h,ea as s,eb as S,fa as l,ga as c,ha as b,ma as f,pa as v,pb as _,ua as C}from"./chunk-6ZTB4F47.js";import{d as a,e as u,f as d}from"./chunk-JY5MMDH3.js";var K=(()=>{var i,r;let o=class{constructor(){u(this,i,void 0);u(this,r,void 0);d(this,i,p(S)),d(this,r,p(y)),this.vm=T(),this.isLoggedIn=a(this,i).selectSignal(N),h(()=>{this.isLoggedIn()?this.vm.form.enable():this.vm.form.disable()})}create(){a(this,i).dispatch(_.create({name:this.vm.form.value.name}))}open(){a(this,r).navigateByUrl(`edit/${this.vm.form.value.name}`)}},t=o;return i=new WeakMap,r=new WeakMap,(()=>{o.\u0275fac=function(n){return new(n||o)}})(),(()=>{o.\u0275cmp=g({type:o,selectors:[["create-house"]],standalone:!0,features:[C],decls:7,vars:3,consts:[[3,"formGroup"],["type","text","formControlName","name"],[3,"disabled","click"]],template:function(n,e){n&1&&(l(0,"div")(1,"form",0),b(2,"input",1),c(),l(3,"button",2),f("click",function(){return e.create()}),v(4,"Create"),c(),l(5,"button",2),f("click",function(){return e.open()}),v(6,"Open"),c()()),n&2&&(m(1),s("formGroup",e.vm.form),m(2),s("disabled",!e.isLoggedIn()||e.vm.form.invalid),m(2),s("disabled",!e.isLoggedIn()||e.vm.form.invalid))},dependencies:[w,L,D,I,k,G,M],encapsulation:2,changeDetection:0})})(),t})();function T(){let t=new V().nonNullable;return{form:t.group({name:t.control("",[F.required])})}}export{K as default};
