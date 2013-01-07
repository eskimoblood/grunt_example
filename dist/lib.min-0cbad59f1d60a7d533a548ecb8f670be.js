(function(){var t,e=this,n=e.Backbone,r=[],i=r.push,s=r.slice,a=r.splice;t="undefined"!=typeof exports?exports:e.Backbone={},t.VERSION="0.9.9";var o=e._;o||"undefined"==typeof require||(o=require("underscore")),t.$=e.jQuery||e.Zepto||e.ender,t.noConflict=function(){return e.Backbone=n,this},t.emulateHTTP=!1,t.emulateJSON=!1;var u=/\s+/,c=function(t,e,n,r){if(!n)return!0;if("object"==typeof n)for(var i in n)t[e].apply(t,[i,n[i]].concat(r));else{if(!u.test(n))return!0;for(var s=n.split(u),a=0,o=s.length;o>a;a++)t[e].apply(t,[s[a]].concat(r))}},l=function(t,e,n){var r,i=-1,s=e.length;switch(n.length){case 0:for(;s>++i;)(r=e[i]).callback.call(r.ctx);return;case 1:for(;s>++i;)(r=e[i]).callback.call(r.ctx,n[0]);return;case 2:for(;s>++i;)(r=e[i]).callback.call(r.ctx,n[0],n[1]);return;case 3:for(;s>++i;)(r=e[i]).callback.call(r.ctx,n[0],n[1],n[2]);return;default:for(;s>++i;)(r=e[i]).callback.apply(r.ctx,n)}},h=t.Events={on:function(t,e,n){if(!c(this,"on",t,[e,n])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);return r.push({callback:e,context:n,ctx:n||this}),this},once:function(t,e,n){if(!c(this,"once",t,[e,n])||!e)return this;var r=this,i=o.once(function(){r.off(t,i),e.apply(this,arguments)});return i._callback=e,this.on(t,i,n),this},off:function(t,e,n){var r,i,s,a,u,l,h,f;if(!this._events||!c(this,"off",t,[e,n]))return this;if(!t&&!e&&!n)return this._events={},this;for(a=t?[t]:o.keys(this._events),u=0,l=a.length;l>u;u++)if(t=a[u],r=this._events[t]){if(s=[],e||n)for(h=0,f=r.length;f>h;h++)i=r[h],(e&&e!==(i.callback._callback||i.callback)||n&&n!==i.context)&&s.push(i);this._events[t]=s}return this},trigger:function(t){if(!this._events)return this;var e=s.call(arguments,1);if(!c(this,"trigger",t,e))return this;var n=this._events[t],r=this._events.all;return n&&l(this,n,e),r&&l(this,r,arguments),this},listenTo:function(t,e,n){var r=this._listeners||(this._listeners={}),i=t._listenerId||(t._listenerId=o.uniqueId("l"));return r[i]=t,t.on(e,n||this,this),this},stopListening:function(t,e,n){var r=this._listeners;if(r){if(t)t.off(e,n,this),e||n||delete r[t._listenerId];else{for(var i in r)r[i].off(null,null,this);this._listeners={}}return this}}};h.bind=h.on,h.unbind=h.off,o.extend(t,h);var f=t.Model=function(t,e){var n,r=t||{};this.cid=o.uniqueId("c"),this.changed={},this.attributes={},this._changes=[],e&&e.collection&&(this.collection=e.collection),e&&e.parse&&(r=this.parse(r)),(n=o.result(this,"defaults"))&&o.defaults(r,n),this.set(r,{silent:!0}),this._currentAttributes=o.clone(this.attributes),this._previousAttributes=o.clone(this.attributes),this.initialize.apply(this,arguments)};o.extend(f.prototype,h,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(){return o.clone(this.attributes)},sync:function(){return t.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return o.escape(this.get(t))},has:function(t){return null!=this.get(t)},set:function(t,e,n){var r,i;if(null==t)return this;o.isObject(t)?(i=t,n=e):(i={})[t]=e;var s=n&&n.silent,a=n&&n.unset;if(!this._validate(i,n))return!1;this.idAttribute in i&&(this.id=i[this.idAttribute]);var u=this.attributes;for(r in i)e=i[r],a?delete u[r]:u[r]=e,this._changes.push(r,e);return this._hasComputed=!1,s||this.change(n),this},unset:function(t,e){return this.set(t,void 0,o.extend({},e,{unset:!0}))},clear:function(t){var e={};for(var n in this.attributes)e[n]=void 0;return this.set(e,o.extend({},t,{unset:!0}))},fetch:function(t){t=t?o.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=this,n=t.success;return t.success=function(r){return e.set(e.parse(r),t)?(n&&n(e,r,t),void 0):!1},this.sync("read",this,t)},save:function(t,e,n){var r,i,s;if(null==t||o.isObject(t)?(r=t,n=e):null!=t&&((r={})[t]=e),n=n?o.clone(n):{},n.wait){if(r&&!this._validate(r,n))return!1;i=o.clone(this.attributes)}var a=o.extend({},n,{silent:!0});if(r&&!this.set(r,n.wait?a:n))return!1;if(!r&&!this._validate(null,n))return!1;var u=this,c=n.success;n.success=function(t){s=!0;var e=u.parse(t);return n.wait&&(e=o.extend(r||{},e)),u.set(e,n)?(c&&c(u,t,n),void 0):!1};var l=this.isNew()?"create":n.patch?"patch":"update";"patch"==l&&(n.attrs=r);var h=this.sync(l,this,n);return!s&&n.wait&&(this.clear(a),this.set(i,a)),h},destroy:function(t){t=t?o.clone(t):{};var e=this,n=t.success,r=function(){e.trigger("destroy",e,e.collection,t)};if(t.success=function(i){(t.wait||e.isNew())&&r(),n&&n(e,i,t)},this.isNew())return t.success(),!1;var i=this.sync("delete",this,t);return t.wait||r(),i},url:function(){var t=o.result(this,"urlRoot")||o.result(this.collection,"url")||I();return this.isNew()?t:t+("/"===t.charAt(t.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(t){var e=this._changing;this._changing=!0;var n=this._computeChanges(!0);this._pending=!!n.length;for(var r=n.length-2;r>=0;r-=2)this.trigger("change:"+n[r],this,n[r+1],t);if(e)return this;for(;this._pending;)this._pending=!1,this.trigger("change",this,t),this._previousAttributes=o.clone(this.attributes);return this._changing=!1,this},hasChanged:function(t){return this._hasComputed||this._computeChanges(),null==t?!o.isEmpty(this.changed):o.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?o.clone(this.changed):!1;var e,n=!1,r=this._previousAttributes;for(var i in t)o.isEqual(r[i],e=t[i])||((n||(n={}))[i]=e);return n},_computeChanges:function(t){this.changed={};for(var e={},n=[],r=this._currentAttributes,i=this._changes,s=i.length-2;s>=0;s-=2){var a=i[s],o=i[s+1];if(!e[a]&&(e[a]=!0,r[a]!==o)){if(this.changed[a]=o,!t)continue;n.push(a,o),r[a]=o}}return t&&(this._changes=[]),this._hasComputed=!0,n},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return o.clone(this._previousAttributes)},_validate:function(t,e){if(!this.validate)return!0;t=o.extend({},this.attributes,t);var n=this.validate(t,e);return n?(e&&e.error&&e.error(this,n,e),this.trigger("error",this,n,e),!1):!0}});var p=t.Collection=function(t,e){e||(e={}),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,o.extend({silent:!0},e))};o.extend(p.prototype,h,{model:f,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return t.sync.apply(this,arguments)},add:function(t,e){var n,r,s,u,c,l=e&&e.at,h=null==(e&&e.sort)?!0:e.sort;for(t=o.isArray(t)?t.slice():[t],n=t.length-1;n>=0;n--)(s=this._prepareModel(t[n],e))?(t[n]=s,u=null!=s.id&&this._byId[s.id],u||this._byCid[s.cid]?(e&&e.merge&&u&&(u.set(s.attributes,e),c=h),t.splice(n,1)):(s.on("all",this._onModelEvent,this),this._byCid[s.cid]=s,null!=s.id&&(this._byId[s.id]=s))):(this.trigger("error",this,t[n],e),t.splice(n,1));if(t.length&&(c=h),this.length+=t.length,r=[null!=l?l:this.models.length,0],i.apply(r,t),a.apply(this.models,r),c&&this.comparator&&null==l&&this.sort({silent:!0}),e&&e.silent)return this;for(;s=t.shift();)s.trigger("add",s,this,e);return this},remove:function(t,e){var n,r,i,s;for(e||(e={}),t=o.isArray(t)?t.slice():[t],n=0,r=t.length;r>n;n++)s=this.get(t[n]),s&&(delete this._byId[s.id],delete this._byCid[s.cid],i=this.indexOf(s),this.models.splice(i,1),this.length--,e.silent||(e.index=i,s.trigger("remove",s,this,e)),this._removeReference(s));return this},push:function(t,e){return t=this._prepareModel(t,e),this.add(t,o.extend({at:this.length},e)),t},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return t=this._prepareModel(t,e),this.add(t,o.extend({at:0},e)),t},shift:function(t){var e=this.at(0);return this.remove(e,t),e},slice:function(t,e){return this.models.slice(t,e)},get:function(t){return null==t?void 0:this._byId[null!=t.id?t.id:t]||this._byCid[t.cid||t]},at:function(t){return this.models[t]},where:function(t){return o.isEmpty(t)?[]:this.filter(function(e){for(var n in t)if(t[n]!==e.get(n))return!1;return!0})},sort:function(t){if(!this.comparator)throw Error("Cannot sort a set without a comparator");return o.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(o.bind(this.comparator,this)),t&&t.silent||this.trigger("sort",this,t),this},pluck:function(t){return o.invoke(this.models,"get",t)},update:function(t,e){var n,r,i,s,a=[],u=[],c={},l=this.model.prototype.idAttribute;if(e=o.extend({add:!0,merge:!0,remove:!0},e),e.parse&&(t=this.parse(t)),o.isArray(t)||(t=t?[t]:[]),e.add&&!e.remove)return this.add(t,e);for(r=0,i=t.length;i>r;r++)n=t[r],s=this.get(n.id||n.cid||n[l]),e.remove&&s&&(c[s.cid]=!0),(e.add&&!s||e.merge&&s)&&a.push(n);if(e.remove)for(r=0,i=this.models.length;i>r;r++)n=this.models[r],c[n.cid]||u.push(n);return u.length&&this.remove(u,e),a.length&&this.add(a,e),this},reset:function(t,e){e||(e={}),e.parse&&(t=this.parse(t));for(var n=0,r=this.models.length;r>n;n++)this._removeReference(this.models[n]);return e.previousModels=this.models,this._reset(),t&&this.add(t,o.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),this},fetch:function(t){t=t?o.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=this,n=t.success;return t.success=function(r){var i=t.update?"update":"reset";e[i](r,t),n&&n(e,r,t)},this.sync("read",this,t)},create:function(t,e){var n=this;if(e=e?o.clone(e):{},t=this._prepareModel(t,e),!t)return!1;e.wait||n.add(t,e);var r=e.success;return e.success=function(t,e,i){i.wait&&n.add(t,i),r&&r(t,e,i)},t.save(null,e),t},parse:function(t){return t},clone:function(){return new this.constructor(this.models)},chain:function(){return o(this.models).chain()},_reset:function(){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(t,e){if(t instanceof f)return t.collection||(t.collection=this),t;e||(e={}),e.collection=this;var n=new this.model(t,e);return n._validate(t,e)?n:!1},_removeReference:function(t){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,n,r){("add"!==t&&"remove"!==t||n===this)&&("destroy"===t&&this.remove(e,r),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))}});var d=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortedIndex","toArray","size","first","head","take","initial","rest","tail","last","without","indexOf","shuffle","lastIndexOf","isEmpty"];o.each(d,function(t){p.prototype[t]=function(){var e=s.call(arguments);return e.unshift(this.models),o[t].apply(o,e)}});var g=["groupBy","countBy","sortBy"];o.each(g,function(t){p.prototype[t]=function(e,n){var r=o.isFunction(e)?e:function(t){return t.get(e)};return o[t](this.models,r,n)}});var v=t.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},m=/\((.*?)\)/g,y=/:\w+/g,_=/\*\w+/g,b=/[\-{}\[\]+?.,\\\^$|#\s]/g;o.extend(v.prototype,h,{initialize:function(){},route:function(e,n,r){return o.isRegExp(e)||(e=this._routeToRegExp(e)),r||(r=this[n]),t.history.route(e,o.bind(function(i){var s=this._extractParameters(e,i);r&&r.apply(this,s),this.trigger.apply(this,["route:"+n].concat(s)),t.history.trigger("route",this,n,s)},this)),this},navigate:function(e,n){return t.history.navigate(e,n),this},_bindRoutes:function(){if(this.routes)for(var t,e=o.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])},_routeToRegExp:function(t){return t=t.replace(b,"\\$&").replace(m,"(?:$1)?").replace(y,"([^/]+)").replace(_,"(.*?)"),RegExp("^"+t+"$")},_extractParameters:function(t,e){return t.exec(e).slice(1)}});var x=t.History=function(){this.handlers=[],o.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},w=/^[#\/]|\s+$/g,E=/^\/+|\/+$/g,j=/msie [\w.]+/,k=/\/$/;x.started=!1,o.extend(x.prototype,h,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(null==t)if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var n=this.root.replace(k,"");t.indexOf(n)||(t=t.substr(n.length))}else t=this.getHash();return t.replace(w,"")},start:function(e){if(x.started)throw Error("Backbone.history has already been started");x.started=!0,this.options=o.extend({},{root:"/"},this.options,e),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var n=this.getFragment(),r=document.documentMode,i=j.exec(navigator.userAgent.toLowerCase())&&(!r||7>=r);this.root=("/"+this.root+"/").replace(E,"/"),i&&this._wantsHashChange&&(this.iframe=t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(n)),this._hasPushState?t.$(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!i?t.$(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=n;var s=this.location,a=s.pathname.replace(/[^\/]$/,"$&/")===this.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!a?(this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&a&&s.hash&&(this.fragment=this.getHash().replace(w,""),this.history.replaceState({},document.title,this.root+this.fragment+s.search)),this.options.silent?void 0:this.loadUrl())},stop:function(){t.$(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),x.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(){var t=this.getFragment();return t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t===this.fragment?!1:(this.iframe&&this.navigate(t),this.loadUrl()||this.loadUrl(this.getHash()),void 0)},loadUrl:function(t){var e=this.fragment=this.getFragment(t),n=o.any(this.handlers,function(t){return t.route.test(e)?(t.callback(e),!0):void 0});return n},navigate:function(t,e){if(!x.started)return!1;if(e&&e!==!0||(e={trigger:e}),t=this.getFragment(t||""),this.fragment!==t){this.fragment=t;var n=this.root+t;if(this._hasPushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,n);else{if(!this._wantsHashChange)return this.location.assign(n);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getFragment(this.getHash(this.iframe))&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,e.replace))}e.trigger&&this.loadUrl(t)}},_updateHash:function(t,e,n){if(n){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else t.hash="#"+e}}),t.history=new x;var A=t.View=function(t){this.cid=o.uniqueId("view"),this._configure(t||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},S=/^(\S+)\s*(.*)$/,O=["model","collection","el","id","attributes","className","tagName","events"];o.extend(A.prototype,h,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},make:function(e,n,r){var i=document.createElement(e);return n&&t.$(i).attr(n),null!=r&&t.$(i).html(r),i},setElement:function(e,n){return this.$el&&this.undelegateEvents(),this.$el=e instanceof t.$?e:t.$(e),this.el=this.$el[0],n!==!1&&this.delegateEvents(),this},delegateEvents:function(t){if(t||(t=o.result(this,"events"))){this.undelegateEvents();for(var e in t){var n=t[e];if(o.isFunction(n)||(n=this[t[e]]),!n)throw Error('Method "'+t[e]+'" does not exist');var r=e.match(S),i=r[1],s=r[2];n=o.bind(n,this),i+=".delegateEvents"+this.cid,""===s?this.$el.bind(i,n):this.$el.delegate(s,i,n)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(t){this.options&&(t=o.extend({},o.result(this,"options"),t)),o.extend(this,o.pick(t,O)),this.options=t},_ensureElement:function(){if(this.el)this.setElement(o.result(this,"el"),!1);else{var t=o.extend({},o.result(this,"attributes"));this.id&&(t.id=o.result(this,"id")),this.className&&(t["class"]=o.result(this,"className")),this.setElement(this.make(o.result(this,"tagName"),t),!1)}}});var $={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};t.sync=function(e,n,r){var i=$[e];o.defaults(r||(r={}),{emulateHTTP:t.emulateHTTP,emulateJSON:t.emulateJSON});var s={type:i,dataType:"json"};if(r.url||(s.url=o.result(n,"url")||I()),null!=r.data||!n||"create"!==e&&"update"!==e&&"patch"!==e||(s.contentType="application/json",s.data=JSON.stringify(r.attrs||n.toJSON(r))),r.emulateJSON&&(s.contentType="application/x-www-form-urlencoded",s.data=s.data?{model:s.data}:{}),r.emulateHTTP&&("PUT"===i||"DELETE"===i||"PATCH"===i)){s.type="POST",r.emulateJSON&&(s.data._method=i);var a=r.beforeSend;r.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",i),a?a.apply(this,arguments):void 0}}"GET"===s.type||r.emulateJSON||(s.processData=!1);var u=r.success;r.success=function(t,e,i){u&&u(t,e,i),n.trigger("sync",n,t,r)};var c=r.error;r.error=function(t){c&&c(n,t,r),n.trigger("error",n,t,r)};var l=t.ajax(o.extend(s,r));return n.trigger("request",n,l,r),l},t.ajax=function(){return t.$.ajax.apply(t.$,arguments)};var T=function(t,e){var n,r=this;n=t&&o.has(t,"constructor")?t.constructor:function(){r.apply(this,arguments)},o.extend(n,r,e);var i=function(){this.constructor=n};return i.prototype=r.prototype,n.prototype=new i,t&&o.extend(n.prototype,t),n.__super__=r.prototype,n};f.extend=p.extend=v.extend=A.extend=x.extend=T;var I=function(){throw Error('A "url" property or function must be specified')}}).call(this),function(t,e){function n(t){return t&&"object"==typeof t&&t.__wrapped__?t:this instanceof n?(this.__wrapped__=t,e):new n(t)}function r(t,e,n){e||(e=0);var r=t.length,i=r-e>=(n||on);if(i)for(var s={},a=e-1;r>++a;){var o=t[a]+"";(On.call(s,o)?s[o]:s[o]=[]).push(t[a])}return function(n){if(i){var r=n+"";return On.call(s,r)&&pe(s[r],n)>-1}return pe(t,n,e)>-1}}function i(t){return t.charCodeAt(0)}function s(t,n){var r=t.index,i=n.index;if(t=t.criteria,n=n.criteria,t!==n){if(t>n||t===e)return 1;if(n>t||n===e)return-1}return i>r?-1:1}function a(t,e,n){function r(){var o=arguments,u=s?this:e;if(i||(t=e[a]),n.length&&(o=o.length?n.concat(p(o)):n),this instanceof r){f.prototype=t.prototype,u=new f,f.prototype=null;var c=t.apply(u,o);return T(c)?c:u}return t.apply(u,o)}var i=$(t),s=!n,a=e;return s&&(n=e),i||(e=t),r}function o(t,n,r){return t?"function"!=typeof t?function(e){return e[t]}:n!==e?r?function(e,r,i,s){return t.call(n,e,r,i,s)}:function(e,r,i){return t.call(n,e,r,i)}:t:De}function u(){for(var t,e={arrayLoop:"",bottom:"",hasDontEnumBug:tn,isKeysFast:Zn,objectLoop:"",nonEnumArgs:tr,noCharByIndex:rr,shadowed:wn,top:"",useHas:!0},n=0;t=arguments[n];n++)for(var r in t)e[r]=t[r];var i=e.args;e.firstArg=/^[^,]+/.exec(i)[0];var s=Function("createCallback, hasOwnProperty, isArguments, isString, objectTypes, nativeKeys, propertyIsEnumerable","return function("+i+") {\n"+hr(e)+"\n}");return s(o,On,g,N,cr,Rn,Tn)}function c(t){return"\\"+lr[t]}function l(t){return _r[t]}function h(t){return"function"!=typeof t.toString&&"string"==typeof(t+"")}function f(){}function p(t,n,r){n||(n=0),r===e&&(r=t?t.length:0);for(var i=-1,s=r-n||0,a=Array(0>s?0:s);s>++i;)a[i]=t[n+i];return a}function d(t){return br[t]}function g(t){return In.call(t)==Dn}function v(t){var e=!1;if(!t||"object"!=typeof t||g(t))return e;var n=t.constructor;return!$(n)&&(!ir||!h(t))||n instanceof n?en?(mr(t,function(t,n,r){return e=!On.call(r,n),!1}),e===!1):(mr(t,function(t,n){e=n}),e===!1||On.call(t,e)):e}function m(t){var e=[];return yr(t,function(t,n){e.push(n)}),e}function y(t,e,n,r,i){if(null==t)return t;n&&(e=!1);var s=T(t);if(s){var a=In.call(t);if(!or[a]||ir&&h(t))return t;var o=wr(t)}if(!s||!e)return s?o?p(t):vr({},t):t;var u=ur[a];switch(a){case Mn:case Jn:return new u(+t);case zn:case Gn:return new u(t);case Vn:return u(t.source,dn.exec(t))}r||(r=[]),i||(i=[]);for(var c=r.length;c--;)if(r[c]==t)return i[c];var l=o?u(t.length):{};return r.push(t),i.push(l),(o?V:yr)(t,function(t,n){l[n]=y(t,e,null,r,i)}),o&&(On.call(t,"index")&&(l.index=t.index),On.call(t,"input")&&(l.input=t.input)),l}function _(t){return y(t,!0)}function b(t){var e=[];return mr(t,function(t,n){$(t)&&e.push(n)}),e.sort()}function x(t,e){return t?On.call(t,e):!1}function w(t){var e={};return yr(t,function(t,n){e[t]=n}),e}function E(t){return t===!0||t===!1||In.call(t)==Mn}function j(t){return t instanceof Date||In.call(t)==Jn}function k(t){return t?1===t.nodeType:!1}function A(t){var e=!0;if(!t)return e;var n=In.call(t),r=t.length;return n==Un||n==Gn||n==Dn||nr&&g(t)||n==Kn&&"number"==typeof r&&$(t.splice)?!r:(yr(t,function(){return e=!1}),e)}function S(t,n,r,i){if(t===n)return 0!==t||1/t==1/n;if(null==t||null==n)return t===n;var s=In.call(t),a=In.call(n);if(s==Dn&&(s=Kn),a==Dn&&(a=Kn),s!=a)return!1;switch(s){case Mn:case Jn:return+t==+n;case zn:return t!=+t?n!=+n:0==t?1/t==1/n:t==+n;case Vn:case Gn:return t==n+""}var o=s==Un;if(!o){if(t.__wrapped__||n.__wrapped__)return S(t.__wrapped__||t,n.__wrapped__||n);if(s!=Kn||ir&&(h(t)||h(n)))return!1;var u=!er&&g(t)?Object:t.constructor,c=!er&&g(n)?Object:n.constructor;if(u!=c&&!($(u)&&u instanceof u&&$(c)&&c instanceof c))return!1}r||(r=[]),i||(i=[]);for(var l=r.length;l--;)if(r[l]==t)return i[l]==n;var f=!0,p=0;if(r.push(t),i.push(n),o){if(p=t.length,f=p==n.length)for(;p--&&(f=S(t[p],n[p],r,i)););return f}return mr(t,function(t,s,a){return On.call(a,s)?(p++,f=On.call(n,s)&&S(t,n[s],r,i)):e}),f&&mr(n,function(t,n,r){return On.call(r,n)?f=--p>-1:e}),f}function O(t){return Hn(t)&&!Nn(parseFloat(t))}function $(t){return"function"==typeof t}function T(t){return t?cr[typeof t]:!1}function I(t){return C(t)&&t!=+t}function P(t){return null===t}function C(t){return"number"==typeof t||In.call(t)==zn}function H(t){return t instanceof RegExp||In.call(t)==Vn}function N(t){return"string"==typeof t||In.call(t)==Gn}function R(t){return t===e}function B(t,e,n){var r=arguments,i=0,s=2,a=r[3],o=r[4];for(n!==an&&(a=[],o=[],"number"!=typeof n&&(s=r.length));s>++i;)yr(r[i],function(e,n){var r,i,s;if(e&&((i=wr(e))||Er(e))){for(var u=a.length;u--&&!(r=a[u]==e););r?t[n]=o[u]:(a.push(e),o.push((s=t[n],s=i?wr(s)?s:[]:Er(s)?s:{})),t[n]=B(s,e,an,a,o))}else null!=e&&(t[n]=e)});return t}function L(t,e,n){var r="function"==typeof e,i={};if(r)e=o(e,n);else var s=kn.apply(nn,arguments);return mr(t,function(t,n,a){(r?!e(t,n,a):0>pe(s,n,1))&&(i[n]=t)}),i}function F(t){var e=[];return yr(t,function(t,n){e.push([n,t])}),e}function D(t,e,n){var r={};if("function"!=typeof e)for(var i=0,s=kn.apply(nn,arguments),a=s.length;a>++i;){var u=s[i];u in t&&(r[u]=t[u])}else e=o(e,n),mr(t,function(t,n,i){e(t,n,i)&&(r[n]=t)});return r}function U(t){var e=[];return yr(t,function(t){e.push(t)}),e}function M(t,n,r){var i=-1,s=t?t.length:0,a=!1;return r=(0>r?Bn(0,s+r):r)||0,"number"==typeof s?a=(N(t)?t.indexOf(n,r):pe(t,n,r))>-1:gr(t,function(t){return++i>=r?!(a=t===n):e}),a}function J(t,e,n){var r={};return e=o(e,n),V(t,function(t,n,i){n=e(t,n,i),On.call(r,n)?r[n]++:r[n]=1}),r}function q(t,e,n){var r=!0;if(e=o(e,n),wr(t))for(var i=-1,s=t.length;s>++i&&(r=!!e(t[i],i,t)););else gr(t,function(t,n,i){return r=!!e(t,n,i)});return r}function z(t,e,n){var r=[];if(e=o(e,n),wr(t))for(var i=-1,s=t.length;s>++i;){var a=t[i];e(a,i,t)&&r.push(a)}else gr(t,function(t,n,i){e(t,n,i)&&r.push(t)});return r}function K(t,n,r){var i;return n=o(n,r),V(t,function(t,r,s){return n(t,r,s)?(i=t,!1):e}),i}function V(t,n,r){if(n&&r===e&&wr(t))for(var i=-1,s=t.length;s>++i&&n(t[i],i,t)!==!1;);else gr(t,n,r);return t}function G(t,e,n){var r={};return e=o(e,n),V(t,function(t,n,i){n=e(t,n,i),(On.call(r,n)?r[n]:r[n]=[]).push(t)}),r}function Q(t,e){var n=p(arguments,2),r="function"==typeof e,i=[];return V(t,function(t){i.push((r?e:t[e]).apply(t,n))}),i}function W(t,e,n){var r=-1,i=t?t.length:0,s=Array("number"==typeof i?i:0);if(e=o(e,n),wr(t))for(;i>++r;)s[r]=e(t[r],r,t);else gr(t,function(t,n,i){s[++r]=e(t,n,i)});return s}function X(t,e,n){var r=-1/0,s=-1,a=t?t.length:0,u=r;if(e||!wr(t))e=!e&&N(t)?i:o(e,n),gr(t,function(t,n,i){var s=e(t,n,i);s>r&&(r=s,u=t)});else for(;a>++s;)t[s]>u&&(u=t[s]);return u}function Z(t,e,n){var r=1/0,s=-1,a=t?t.length:0,u=r;if(e||!wr(t))e=!e&&N(t)?i:o(e,n),gr(t,function(t,n,i){var s=e(t,n,i);r>s&&(r=s,u=t)});else for(;a>++s;)u>t[s]&&(u=t[s]);return u}function Y(t,e){return W(t,e+"")}function te(t,e,n,r){var i=3>arguments.length;if(e=o(e,r,an),wr(t)){var s=-1,a=t.length;for(i&&(n=t[++s]);a>++s;)n=e(n,t[s],s,t)}else gr(t,function(t,r,s){n=i?(i=!1,t):e(n,t,r,s)});return n}function ee(t,e,n,r){var i=t,s=t?t.length:0,a=3>arguments.length;if("number"!=typeof s){var u=jr(t);s=u.length}else rr&&N(t)&&(i=t.split(""));return e=o(e,r,an),V(t,function(t,r,o){r=u?u[--s]:--s,n=a?(a=!1,i[r]):e(n,i[r],r,o)}),n}function ne(t,e,n){return e=o(e,n),z(t,function(t,n,r){return!e(t,n,r)})}function re(t){var e=-1,n=Array(t?t.length:0);return V(t,function(t){var r=An(Fn()*(++e+1));n[e]=n[r],n[r]=t}),n}function ie(t){var e=t?t.length:0;return"number"==typeof e?e:jr(t).length}function se(t,e,n){var r;if(e=o(e,n),wr(t))for(var i=-1,s=t.length;s>++i&&!(r=e(t[i],i,t)););else gr(t,function(t,n,i){return!(r=e(t,n,i))});return!!r}function ae(t,e,n){var r=[];e=o(e,n),V(t,function(t,n,i){r.push({criteria:e(t,n,i),index:n,value:t})});var i=r.length;for(r.sort(s);i--;)r[i]=r[i].value;return r}function oe(t){var e=t?t.length:0;return"number"==typeof e?rr&&N(t)?t.split(""):p(t):U(t)}function ue(t,e){var n=jr(e);return z(t,function(t){for(var r=n.length;r--;){var i=t[n[r]]===e[n[r]];if(!i)break}return!!i})}function ce(t){for(var e=-1,n=t?t.length:0,r=[];n>++e;){var i=t[e];i&&r.push(i)}return r}function le(t){for(var e=-1,n=t?t.length:0,i=kn.apply(nn,arguments),s=r(i,n),a=[];n>++e;){var o=t[e];s(o)||a.push(o)}return a}function he(t,e,n){if(t){var r=t.length;return null==e||n?t[0]:p(t,0,Ln(Bn(0,e),r))}}function fe(t,e){for(var n=-1,r=t?t.length:0,i=[];r>++n;){var s=t[n];wr(s)?$n.apply(i,e?s:fe(s)):i.push(s)}return i}function pe(t,e,n){var r=-1,i=t?t.length:0;if("number"==typeof n)r=(0>n?Bn(0,i+n):n||0)-1;else if(n)return r=xe(t,e),t[r]===e?r:-1;for(;i>++r;)if(t[r]===e)return r;return-1}function de(t,e,n){if(!t)return[];var r=t.length;return e=null==e||n?1:e||0,p(t,0,Ln(Bn(0,r-e),r))}function ge(t){var e=arguments,n=e.length,i={0:{}},s=-1,a=t?t.length:0,o=a>=100,u=[],c=u;t:for(;a>++s;){var l=t[s];if(o)var h=l+"",f=On.call(i[0],h)?!(c=i[0][h]):c=i[0][h]=[];if(f||0>pe(c,l)){o&&c.push(l);for(var p=n;--p;)if(!(i[p]||(i[p]=r(e[p],0,100)))(l))continue t;u.push(l)}}return u}function ve(t,e,n){if(t){var r=t.length;return null==e||n?t[r-1]:p(t,Bn(0,r-e))}}function me(t,e,n){var r=t?t.length:0;for("number"==typeof n&&(r=(0>n?Bn(0,r+n):Ln(n,r-1))+1);r--;)if(t[r]===e)return r;return-1}function ye(t,e){for(var n=-1,r=t?t.length:0,i={};r>++n;){var s=t[n];e?i[s]=e[n]:i[s[0]]=s[1]}return i}function _e(t,e,n){t=+t||0,n=+n||1,null==e&&(e=t,t=0);for(var r=-1,i=Bn(0,jn((e-t)/n)),s=Array(i);i>++r;)s[r]=t,t+=n;return s}function be(t,e,n){return p(t,null==e||n?1:Bn(0,e))}function xe(t,e,n,r){var i=0,s=t?t.length:i;for(n=n?o(n,r):De,e=n(e);s>i;){var a=i+s>>>1;e>n(t[a])?i=a+1:s=a}return i}function we(){return Ee(kn.apply(nn,arguments))}function Ee(t,e,n,r){var i=-1,s=t?t.length:0,a=[],u=a;"function"==typeof e&&(r=n,n=e,e=!1);var c=!e&&s>=75;if(c)var l={};for(n&&(u=[],n=o(n,r));s>++i;){var h=t[i],f=n?n(h,i,t):h;if(c)var p=f+"",d=On.call(l,p)?!(u=l[p]):u=l[p]=[];(e?!i||u[u.length-1]!==f:d||0>pe(u,f))&&((n||c)&&u.push(f),a.push(h))}return a}function je(t){for(var e=-1,n=t?t.length:0,i=r(arguments,1,20),s=[];n>++e;){var a=t[e];i(a)||s.push(a)}return s}function ke(t){for(var e=-1,n=t?X(Y(arguments,"length")):0,r=Array(n);n>++e;)r[e]=Y(arguments,e);return r}function Ae(t,n){return 1>t?n():function(){return 1>--t?n.apply(this,arguments):e}}function Se(t,e){return Xn||Pn&&arguments.length>2?Pn.call.apply(Pn,arguments):a(t,e,p(arguments,2))}function Oe(t){for(var e=arguments,n=e.length>1?0:(e=b(t),-1),r=e.length;r>++n;){var i=e[n];t[i]=Se(t[i],t)}return t}function $e(t,e){return a(t,e,p(arguments,2))}function Te(){var t=arguments;return function(){for(var e=arguments,n=t.length;n--;)e=[t[n].apply(this,e)];return e[0]}}function Ie(t,e,n){function r(){o=null,n||(s=t.apply(a,i))}var i,s,a,o;return function(){var u=n&&!o;return i=arguments,a=this,clearTimeout(o),o=setTimeout(r,e),u&&(s=t.apply(a,i)),s}}function Pe(t,n){var r=p(arguments,2);return setTimeout(function(){t.apply(e,r)},n)}function Ce(t){var n=p(arguments,1);return setTimeout(function(){t.apply(e,n)},1)}function He(t,e){var n={};return function(){var r=e?e.apply(this,arguments):arguments[0];return On.call(n,r)?n[r]:n[r]=t.apply(this,arguments)}}function Ne(t){var e,n=!1;return function(){return n?e:(n=!0,e=t.apply(this,arguments),t=null,e)}}function Re(t){return a(t,p(arguments,1))}function Be(t,e){function n(){o=new Date,a=null,i=t.apply(s,r)}var r,i,s,a,o=0;return function(){var u=new Date,c=e-(u-o);return r=arguments,s=this,0>=c?(clearTimeout(a),a=null,o=u,i=t.apply(s,r)):a||(a=setTimeout(n,c)),i}}function Le(t,e){return function(){var n=[t];return $n.apply(n,arguments),e.apply(this,n)}}function Fe(t){return null==t?"":(t+"").replace(bn,l)}function De(t){return t}function Ue(t){V(b(t),function(e){var r=n[e]=t[e];n.prototype[e]=function(){var t=[this.__wrapped__];$n.apply(t,arguments);var e=r.apply(n,t);return new n(e)}})}function Me(){return t._=un,this}function Je(t,e){return null==t&&null==e&&(e=1),t=+t||0,null==e&&(e=t,t=0),t+An(Fn()*((+e||0)-t+1))}function qe(t,e){var n=t?t[e]:null;return $(n)?t[e]():n}function ze(t,e,r){t||(t=""),r||(r={});var i,s,a=n.templateSettings,o=0,u=r.interpolate||a.interpolate||_n,l="__p += '",h=r.variable||a.variable,f=h,p=RegExp((r.escape||a.escape||_n).source+"|"+u.source+"|"+(u===yn?mn:_n).source+"|"+(r.evaluate||a.evaluate||_n).source+"|$","g");if(t.replace(p,function(e,n,r,s,a,u){return r||(r=s),l+=t.slice(o,u).replace(xn,c),n&&(l+="' +\n__e("+n+") +\n'"),a&&(l+="';\n"+a+";\n__p += '"),r&&(l+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),i||(i=a||cn.test(n||r)),o=u+e.length,e}),l+="';\n",!f)if(h="obj",i)l="with ("+h+") {\n"+l+"\n}\n";else{var d=RegExp("(\\(\\s*)"+h+"\\."+h+"\\b","g");l=l.replace(gn,"$&"+h+".").replace(d,"$1__d")}l=(i?l.replace(hn,""):l).replace(fn,"$1").replace(pn,"$1;"),l="function("+h+") {\n"+(f?"":h+" || ("+h+" = {});\n")+"var __t, __p = '', __e = _.escape"+(i?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":(f?"":", __d = "+h+"."+h+" || "+h)+";\n")+l+"return __p\n}";var g=ar?"\n//@ sourceURL="+(r.sourceURL||"/lodash/template/source["+En++ +"]"):"";try{s=Function("_","return "+l+g)(n)}catch(v){throw v.source=l,v}return e?s(e):(s.source=l,s)}function Ke(t,e,n){t=+t||0;for(var r=-1,i=Array(t);t>++r;)i[r]=e.call(n,r);return i}function Ve(t){return null==t?"":(t+"").replace(ln,d)}function Ge(t){return(null==t?"":t+"")+ ++sn}function Qe(t,e){return e(t),t}function We(){return this.__wrapped__+""}function Xe(){return this.__wrapped__}var Ze="object"==typeof exports&&exports,Ye="object"==typeof global&&global;Ye.global===Ye&&(t=Ye);var tn,en,nn=[],rn=new function(){},sn=0,an=rn,on=30,un=t._,cn=/[-?+=!~*%&^<>|{(\/]|\[\D|\b(?:delete|in|instanceof|new|typeof|void)\b/,ln=/&(?:amp|lt|gt|quot|#x27);/g,hn=/\b__p \+= '';/g,fn=/\b(__p \+=) '' \+/g,pn=/(__e\(.*?\)|\b__t\)) \+\n'';/g,dn=/\w*$/,gn=/(?:__e|__t = )\(\s*(?![\d\s"']|this\.)/g,vn=RegExp("^"+(rn.valueOf+"").replace(/[.*+?^=!:${}()|[\]\/\\]/g,"\\$&").replace(/valueOf|for [^\]]+/g,".+?")+"$"),mn=/\$\{((?:(?=\\?)\\?[\s\S])*?)}/g,yn=/<%=([\s\S]+?)%>/g,_n=/($^)/,bn=/[&<>"']/g,xn=/['\n\r\t\u2028\u2029\\]/g,wn=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],En=0,jn=Math.ceil,kn=nn.concat,An=Math.floor,Sn=vn.test(Sn=Object.getPrototypeOf)&&Sn,On=rn.hasOwnProperty,$n=nn.push,Tn=rn.propertyIsEnumerable,In=rn.toString,Pn=vn.test(Pn=p.bind)&&Pn,Cn=vn.test(Cn=Array.isArray)&&Cn,Hn=t.isFinite,Nn=t.isNaN,Rn=vn.test(Rn=Object.keys)&&Rn,Bn=Math.max,Ln=Math.min,Fn=Math.random,Dn="[object Arguments]",Un="[object Array]",Mn="[object Boolean]",Jn="[object Date]",qn="[object Function]",zn="[object Number]",Kn="[object Object]",Vn="[object RegExp]",Gn="[object String]",Qn=!!t.attachEvent,Wn=Pn&&!/\n|true/.test(Pn+Qn),Xn=Pn&&!Wn,Zn=Rn&&(Qn||Wn),Yn=(Yn={0:1,length:1},nn.splice.call(Yn,0,1),Yn[0]),tr=!0;
(function(){function t(){this.x=1}var e=[];t.prototype={valueOf:1,y:1};for(var n in new t)e.push(n);for(n in arguments)tr=!n;tn=!/valueOf/.test(e),en="x"!=e[0]})(1);var er=arguments.constructor==Object,nr=!g(arguments),rr="xx"!="x"[0]+Object("x")[0];try{var ir=In.call(document)==Kn}catch(sr){}try{var ar=(Function("//@")(),!Qn)}catch(sr){}var or={};or[qn]=!1,or[Dn]=or[Un]=or[Mn]=or[Jn]=or[zn]=or[Kn]=or[Vn]=or[Gn]=!0;var ur={};ur[Un]=Array,ur[Mn]=Boolean,ur[Jn]=Date,ur[Kn]=Object,ur[zn]=Number,ur[Vn]=RegExp,ur[Gn]=String;var cr={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},lr={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"};n.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:yn,variable:""};var hr=ze("<% if (obj.useStrict) { %>'use strict';\n<% } %>var index, iteratee = <%= firstArg %>, result = <%= firstArg %>;\nif (!<%= firstArg %>) return result;\n<%= top %>;\n<% if (arrayLoop) { %>var length = iteratee.length; index = -1;\nif (typeof length == 'number') {  <% if (noCharByIndex) { %>\n  if (isString(iteratee)) {\n    iteratee = iteratee.split('')\n  }  <% } %>\n  while (++index < length) {\n    <%= arrayLoop %>\n  }\n}\nelse {  <%  } else if (nonEnumArgs) { %>\n  var length = iteratee.length; index = -1;\n  if (length && isArguments(iteratee)) {\n    while (++index < length) {\n      index += '';\n      <%= objectLoop %>\n    }\n  } else {  <% } %>  <% if (!hasDontEnumBug) { %>\n  var skipProto = typeof iteratee == 'function' && \n    propertyIsEnumerable.call(iteratee, 'prototype');\n  <% } %>  <% if (isKeysFast && useHas) { %>\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iteratee] ? nativeKeys(iteratee) : [],\n      length = ownProps.length;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n    <% if (!hasDontEnumBug) { %>if (!(skipProto && index == 'prototype')) {\n  <% } %>    <%= objectLoop %>\n    <% if (!hasDontEnumBug) { %>}\n<% } %>  }  <% } else { %>\n  for (index in iteratee) {<%    if (!hasDontEnumBug || useHas) { %>\n    if (<%      if (!hasDontEnumBug) { %>!(skipProto && index == 'prototype')<% }      if (!hasDontEnumBug && useHas) { %> && <% }      if (useHas) { %>hasOwnProperty.call(iteratee, index)<% }    %>) {    <% } %>\n    <%= objectLoop %>;    <% if (!hasDontEnumBug || useHas) { %>\n    }<% } %>\n  }  <% } %>  <% if (hasDontEnumBug) { %>\n\n  var ctor = iteratee.constructor;\n    <% for (var k = 0; k < 7; k++) { %>\n  index = '<%= shadowed[k] %>';\n  if (<%      if (shadowed[k] == 'constructor') {        %>!(ctor && ctor.prototype === iteratee) && <%      } %>hasOwnProperty.call(iteratee, index)) {\n    <%= objectLoop %>\n  }    <% } %>  <% } %>  <% if (arrayLoop || nonEnumArgs) { %>\n}<% } %>\n<%= bottom %>;\nreturn result"),fr={args:"object, source, guard",top:"for (var argsIndex = 1, argsLength = typeof guard == 'number' ? 2 : arguments.length; argsIndex < argsLength; argsIndex++) {\n  if ((iteratee = arguments[argsIndex])) {",objectLoop:"result[index] = iteratee[index]",bottom:"  }\n}"},pr={args:"collection, callback, thisArg",top:"callback = callback && typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg)",arrayLoop:"if (callback(iteratee[index], index, collection) === false) return result",objectLoop:"if (callback(iteratee[index], index, collection) === false) return result"},dr={arrayLoop:null},gr=u(pr),vr=u(fr);nr&&(g=function(t){return t?On.call(t,"callee"):!1});var mr=u(pr,dr,{useHas:!1}),yr=u(pr,dr),_r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"},br=w(_r),xr=u(fr,{objectLoop:"if (result[index] == null) "+fr.objectLoop}),wr=Cn||function(t){return er&&t instanceof Array||In.call(t)==Un};$(/x/)&&($=function(t){return t instanceof Function||In.call(t)==qn});var Er=Sn?function(t){if(!t||"object"!=typeof t)return!1;var e=t.valueOf,n="function"==typeof e&&(n=Sn(e))&&Sn(n);return n?t==n||Sn(t)==n&&!g(t):v(t)}:v,jr=Rn?function(t){return"function"==typeof t&&Tn.call(t,"prototype")?m(t):T(t)?Rn(t):[]}:m;n.after=Ae,n.assign=vr,n.bind=Se,n.bindAll=Oe,n.bindKey=$e,n.compact=ce,n.compose=Te,n.countBy=J,n.debounce=Ie,n.defaults=xr,n.defer=Ce,n.delay=Pe,n.difference=le,n.filter=z,n.flatten=fe,n.forEach=V,n.forIn=mr,n.forOwn=yr,n.functions=b,n.groupBy=G,n.initial=de,n.intersection=ge,n.invert=w,n.invoke=Q,n.keys=jr,n.map=W,n.max=X,n.memoize=He,n.merge=B,n.min=Z,n.object=ye,n.omit=L,n.once=Ne,n.pairs=F,n.partial=Re,n.pick=D,n.pluck=Y,n.range=_e,n.reject=ne,n.rest=be,n.shuffle=re,n.sortBy=ae,n.tap=Qe,n.throttle=Be,n.times=Ke,n.toArray=oe,n.union=we,n.uniq=Ee,n.values=U,n.where=ue,n.without=je,n.wrap=Le,n.zip=ke,n.collect=W,n.drop=be,n.each=V,n.extend=vr,n.methods=b,n.select=z,n.tail=be,n.unique=Ee,Ue(n),n.clone=y,n.cloneDeep=_,n.contains=M,n.escape=Fe,n.every=q,n.find=K,n.has=x,n.identity=De,n.indexOf=pe,n.isArguments=g,n.isArray=wr,n.isBoolean=E,n.isDate=j,n.isElement=k,n.isEmpty=A,n.isEqual=S,n.isFinite=O,n.isFunction=$,n.isNaN=I,n.isNull=P,n.isNumber=C,n.isObject=T,n.isPlainObject=Er,n.isRegExp=H,n.isString=N,n.isUndefined=R,n.lastIndexOf=me,n.mixin=Ue,n.noConflict=Me,n.random=Je,n.reduce=te,n.reduceRight=ee,n.result=qe,n.size=ie,n.some=se,n.sortedIndex=xe,n.template=ze,n.unescape=Ve,n.uniqueId=Ge,n.all=q,n.any=se,n.detect=K,n.foldl=te,n.foldr=ee,n.include=M,n.inject=te,yr(n,function(t,e){n.prototype[e]||(n.prototype[e]=function(){var e=[this.__wrapped__];return $n.apply(e,arguments),t.apply(n,e)})}),n.first=he,n.last=ve,n.take=he,n.head=he,yr(n,function(t,e){n.prototype[e]||(n.prototype[e]=function(e,r){var i=t(this.__wrapped__,e,r);return null==e||r?i:new n(i)})}),n.VERSION="1.0.0-rc.3",n.prototype.toString=We,n.prototype.value=Xe,n.prototype.valueOf=Xe,gr(["join","pop","shift"],function(t){var e=nn[t];n.prototype[t]=function(){return e.apply(this.__wrapped__,arguments)}}),gr(["push","reverse","sort","unshift"],function(t){var e=nn[t];n.prototype[t]=function(){return e.apply(this.__wrapped__,arguments),this}}),gr(["concat","slice","splice"],function(t){var e=nn[t];n.prototype[t]=function(){var t=e.apply(this.__wrapped__,arguments);return new n(t)}}),Yn&&gr(["pop","shift","splice"],function(t){var e=nn[t],r="splice"==t;n.prototype[t]=function(){var t=this.__wrapped__,i=e.apply(t,arguments);return 0===t.length&&delete t[0],r?new n(i):i}}),n._each=gr,n._iteratorTemplate=hr,"function"==typeof define&&"object"==typeof define.amd&&define.amd?(t._=n,define(function(){return n})):Ze?"object"==typeof module&&module&&module.exports==Ze?(module.exports=n)._=n:Ze._=n:t._=n}(this);