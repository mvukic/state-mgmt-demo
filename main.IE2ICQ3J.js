import{a as Rt,b as Ne,c as we,d as Me,e as _e}from"./chunk-G6OCKYB2.js";import{$a as Se,A as ut,B,Ba as Q,D as L,G as D,Ga as ae,H as lt,I as S,Ia as ce,J as V,Ja as yt,K as ee,Ka as ue,L as pt,La as le,Ma as vt,Na as Tt,Oa as pe,Pa as he,Q as ht,Qa as fe,R as ft,Ra as de,S as ie,Sa as me,T as b,Ta as k,U as ne,Ua as P,V as q,Xa as It,Ya as W,Z as G,Za as ge,_ as H,_a as Ee,ab as ye,b as Bt,bb as At,cb as ve,d as Vt,da as dt,db as Te,e as qt,ea as mt,eb as J,fa as K,fb as Ie,g as Gt,ga as U,gb as Ae,h as Ht,ha as re,ib as Re,j as at,k as Kt,ka as gt,l as w,ma as Et,na as St,ob as xe,p as ct,pa as X,q as _,ra as se,s as Xt,t as Qt,u as Wt,ua as oe,v as Jt,vb as Oe,w as Yt,wb as Ce,x as Zt,xb as be,y as te}from"./chunk-6ZTB4F47.js";import{a as C,b as N,d as z,e as Ft,f as $t}from"./chunk-JY5MMDH3.js";function gi(e,t){if(e&1){let r=gt();K(0,"button",2),Et("click",function(){ht(r);let n=St();return ft(n.login())}),X(1,"Login"),U()}}function Ei(e,t){if(e&1){let r=gt();K(0,"button",2),Et("click",function(){ht(r);let n=St();return ft(n.logout())}),X(1,"Logout"),U()}}var ke=(()=>{var t;let r=class{constructor(){Ft(this,t,void 0);$t(this,t,V(J)),this.name=z(this,t).selectSignal(Me),this.isLoggedIn=z(this,t).selectSignal(_e)}logout(){z(this,t).dispatch(Rt.logout())}login(){z(this,t).dispatch(Rt.login({name:"@user_name"}))}},e=r;return t=new WeakMap,(()=>{r.\u0275fac=function(s){return new(s||r)}})(),(()=>{r.\u0275cmp=ee({type:r,selectors:[["app-root"]],standalone:!0,features:[oe],decls:6,vars:3,consts:[[2,"background","black","color","white"],[3,"click",4,"ngIf"],[3,"click"]],template:function(s,u){s&1&&(K(0,"div",0)(1,"span"),X(2),U(),dt(3,gi,2,0,"button",1),dt(4,Ei,2,0,"button",1),U(),re(5,"router-outlet")),s&2&&(H(2),se(" ",u.name(),""),H(1),mt("ngIf",!u.isLoggedIn()),H(1),mt("ngIf",u.isLoggedIn()))},dependencies:[pe,ae],encapsulation:2,changeDetection:0})})(),e})();var Le="@ngrx/router-store/request",en=k(Le,P()),Ue="@ngrx/router-store/navigation",nn=k(Ue,P()),Fe="@ngrx/router-store/cancel",rn=k(Fe,P()),$e="@ngrx/router-store/error",sn=k($e,P()),Be="@ngrx/router-store/navigated",on=k(Be,P());var Y=class{serialize(t){return{root:this.serializeRoute(t.root),url:t.url}}serializeRoute(t){let r=t.children.map(i=>this.serializeRoute(i));return{params:t.params,data:t.data,url:t.url,outlet:t.outlet,title:t.title,routeConfig:t.routeConfig?{path:t.routeConfig.path,pathMatch:t.routeConfig.pathMatch,redirectTo:t.routeConfig.redirectTo,outlet:t.routeConfig.outlet,title:typeof t.routeConfig.title=="string"?t.routeConfig.title:void 0}:null,queryParams:t.queryParams,fragment:t.fragment,firstChild:r[0],children:r}}},O=(()=>(O=O||{},O[O.PreActivation=1]="PreActivation",O[O.PostActivation=2]="PostActivation",O))(),yi="router",Pe=new b("@ngrx/router-store Internal Configuration"),Ve=new b("@ngrx/router-store Configuration");function vi(e){return C({stateKey:yi,serializer:Y,navigationActionTiming:O.PreActivation},e)}var Z=class{serialize(t){return{root:this.serializeRoute(t.root),url:t.url}}serializeRoute(t){let r=t.children.map(i=>this.serializeRoute(i));return{params:t.params,paramMap:t.paramMap,data:t.data,url:t.url,outlet:t.outlet,title:t.title,routeConfig:t.routeConfig?{component:t.routeConfig.component,path:t.routeConfig.path,pathMatch:t.routeConfig.pathMatch,redirectTo:t.routeConfig.redirectTo,outlet:t.routeConfig.outlet,title:t.routeConfig.title}:null,queryParams:t.queryParams,queryParamMap:t.queryParamMap,fragment:t.fragment,component:t.routeConfig?t.routeConfig.component:void 0,root:void 0,parent:void 0,firstChild:r[0],pathFromRoot:void 0,children:r}}},tt=class{},y=(()=>(y=y||{},y[y.NONE=1]="NONE",y[y.ROUTER=2]="ROUTER",y[y.STORE=3]="STORE",y))(),je=(()=>{let t=class{constructor(i,n,s,u,a,g){this.store=i,this.router=n,this.serializer=s,this.errorHandler=u,this.config=a,this.activeRuntimeChecks=g,this.lastEvent=null,this.routerState=null,this.trigger=y.NONE,this.stateKey=this.config.stateKey,!Ae()&&Q()&&(g?.strictActionSerializability||g?.strictStateSerializability)&&this.serializer instanceof Z&&console.warn("@ngrx/router-store: The serializability runtime checks cannot be enabled with the FullRouterStateSerializer. The FullRouterStateSerializer has an unserializable router state and actions that are not serializable. To use the serializability runtime checks either use the MinimalRouterStateSerializer or implement a custom router state serializer."),this.setUpStoreStateListener(),this.setUpRouterEventsListener()}setUpStoreStateListener(){this.store.pipe(Ie(this.stateKey),L(this.store)).subscribe(([i,n])=>{this.navigateIfNeeded(i,n)})}navigateIfNeeded(i,n){if(!i||!i.state||this.trigger===y.ROUTER||this.lastEvent instanceof yt)return;let s=i.state.url;Ti(this.router.url,s)||(this.storeState=n,this.trigger=y.STORE,this.router.navigateByUrl(s).catch(u=>{this.errorHandler.handleError(u)}))}setUpRouterEventsListener(){let i=this.config.navigationActionTiming===O.PostActivation,n;this.router.events.pipe(L(this.store)).subscribe(([s,u])=>{this.lastEvent=s,s instanceof yt?(this.routerState=this.serializer.serialize(this.router.routerState.snapshot),this.trigger!==y.STORE&&(this.storeState=u,this.dispatchRouterRequest(s))):s instanceof Tt?(n=s,!i&&this.trigger!==y.STORE&&this.dispatchRouterNavigation(s)):s instanceof le?(this.dispatchRouterCancel(s),this.reset()):s instanceof vt?(this.dispatchRouterError(s),this.reset()):s instanceof ue&&(this.trigger!==y.STORE&&(i&&this.dispatchRouterNavigation(n),this.dispatchRouterNavigated(s)),this.reset())})}dispatchRouterRequest(i){this.dispatchRouterAction(Le,{event:i})}dispatchRouterNavigation(i){let n=this.serializer.serialize(i.state);this.dispatchRouterAction(Ue,{routerState:n,event:new Tt(i.id,i.url,i.urlAfterRedirects,n)})}dispatchRouterCancel(i){this.dispatchRouterAction(Fe,{storeState:this.storeState,event:i})}dispatchRouterError(i){this.dispatchRouterAction($e,{storeState:this.storeState,event:new vt(i.id,i.url,`${i}`)})}dispatchRouterNavigated(i){let n=this.serializer.serialize(this.router.routerState.snapshot);this.dispatchRouterAction(Be,{event:i,routerState:n})}dispatchRouterAction(i,n){this.trigger=y.ROUTER;try{this.store.dispatch({type:i,payload:N(C({routerState:this.routerState},n),{event:this.config.routerState===0?n.event:{id:n.event.id,url:n.event.url,urlAfterRedirects:n.event.urlAfterRedirects}})})}finally{this.trigger=y.NONE}}reset(){this.trigger=y.NONE,this.storeState=null,this.routerState=null}},e=t;return(()=>{t.\u0275fac=function(n){return new(n||t)(S(J),S(he),S(tt),S(G),S(Ve),S(Ee))}})(),(()=>{t.\u0275prov=D({token:t,factory:t.\u0275fac})})(),e})();function Ti(e,t){return ze(e)===ze(t)}function ze(e){return e?.length>0&&e[e.length-1]==="/"?e.substring(0,e.length-1):e}function qe(e={}){return q([{provide:Pe,useValue:e},{provide:Ve,useFactory:vi,deps:[Pe]},{provide:tt,useClass:e.serializer?e.serializer:e.routerState===0?Z:Y},{provide:ne,multi:!0,useFactory(){return()=>V(je)}},je])}var $="PERFORM_ACTION",Ii="REFRESH",Je="RESET",Ye="ROLLBACK",Ze="COMMIT",ti="SWEEP",ei="TOGGLE_ACTION",ii="SET_ACTIONS_ACTIVE",ni="JUMP_TO_STATE",ri="JUMP_TO_ACTION",zt="IMPORT_STATE",si="LOCK_CHANGES",oi="PAUSE_RECORDING",j=class{constructor(t,r){if(this.action=t,this.timestamp=r,this.type=$,typeof t.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},xt=class{constructor(){this.type=Ii}},Ot=class{constructor(t){this.timestamp=t,this.type=Je}},Ct=class{constructor(t){this.timestamp=t,this.type=Ye}},bt=class{constructor(t){this.timestamp=t,this.type=Ze}},Nt=class{constructor(){this.type=ti}},wt=class{constructor(t){this.id=t,this.type=ei}},Ge=class{constructor(t,r,i=!0){this.start=t,this.end=r,this.active=i,this.type=ii}},Mt=class{constructor(t){this.index=t,this.type=ni}},_t=class{constructor(t){this.actionId=t,this.type=ri}},Dt=class{constructor(t){this.nextLiftedState=t,this.type=zt}},kt=class{constructor(t){this.status=t,this.type=si}},Pt=class{constructor(t){this.status=t,this.type=oi}},He=class{constructor(){this.maxAge=!1}},rt=new b("@ngrx/store-devtools Options"),Ke=new b("@ngrx/store-devtools Initial Config");function ai(){return null}var Ai="NgRx Store DevTools";function Ri(e){let t={maxAge:!1,monitor:ai,actionSanitizer:void 0,stateSanitizer:void 0,name:Ai,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0}},r=typeof e=="function"?e():e,i=r.logOnly?{pause:!0,export:!0,test:!0}:!1,n=r.features||i||t.features;n.import===!0&&(n.import="custom");let s=Object.assign({},t,{features:n},r);if(s.maxAge&&s.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${s.maxAge}`);return s}function Xe(e,t){return e.filter(r=>t.indexOf(r)<0)}function ci(e){let{computedStates:t,currentStateIndex:r}=e;if(r>=t.length){let{state:n}=t[t.length-1];return n}let{state:i}=t[r];return i}function En(e){return e.actionsById[e.nextActionId-1]}function F(e){return new j(e,+Date.now())}function xi(e,t){return Object.keys(t).reduce((r,i)=>{let n=Number(i);return r[n]=ui(e,t[n],n),r},{})}function ui(e,t,r){return N(C({},t),{action:e(t.action,r)})}function Oi(e,t){return t.map((r,i)=>({state:li(e,r.state,i),error:r.error}))}function li(e,t,r){return e(t,r)}function pi(e){return e.predicate||e.actionsSafelist||e.actionsBlocklist}function Ci(e,t,r,i){let n=[],s={},u=[];return e.stagedActionIds.forEach((a,g)=>{let p=e.actionsById[a];p&&(g&&Lt(e.computedStates[g],p,t,r,i)||(s[a]=p,n.push(a),u.push(e.computedStates[g])))}),N(C({},e),{stagedActionIds:n,actionsById:s,computedStates:u})}function Lt(e,t,r,i,n){let s=r&&!r(e,t.action),u=i&&!t.action.type.match(i.map(g=>Qe(g)).join("|")),a=n&&t.action.type.match(n.map(g=>Qe(g)).join("|"));return s||u||a}function Qe(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var st=(()=>{let t=class extends W{},e=t;return(()=>{t.\u0275fac=function(){let i;return function(s){return(i||(i=ie(t)))(s||t)}}()})(),(()=>{t.\u0275prov=D({token:t,factory:t.\u0275fac})})(),e})(),et={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},jt=new b("@ngrx/store-devtools Redux Devtools Extension"),hi=(()=>{let _DevtoolsExtension=class{constructor(e,t,r){this.config=t,this.dispatcher=r,this.devtoolsExtension=e,this.createActionStreams()}notify(e,t){if(this.devtoolsExtension)if(e.type===$){if(t.isLocked||t.isPaused)return;let r=ci(t);if(pi(this.config)&&Lt(r,e,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let i=this.config.stateSanitizer?li(this.config.stateSanitizer,r,t.currentStateIndex):r,n=this.config.actionSanitizer?ui(this.config.actionSanitizer,e,t.nextActionId):e;this.sendToReduxDevtools(()=>this.extensionConnection.send(n,i))}else{let r=N(C({},t),{stagedActionIds:t.stagedActionIds,actionsById:this.config.actionSanitizer?xi(this.config.actionSanitizer,t.actionsById):t.actionsById,computedStates:this.config.stateSanitizer?Oi(this.config.stateSanitizer,t.computedStates):t.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,r,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new Bt(e=>{let t=this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=t,t.init(),t.subscribe(r=>e.next(r)),t.unsubscribe}):Gt}createActionStreams(){let e=this.createChangesObservable().pipe(Zt()),t=e.pipe(_(a=>a.type===et.START)),r=e.pipe(_(a=>a.type===et.STOP)),i=e.pipe(_(a=>a.type===et.DISPATCH),w(a=>this.unwrapAction(a.payload)),Qt(a=>a.type===zt?this.dispatcher.pipe(_(g=>g.type===At),Kt(1e3),Wt(1e3),w(()=>a),Xt(()=>at(a)),Jt(1)):at(a))),s=e.pipe(_(a=>a.type===et.ACTION),w(a=>this.unwrapAction(a.payload))).pipe(B(r)),u=i.pipe(B(r));this.start$=t.pipe(B(r)),this.actions$=this.start$.pipe(ut(()=>s)),this.liftedActions$=this.start$.pipe(ut(()=>u))}unwrapAction(action){return typeof action=="string"?eval(`(${action})`):action}getExtensionConfig(e){let t={name:e.name,features:e.features,serialize:e.serialize,autoPause:e.autoPause??!1,trace:e.trace??!1,traceLimit:e.traceLimit??75};return e.maxAge!==!1&&(t.maxAge=e.maxAge),t}sendToReduxDevtools(e){try{e()}catch(t){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",t)}}},DevtoolsExtension=_DevtoolsExtension;return(()=>{_DevtoolsExtension.\u0275fac=function(t){return new(t||_DevtoolsExtension)(S(jt),S(rt),S(st))}})(),(()=>{_DevtoolsExtension.\u0275prov=D({token:_DevtoolsExtension,factory:_DevtoolsExtension.\u0275fac})})(),DevtoolsExtension})(),nt={type:It},bi="@ngrx/store-devtools/recompute",Ni={type:bi};function fi(e,t,r,i,n){if(i)return{state:r,error:"Interrupted by an error up the chain"};let s=r,u;try{s=e(r,t)}catch(a){u=a.toString(),n.handleError(a)}return{state:s,error:u}}function it(e,t,r,i,n,s,u,a,g){if(t>=e.length&&e.length===s.length)return e;let p=e.slice(0,t),E=s.length-(g?1:0);for(let o=t;o<E;o++){let h=s[o],v=n[h].action,l=p[o-1],c=l?l.state:i,R=l?l.error:void 0,x=u.indexOf(h)>-1?l:fi(r,v,c,R,a);p.push(x)}return g&&p.push(e[e.length-1]),p}function wi(e,t){return{monitorState:t(void 0,{}),nextActionId:1,actionsById:{0:F(nt)},stagedActionIds:[0],skippedActionIds:[],committedState:e,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function Mi(e,t,r,i,n={}){return s=>(u,a)=>{let{monitorState:g,actionsById:p,nextActionId:E,stagedActionIds:o,skippedActionIds:h,committedState:v,currentStateIndex:l,computedStates:c,isLocked:R,isPaused:T}=u||t;u||(p=Object.create(p));function x(m){let f=m,I=o.slice(1,f+1);for(let A=0;A<I.length;A++)if(c[A+1].error){f=A,I=o.slice(1,f+1);break}else delete p[I[A]];h=h.filter(A=>I.indexOf(A)===-1),o=[0,...o.slice(f+1)],v=c[f].state,c=c.slice(f),l=l>f?l-f:0}function M(){p={0:F(nt)},E=1,o=[0],h=[],v=c[l].state,l=0,c=[]}let d=0;switch(a.type){case si:{R=a.status,d=1/0;break}case oi:{T=a.status,T?(o=[...o,E],p[E]=new j({type:"@ngrx/devtools/pause"},+Date.now()),E++,d=o.length-1,c=c.concat(c[c.length-1]),l===o.length-2&&l++,d=1/0):M();break}case Je:{p={0:F(nt)},E=1,o=[0],h=[],v=e,l=0,c=[];break}case Ze:{M();break}case Ye:{p={0:F(nt)},E=1,o=[0],h=[],l=0,c=[];break}case ei:{let{id:m}=a;h.indexOf(m)===-1?h=[m,...h]:h=h.filter(I=>I!==m),d=o.indexOf(m);break}case ii:{let{start:m,end:f,active:I}=a,A=[];for(let ot=m;ot<f;ot++)A.push(ot);I?h=Xe(h,A):h=[...h,...A],d=o.indexOf(m);break}case ni:{l=a.index,d=1/0;break}case ri:{let m=o.indexOf(a.actionId);m!==-1&&(l=m),d=1/0;break}case ti:{o=Xe(o,h),h=[],l=Math.min(l,o.length-1);break}case $:{if(R)return u||t;if(T||u&&Lt(u.computedStates[l],a,n.predicate,n.actionsSafelist,n.actionsBlocklist)){let f=c[c.length-1];c=[...c.slice(0,-1),fi(s,a.action,f.state,f.error,r)],d=1/0;break}n.maxAge&&o.length===n.maxAge&&x(1),l===o.length-1&&l++;let m=E++;p[m]=a,o=[...o,m],d=o.length-1;break}case zt:{({monitorState:g,actionsById:p,nextActionId:E,stagedActionIds:o,skippedActionIds:h,committedState:v,currentStateIndex:l,computedStates:c,isLocked:R,isPaused:T}=a.nextLiftedState);break}case It:{d=0,n.maxAge&&o.length>n.maxAge&&(c=it(c,d,s,v,p,o,h,r,T),x(o.length-n.maxAge),d=1/0);break}case At:{if(c.filter(f=>f.error).length>0)d=0,n.maxAge&&o.length>n.maxAge&&(c=it(c,d,s,v,p,o,h,r,T),x(o.length-n.maxAge),d=1/0);else{if(!T&&!R){l===o.length-1&&l++;let f=E++;p[f]=new j(a,+Date.now()),o=[...o,f],d=o.length-1,c=it(c,d,s,v,p,o,h,r,T)}c=c.map(f=>N(C({},f),{state:s(f.state,Ni)})),l=o.length-1,n.maxAge&&o.length>n.maxAge&&x(o.length-n.maxAge),d=1/0}break}default:{d=1/0;break}}return c=it(c,d,s,v,p,o,h,r,T),g=i(g,a),{monitorState:g,actionsById:p,nextActionId:E,stagedActionIds:o,skippedActionIds:h,committedState:v,currentStateIndex:l,computedStates:c,isLocked:R,isPaused:T}}}var We=(()=>{let t=class{constructor(i,n,s,u,a,g,p,E){let o=wi(p,E.monitor),h=Mi(p,o,g,E.monitor,E),v=ct(ct(n.asObservable().pipe(te(1)),u.actions$).pipe(w(F)),i,u.liftedActions$).pipe(Ht(qt)),l=s.pipe(w(h)),c=new Vt(1),R=v.pipe(L(l),Yt(({state:d},[m,f])=>{let I=f(d,m);return m.type!==$&&pi(E)&&(I=Ci(I,E.predicate,E.actionsSafelist,E.actionsBlocklist)),u.notify(m,I),{state:I,action:m}},{state:o,action:null})).subscribe(({state:d,action:m})=>{if(c.next(d),m.type===$){let f=m.action;a.next(f)}}),T=u.start$.subscribe(()=>{this.refresh()}),x=c.asObservable(),M=x.pipe(w(ci));Object.defineProperty(M,"state",{value:me(M,{manualCleanup:!0,requireSync:!0})}),this.extensionStartSubscription=T,this.stateSubscription=R,this.dispatcher=i,this.liftedState=x,this.state=M}dispatch(i){this.dispatcher.next(i)}next(i){this.dispatcher.next(i)}error(i){}complete(){}performAction(i){this.dispatch(new j(i,+Date.now()))}refresh(){this.dispatch(new xt)}reset(){this.dispatch(new Ot(+Date.now()))}rollback(){this.dispatch(new Ct(+Date.now()))}commit(){this.dispatch(new bt(+Date.now()))}sweep(){this.dispatch(new Nt)}toggleAction(i){this.dispatch(new wt(i))}jumpToAction(i){this.dispatch(new _t(i))}jumpToState(i){this.dispatch(new Mt(i))}importState(i){this.dispatch(new Dt(i))}lockChanges(i){this.dispatch(new kt(i))}pauseRecording(i){this.dispatch(new Pt(i))}},e=t;return(()=>{t.\u0275fac=function(n){return new(n||t)(S(st),S(W),S(Se),S(hi),S(ve),S(G),S(ge),S(rt))}})(),(()=>{t.\u0275prov=D({token:t,factory:t.\u0275fac})})(),e})(),_i=new b("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function Di(e,t){return!!e||t.monitor!==ai}function ki(){let e="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[e]<"u"?window[e]:null}function Ut(e={}){return q([hi,st,We,{provide:Ke,useValue:e},{provide:_i,deps:[jt,rt],useFactory:Di},{provide:jt,useFactory:ki},{provide:rt,deps:[Ke],useFactory:Ri},{provide:Te,deps:[We],useFactory:Pi},{provide:ye,useExisting:st}])}function Pi(e){return e.state}var Sn=(()=>{let t=class{static instrument(i={}){return{ngModule:t,providers:[Ut(i)]}}},e=t;return(()=>{t.\u0275fac=function(n){return new(n||t)}})(),(()=>{t.\u0275mod=pt({type:t})})(),(()=>{t.\u0275inj=lt({})})(),e})();var di=[{path:"create",loadComponent:()=>import("./house.create-4OXCL4B6.js")},{path:"edit/:id",loadComponent:()=>import("./view-CDYADXS7.js")},{path:"**",pathMatch:"full",redirectTo:"create"}];var mi={providers:[Re({houseState:be,authState:we}),xe(Ce,Oe,Ne),qe(),Ut({logOnly:!Q()}),fe(di,de())]};ce(ke,mi).catch(e=>console.log(e));
