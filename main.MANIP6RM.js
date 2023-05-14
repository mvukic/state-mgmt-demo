import{a as ze,b as Le}from"./chunk-ZRZP7LXR.js";import{a as Ne,b as we,c as _e,d as Me,j as ke,k as Pe,l as je}from"./chunk-B6NSI7HG.js";import{$ as re,$a as _,Ba as ae,D as Zt,E as te,F as ee,H as lt,I as G,Ia as W,K as F,N as P,Na as ce,O as pt,P as S,Pa as ue,Q as j,Qa as At,R as ie,Ra as le,S as ft,Sa as pe,Ta as vt,Ua as It,Va as fe,Wa as he,X as ht,Xa as de,Y as dt,Ya as me,Z as ne,Za as ge,_ as w,_a as z,aa as q,ab as Ee,b as Vt,bb as Se,cb as Tt,d as Gt,db as J,e as qt,ea as H,eb as ye,fa as K,fb as Ae,g as Ht,h as Kt,ib as ve,j as ct,jb as Ie,k as Xt,ka as mt,kb as Rt,l as b,la as gt,lb as Te,ma as X,mb as Re,na as $,nb as Y,oa as oe,ob as xe,pb as Oe,q as ut,r as k,ra as Et,rb as Ce,sb as xt,t as Qt,ta as St,tb as be,u as Wt,ua as yt,ub as De,v as Jt,w as Yt,wa as Q,ya as se}from"./chunk-OMWHFBQT.js";import{a as R,b as x,d as U,e as $t,f as Bt}from"./chunk-JY5MMDH3.js";var M=Ee({source:"Auth",events:{login:_(),logout:Se()}});var xi=Ne((e=j(we))=>e.pipe(_e(M.logout),b(()=>De.close())),{functional:!0,dispatch:!0}),Ue={onLogoutEffect:xi};var Fe=()=>({name:"@user_name",loggedIn:!0});var $e=be(Fe(),xt(M.logout,e=>x(R({},e),{name:"Anonymous",loggedIn:!1})),xt(M.login,(e,{name:t})=>x(R({},e),{name:t,loggedIn:!0})));function Oi(e,t){if(e&1){let r=Et();X(0,"button",2),St("click",function(){ht(r);let n=yt();return dt(n.login())}),Q(1,"Login"),$()}}function Ci(e,t){if(e&1){let r=Et();X(0,"button",2),St("click",function(){ht(r);let n=yt();return dt(n.logout())}),Q(1,"Logout"),$()}}var Ve=(()=>{var t;let r=class{constructor(){$t(this,t,void 0);Bt(this,t,j(Y)),this.name=U(this,t).selectSignal(ze),this.isLoggedIn=U(this,t).selectSignal(Le)}logout(){U(this,t).dispatch(M.logout())}login(){U(this,t).dispatch(M.login({name:"@user_name"}))}},e=r;return t=new WeakMap,(()=>{r.\u0275fac=function(o){return new(o||r)}})(),(()=>{r.\u0275cmp=ie({type:r,selectors:[["app-root"]],standalone:!0,features:[ae],decls:6,vars:3,consts:[[2,"background","black","color","white"],[3,"click",4,"ngIf"],[3,"click"]],template:function(o,u){o&1&&(X(0,"div",0)(1,"span"),Q(2),$(),mt(3,Oi,2,0,"button",1),mt(4,Ci,2,0,"button",1),$(),oe(5,"router-outlet")),o&2&&(K(2),se(" ",u.name(),""),K(1),gt("ngIf",!u.isLoggedIn()),K(1),gt("ngIf",u.isLoggedIn()))},dependencies:[fe,ce],encapsulation:2,changeDetection:0})})(),e})();var Ke="@ngrx/router-store/request",Dn=z(Ke,_()),Xe="@ngrx/router-store/navigation",kn=z(Xe,_()),Qe="@ngrx/router-store/cancel",Pn=z(Qe,_()),We="@ngrx/router-store/error",jn=z(We,_()),Je="@ngrx/router-store/navigated",zn=z(Je,_());var Z=class{serialize(t){return{root:this.serializeRoute(t.root),url:t.url}}serializeRoute(t){let r=t.children.map(i=>this.serializeRoute(i));return{params:t.params,data:t.data,url:t.url,outlet:t.outlet,title:t.title,routeConfig:t.routeConfig?{path:t.routeConfig.path,pathMatch:t.routeConfig.pathMatch,redirectTo:t.routeConfig.redirectTo,outlet:t.routeConfig.outlet,title:typeof t.routeConfig.title=="string"?t.routeConfig.title:void 0}:null,queryParams:t.queryParams,fragment:t.fragment,firstChild:r[0],children:r}}},N=(()=>(N=N||{},N[N.PreActivation=1]="PreActivation",N[N.PostActivation=2]="PostActivation",N))(),Ni="router",Ge=new w("@ngrx/router-store Internal Configuration"),Ye=new w("@ngrx/router-store Configuration");function wi(e){return R({stateKey:Ni,serializer:Z,navigationActionTiming:N.PreActivation},e)}var tt=class{serialize(t){return{root:this.serializeRoute(t.root),url:t.url}}serializeRoute(t){let r=t.children.map(i=>this.serializeRoute(i));return{params:t.params,paramMap:t.paramMap,data:t.data,url:t.url,outlet:t.outlet,title:t.title,routeConfig:t.routeConfig?{component:t.routeConfig.component,path:t.routeConfig.path,pathMatch:t.routeConfig.pathMatch,redirectTo:t.routeConfig.redirectTo,outlet:t.routeConfig.outlet,title:t.routeConfig.title}:null,queryParams:t.queryParams,queryParamMap:t.queryParamMap,fragment:t.fragment,component:t.routeConfig?t.routeConfig.component:void 0,root:void 0,parent:void 0,firstChild:r[0],pathFromRoot:void 0,children:r}}},et=class{},y=(()=>(y=y||{},y[y.NONE=1]="NONE",y[y.ROUTER=2]="ROUTER",y[y.STORE=3]="STORE",y))(),qe=(()=>{let t=class{constructor(i,n,o,u,a,g){this.store=i,this.router=n,this.serializer=o,this.errorHandler=u,this.config=a,this.activeRuntimeChecks=g,this.lastEvent=null,this.routerState=null,this.trigger=y.NONE,this.stateKey=this.config.stateKey,!Oe()&&W()&&(g?.strictActionSerializability||g?.strictStateSerializability)&&this.serializer instanceof tt&&console.warn("@ngrx/router-store: The serializability runtime checks cannot be enabled with the FullRouterStateSerializer. The FullRouterStateSerializer has an unserializable router state and actions that are not serializable. To use the serializability runtime checks either use the MinimalRouterStateSerializer or implement a custom router state serializer."),this.setUpStoreStateListener(),this.setUpRouterEventsListener()}setUpStoreStateListener(){this.store.pipe(xe(this.stateKey),F(this.store)).subscribe(([i,n])=>{this.navigateIfNeeded(i,n)})}navigateIfNeeded(i,n){if(!i||!i.state||this.trigger===y.ROUTER||this.lastEvent instanceof At)return;let o=i.state.url;_i(this.router.url,o)||(this.storeState=n,this.trigger=y.STORE,this.router.navigateByUrl(o).catch(u=>{this.errorHandler.handleError(u)}))}setUpRouterEventsListener(){let i=this.config.navigationActionTiming===N.PostActivation,n;this.router.events.pipe(F(this.store)).subscribe(([o,u])=>{this.lastEvent=o,o instanceof At?(this.routerState=this.serializer.serialize(this.router.routerState.snapshot),this.trigger!==y.STORE&&(this.storeState=u,this.dispatchRouterRequest(o))):o instanceof It?(n=o,!i&&this.trigger!==y.STORE&&this.dispatchRouterNavigation(o)):o instanceof pe?(this.dispatchRouterCancel(o),this.reset()):o instanceof vt?(this.dispatchRouterError(o),this.reset()):o instanceof le&&(this.trigger!==y.STORE&&(i&&this.dispatchRouterNavigation(n),this.dispatchRouterNavigated(o)),this.reset())})}dispatchRouterRequest(i){this.dispatchRouterAction(Ke,{event:i})}dispatchRouterNavigation(i){let n=this.serializer.serialize(i.state);this.dispatchRouterAction(Xe,{routerState:n,event:new It(i.id,i.url,i.urlAfterRedirects,n)})}dispatchRouterCancel(i){this.dispatchRouterAction(Qe,{storeState:this.storeState,event:i})}dispatchRouterError(i){this.dispatchRouterAction(We,{storeState:this.storeState,event:new vt(i.id,i.url,`${i}`)})}dispatchRouterNavigated(i){let n=this.serializer.serialize(this.router.routerState.snapshot);this.dispatchRouterAction(Je,{event:i,routerState:n})}dispatchRouterAction(i,n){this.trigger=y.ROUTER;try{this.store.dispatch({type:i,payload:x(R({routerState:this.routerState},n),{event:this.config.routerState===0?n.event:{id:n.event.id,url:n.event.url,urlAfterRedirects:n.event.urlAfterRedirects}})})}finally{this.trigger=y.NONE}}reset(){this.trigger=y.NONE,this.storeState=null,this.routerState=null}},e=t;return(()=>{t.\u0275fac=function(n){return new(n||t)(S(Y),S(he),S(et),S(H),S(Ye),S(Ae))}})(),(()=>{t.\u0275prov=P({token:t,factory:t.\u0275fac})})(),e})();function _i(e,t){return He(e)===He(t)}function He(e){return e?.length>0&&e[e.length-1]==="/"?e.substring(0,e.length-1):e}function Ze(e={}){return q([{provide:Ge,useValue:e},{provide:Ye,useFactory:wi,deps:[Ge]},{provide:et,useClass:e.serializer?e.serializer:e.routerState===0?tt:Z},{provide:re,multi:!0,useFactory(){return()=>j(qe)}},qe])}var V="PERFORM_ACTION",Mi="REFRESH",si="RESET",ai="ROLLBACK",ci="COMMIT",ui="SWEEP",li="TOGGLE_ACTION",pi="SET_ACTIONS_ACTIVE",fi="JUMP_TO_STATE",hi="JUMP_TO_ACTION",Lt="IMPORT_STATE",di="LOCK_CHANGES",mi="PAUSE_RECORDING",L=class{constructor(t,r){if(this.action=t,this.timestamp=r,this.type=V,typeof t.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},Ot=class{constructor(){this.type=Mi}},Ct=class{constructor(t){this.timestamp=t,this.type=si}},bt=class{constructor(t){this.timestamp=t,this.type=ai}},Nt=class{constructor(t){this.timestamp=t,this.type=ci}},wt=class{constructor(){this.type=ui}},_t=class{constructor(t){this.id=t,this.type=li}},ti=class{constructor(t,r,i=!0){this.start=t,this.end=r,this.active=i,this.type=pi}},Mt=class{constructor(t){this.index=t,this.type=fi}},Dt=class{constructor(t){this.actionId=t,this.type=hi}},kt=class{constructor(t){this.nextLiftedState=t,this.type=Lt}},Pt=class{constructor(t){this.status=t,this.type=di}},jt=class{constructor(t){this.status=t,this.type=mi}},ei=class{constructor(){this.maxAge=!1}},ot=new w("@ngrx/store-devtools Options"),ii=new w("@ngrx/store-devtools Initial Config");function gi(){return null}var Di="NgRx Store DevTools";function ki(e){let t={maxAge:!1,monitor:gi,actionSanitizer:void 0,stateSanitizer:void 0,name:Di,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0}},r=typeof e=="function"?e():e,i=r.logOnly?{pause:!0,export:!0,test:!0}:!1,n=r.features||i||t.features;n.import===!0&&(n.import="custom");let o=Object.assign({},t,{features:n},r);if(o.maxAge&&o.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${o.maxAge}`);return o}function ni(e,t){return e.filter(r=>t.indexOf(r)<0)}function Ei(e){let{computedStates:t,currentStateIndex:r}=e;if(r>=t.length){let{state:n}=t[t.length-1];return n}let{state:i}=t[r];return i}function Xn(e){return e.actionsById[e.nextActionId-1]}function B(e){return new L(e,+Date.now())}function Pi(e,t){return Object.keys(t).reduce((r,i)=>{let n=Number(i);return r[n]=Si(e,t[n],n),r},{})}function Si(e,t,r){return x(R({},t),{action:e(t.action,r)})}function ji(e,t){return t.map((r,i)=>({state:yi(e,r.state,i),error:r.error}))}function yi(e,t,r){return e(t,r)}function Ai(e){return e.predicate||e.actionsSafelist||e.actionsBlocklist}function zi(e,t,r,i){let n=[],o={},u=[];return e.stagedActionIds.forEach((a,g)=>{let p=e.actionsById[a];p&&(g&&Ut(e.computedStates[g],p,t,r,i)||(o[a]=p,n.push(a),u.push(e.computedStates[g])))}),x(R({},e),{stagedActionIds:n,actionsById:o,computedStates:u})}function Ut(e,t,r,i,n){let o=r&&!r(e,t.action),u=i&&!t.action.type.match(i.map(g=>ri(g)).join("|")),a=n&&t.action.type.match(n.map(g=>ri(g)).join("|"));return o||u||a}function ri(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var st=(()=>{let t=class extends J{},e=t;return(()=>{t.\u0275fac=function(){let i;return function(o){return(i||(i=ne(t)))(o||t)}}()})(),(()=>{t.\u0275prov=P({token:t,factory:t.\u0275fac})})(),e})(),it={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},zt=new w("@ngrx/store-devtools Redux Devtools Extension"),vi=(()=>{let _DevtoolsExtension=class{constructor(e,t,r){this.config=t,this.dispatcher=r,this.devtoolsExtension=e,this.createActionStreams()}notify(e,t){if(this.devtoolsExtension)if(e.type===V){if(t.isLocked||t.isPaused)return;let r=Ei(t);if(Ai(this.config)&&Ut(r,e,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let i=this.config.stateSanitizer?yi(this.config.stateSanitizer,r,t.currentStateIndex):r,n=this.config.actionSanitizer?Si(this.config.actionSanitizer,e,t.nextActionId):e;this.sendToReduxDevtools(()=>this.extensionConnection.send(n,i))}else{let r=x(R({},t),{stagedActionIds:t.stagedActionIds,actionsById:this.config.actionSanitizer?Pi(this.config.actionSanitizer,t.actionsById):t.actionsById,computedStates:this.config.stateSanitizer?ji(this.config.stateSanitizer,t.computedStates):t.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,r,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new Vt(e=>{let t=this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=t,t.init(),t.subscribe(r=>e.next(r)),t.unsubscribe}):Ht}createActionStreams(){let e=this.createChangesObservable().pipe(te()),t=e.pipe(k(a=>a.type===it.START)),r=e.pipe(k(a=>a.type===it.STOP)),i=e.pipe(k(a=>a.type===it.DISPATCH),b(a=>this.unwrapAction(a.payload)),Wt(a=>a.type===Lt?this.dispatcher.pipe(k(g=>g.type===Rt),Xt(1e3),Jt(1e3),b(()=>a),Qt(()=>ct(a)),Yt(1)):ct(a))),o=e.pipe(k(a=>a.type===it.ACTION),b(a=>this.unwrapAction(a.payload))).pipe(G(r)),u=i.pipe(G(r));this.start$=t.pipe(G(r)),this.actions$=this.start$.pipe(lt(()=>o)),this.liftedActions$=this.start$.pipe(lt(()=>u))}unwrapAction(action){return typeof action=="string"?eval(`(${action})`):action}getExtensionConfig(e){let t={name:e.name,features:e.features,serialize:e.serialize,autoPause:e.autoPause??!1,trace:e.trace??!1,traceLimit:e.traceLimit??75};return e.maxAge!==!1&&(t.maxAge=e.maxAge),t}sendToReduxDevtools(e){try{e()}catch(t){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",t)}}},DevtoolsExtension=_DevtoolsExtension;return(()=>{_DevtoolsExtension.\u0275fac=function(t){return new(t||_DevtoolsExtension)(S(zt),S(ot),S(st))}})(),(()=>{_DevtoolsExtension.\u0275prov=P({token:_DevtoolsExtension,factory:_DevtoolsExtension.\u0275fac})})(),DevtoolsExtension})(),rt={type:Tt},Li="@ngrx/store-devtools/recompute",Ui={type:Li};function Ii(e,t,r,i,n){if(i)return{state:r,error:"Interrupted by an error up the chain"};let o=r,u;try{o=e(r,t)}catch(a){u=a.toString(),n.handleError(a)}return{state:o,error:u}}function nt(e,t,r,i,n,o,u,a,g){if(t>=e.length&&e.length===o.length)return e;let p=e.slice(0,t),E=o.length-(g?1:0);for(let s=t;s<E;s++){let f=o[s],A=n[f].action,l=p[s-1],c=l?l.state:i,O=l?l.error:void 0,C=u.indexOf(f)>-1?l:Ii(r,A,c,O,a);p.push(C)}return g&&p.push(e[e.length-1]),p}function Fi(e,t){return{monitorState:t(void 0,{}),nextActionId:1,actionsById:{0:B(rt)},stagedActionIds:[0],skippedActionIds:[],committedState:e,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function $i(e,t,r,i,n={}){return o=>(u,a)=>{let{monitorState:g,actionsById:p,nextActionId:E,stagedActionIds:s,skippedActionIds:f,committedState:A,currentStateIndex:l,computedStates:c,isLocked:O,isPaused:v}=u||t;u||(p=Object.create(p));function C(m){let h=m,I=s.slice(1,h+1);for(let T=0;T<I.length;T++)if(c[T+1].error){h=T,I=s.slice(1,h+1);break}else delete p[I[T]];f=f.filter(T=>I.indexOf(T)===-1),s=[0,...s.slice(h+1)],A=c[h].state,c=c.slice(h),l=l>h?l-h:0}function D(){p={0:B(rt)},E=1,s=[0],f=[],A=c[l].state,l=0,c=[]}let d=0;switch(a.type){case di:{O=a.status,d=1/0;break}case mi:{v=a.status,v?(s=[...s,E],p[E]=new L({type:"@ngrx/devtools/pause"},+Date.now()),E++,d=s.length-1,c=c.concat(c[c.length-1]),l===s.length-2&&l++,d=1/0):D();break}case si:{p={0:B(rt)},E=1,s=[0],f=[],A=e,l=0,c=[];break}case ci:{D();break}case ai:{p={0:B(rt)},E=1,s=[0],f=[],l=0,c=[];break}case li:{let{id:m}=a;f.indexOf(m)===-1?f=[m,...f]:f=f.filter(I=>I!==m),d=s.indexOf(m);break}case pi:{let{start:m,end:h,active:I}=a,T=[];for(let at=m;at<h;at++)T.push(at);I?f=ni(f,T):f=[...f,...T],d=s.indexOf(m);break}case fi:{l=a.index,d=1/0;break}case hi:{let m=s.indexOf(a.actionId);m!==-1&&(l=m),d=1/0;break}case ui:{s=ni(s,f),f=[],l=Math.min(l,s.length-1);break}case V:{if(O)return u||t;if(v||u&&Ut(u.computedStates[l],a,n.predicate,n.actionsSafelist,n.actionsBlocklist)){let h=c[c.length-1];c=[...c.slice(0,-1),Ii(o,a.action,h.state,h.error,r)],d=1/0;break}n.maxAge&&s.length===n.maxAge&&C(1),l===s.length-1&&l++;let m=E++;p[m]=a,s=[...s,m],d=s.length-1;break}case Lt:{({monitorState:g,actionsById:p,nextActionId:E,stagedActionIds:s,skippedActionIds:f,committedState:A,currentStateIndex:l,computedStates:c,isLocked:O,isPaused:v}=a.nextLiftedState);break}case Tt:{d=0,n.maxAge&&s.length>n.maxAge&&(c=nt(c,d,o,A,p,s,f,r,v),C(s.length-n.maxAge),d=1/0);break}case Rt:{if(c.filter(h=>h.error).length>0)d=0,n.maxAge&&s.length>n.maxAge&&(c=nt(c,d,o,A,p,s,f,r,v),C(s.length-n.maxAge),d=1/0);else{if(!v&&!O){l===s.length-1&&l++;let h=E++;p[h]=new L(a,+Date.now()),s=[...s,h],d=s.length-1,c=nt(c,d,o,A,p,s,f,r,v)}c=c.map(h=>x(R({},h),{state:o(h.state,Ui)})),l=s.length-1,n.maxAge&&s.length>n.maxAge&&C(s.length-n.maxAge),d=1/0}break}default:{d=1/0;break}}return c=nt(c,d,o,A,p,s,f,r,v),g=i(g,a),{monitorState:g,actionsById:p,nextActionId:E,stagedActionIds:s,skippedActionIds:f,committedState:A,currentStateIndex:l,computedStates:c,isLocked:O,isPaused:v}}}var oi=(()=>{let t=class{constructor(i,n,o,u,a,g,p,E){let s=Fi(p,E.monitor),f=$i(p,s,g,E.monitor,E),A=ut(ut(n.asObservable().pipe(ee(1)),u.actions$).pipe(b(B)),i,u.liftedActions$).pipe(Kt(qt)),l=o.pipe(b(f)),c=new Gt(1),O=A.pipe(F(l),Zt(({state:d},[m,h])=>{let I=h(d,m);return m.type!==V&&Ai(E)&&(I=zi(I,E.predicate,E.actionsSafelist,E.actionsBlocklist)),u.notify(m,I),{state:I,action:m}},{state:s,action:null})).subscribe(({state:d,action:m})=>{if(c.next(d),m.type===V){let h=m.action;a.next(h)}}),v=u.start$.subscribe(()=>{this.refresh()}),C=c.asObservable(),D=C.pipe(b(Ei));Object.defineProperty(D,"state",{value:ge(D,{manualCleanup:!0,requireSync:!0})}),this.extensionStartSubscription=v,this.stateSubscription=O,this.dispatcher=i,this.liftedState=C,this.state=D}dispatch(i){this.dispatcher.next(i)}next(i){this.dispatcher.next(i)}error(i){}complete(){}performAction(i){this.dispatch(new L(i,+Date.now()))}refresh(){this.dispatch(new Ot)}reset(){this.dispatch(new Ct(+Date.now()))}rollback(){this.dispatch(new bt(+Date.now()))}commit(){this.dispatch(new Nt(+Date.now()))}sweep(){this.dispatch(new wt)}toggleAction(i){this.dispatch(new _t(i))}jumpToAction(i){this.dispatch(new Dt(i))}jumpToState(i){this.dispatch(new Mt(i))}importState(i){this.dispatch(new kt(i))}lockChanges(i){this.dispatch(new Pt(i))}pauseRecording(i){this.dispatch(new jt(i))}},e=t;return(()=>{t.\u0275fac=function(n){return new(n||t)(S(st),S(J),S(ve),S(vi),S(Te),S(H),S(ye),S(ot))}})(),(()=>{t.\u0275prov=P({token:t,factory:t.\u0275fac})})(),e})(),Bi=new w("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function Vi(e,t){return!!e||t.monitor!==gi}function Gi(){let e="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[e]<"u"?window[e]:null}function Ft(e={}){return q([vi,st,oi,{provide:ii,useValue:e},{provide:Bi,deps:[zt,ot],useFactory:Vi},{provide:zt,useFactory:Gi},{provide:ot,deps:[ii],useFactory:ki},{provide:Re,deps:[oi],useFactory:qi},{provide:Ie,useExisting:st}])}function qi(e){return e.state}var Qn=(()=>{let t=class{static instrument(i={}){return{ngModule:t,providers:[Ft(i)]}}},e=t;return(()=>{t.\u0275fac=function(n){return new(n||t)}})(),(()=>{t.\u0275mod=ft({type:t})})(),(()=>{t.\u0275inj=pt({})})(),e})();var Ti=[{path:"create",loadComponent:()=>import("./house.create-66SQ7W3R.js")},{path:"edit/:id",loadComponent:()=>import("./house.view-KPGLNNUI.js")},{path:"**",pathMatch:"full",redirectTo:"create"}];var Ri={providers:[Ce({houseState:je,authState:$e}),Me(Pe,ke,Ue),Ze(),Ft({logOnly:!W()}),de(Ti,me())]};ue(Ve,Ri).catch(e=>console.log(e));
