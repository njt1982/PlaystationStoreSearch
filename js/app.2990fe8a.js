(function(e){function t(t){for(var r,i,c=t[0],o=t[1],l=t[2],g=0,d=[];g<c.length;g++)i=c[g],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&d.push(s[i][0]),s[i]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);u&&u(t);while(d.length)d.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,c=1;c<a.length;c++){var o=a[c];0!==s[o]&&(r=!1)}r&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var r={},s={app:0},n=[];function i(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=r,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/PlaystationStoreSearch/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=o;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),s=a("487a"),n=a.n(s),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},c=[],o=(a("5c0b"),a("2877")),l={},u=Object(o["a"])(l,i,c,!1,null,null,null),g=u.exports,d=(a("ac6a"),a("456d"),a("8c4f")),f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.loadMore,expression:"loadMore"}],class:{sidebarToggled:e.sidebarExpanded},attrs:{id:"wrapper","infinite-scroll-disabled":"busy","infinite-scroll-listen-for-event":"doCheck","infinite-scroll-distance":"10"}},[a("Sidebar",{attrs:{aggregations:e.aggregations},on:{toggleSidebar:e.toggleSidebar,runSearch:e.updateQuery,toggleFacet:e.toggleFacet}}),a("MainPageWrapper",{attrs:{hits:e.hits,searchInProgress:e.searchInProgress}})],1)},p=[],h=(a("28a5"),a("75fc")),b=(a("386d"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"sidebar-wrapper"}},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-2"},[a("a",{attrs:{id:"menu-toggle"},on:{click:e.toggleSidebar}},[a("i",{staticClass:"fa fa-bars",attrs:{"aria-hidden":"true"}})])]),a("div",{staticClass:"col-sm-10"},[a("div",{staticClass:"form-group"},[a("div",{staticClass:"input-group"},[e._m(0),a("input",{directives:[{name:"model",rawName:"v-model",value:e.mutableQuery,expression:"mutableQuery"}],staticClass:"form-control",attrs:{type:"search",placeholder:"Search"},domProps:{value:e.mutableQuery},on:{input:[function(t){t.target.composing||(e.mutableQuery=t.target.value)},e.runSearch]}})])]),a("div",{attrs:{id:"searchSummary"}}),a("div",{attrs:{id:"searchFacets"}},e._l(e.sortedAggregations,(function(t){return a("Facet",{key:t.id,attrs:{aggregation:t},on:{toggleFacet:e.toggleFacet}})})),1)])])])])}),v=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"input-group-prepend"},[a("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[a("i",{staticClass:"fa fa-search",attrs:{"aria-hidden":"true"}})])])}],m=(a("7514"),a("b047")),y=a.n(m),_=(a("8e6e"),a("bd86")),k=a("293d"),C=a.n(k),O={ELASTIC_INDEX:"prod_ps_store"};function P(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?P(Object(a),!0).forEach((function(t){Object(_["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):P(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var S=new C.a.Client({host:"https://elastic.thingy-ma-jig.co.uk/"}),w={platforms:{fieldName:"platforms",title:"Platforms"},genres:{fieldName:"genres",title:"Genres",labels:{"Role-Playing Games (RPG)":"RPG","MUSIC/RHYTHM":"Music"}},contentType:{fieldName:"gameContentType",title:"Game Type"},localPlayers:{fieldName:"maxLocalPlayers",title:"Local Players"},networkPlayers:{fieldName:"maxNetworkPlayers",title:"Network Players"},rating:{fieldName:"rating",title:"Rating",facetType:"range",facetOptions:{keyed:!0,ranges:[{key:"1-star",from:0,to:1.5},{key:"2-star",from:1.5,to:2.5},{key:"3-star",from:2.5,to:3.5},{key:"4-star",from:3.5,to:4.5},{key:"5-star",from:4.5,to:5}]}}},M={},x="",E=18;function F(e){var t="*";return void 0!==this.query&&this.query.length>0&&"-"!==this.query&&(t=this.query),S.search({index:O.ELASTIC_INDEX,body:{from:e*E,size:E,query:{bool:{must:{simple_query_string:{query:t,fields:["name^10","longDescription^1"]}},filter:Object.keys(M).map((function(e){var t=M[e];if(null!==t&&void 0!==t&&t.length>0){var a=w[e].facetType||"terms",r={};if(r[a]={},"range"===a){r[a][w[e].fieldName]={};var s=r[a][w[e].fieldName];t.forEach((function(t){var a=w[e].facetOptions.ranges.find((function(e){return e.key===t}));void 0!==a.from&&(void 0===s.gte||s.gte>a.from)&&(s.gte=a.from),void 0!==a.to&&(void 0===s.lte||s.lte<a.to)&&(s.lte=a.to)}))}else r[a][w[e].fieldName]=t;return r}return null})).filter((function(e){return!!e}))}},aggregations:Object.keys(w).reduce((function(e,t){var a=w[t].facetType||"terms";return e[t]={},e[t][a]=j({field:w[t].fieldName},w[t].facetOptions||{}),e}),{})}}).then((function(e){return{hits:e.hits,aggregations:Object.keys(e.aggregations).map((function(t){var a=Array.isArray(e.aggregations[t].buckets)?e.aggregations[t].buckets:Object.keys(e.aggregations[t].buckets).map((function(a){return j({key:a},e.aggregations[t].buckets[a])}));return{key:t,name:w[t].title,items:a.map((function(e){var a=e;return a.refined=!1,M[t]&&(a.refined=-1!==M[t].indexOf(e.key)),a})),isRefined:!!M[t]&&M[t].length}}))}}))}var q={search:F,facetMap:w,activeFacets:M,query:x,pageLength:E},N=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"card card-default facet"},[a("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:"collapse_"+e.aggregation.key,expression:"'collapse_' + aggregation.key"}],staticClass:"card-header"},[a("span",{staticClass:"icon"}),a("span",{staticClass:"card-title small"},[e._v(e._s(e.aggregation.name))])]),a("b-collapse",{attrs:{id:"collapse_"+e.aggregation.key,visible:!!e.aggregation.isRefined}},[a("ul",{staticClass:"list-group list-group-flush pre-scrollable"},e._l(e.aggregation.items,(function(t){return a("li",{key:t.key,staticClass:"list-group-item d-flex justify-content-between align-items-center",class:{refined:t.refined},attrs:{"data-facet-key":e.aggregation.key,"data-facet-value":t.key},on:{click:e.refine}},[a("div",{staticClass:"value small"},[e._v(e._s(e._f("formatFacetKey")(t.key,e.aggregation.key)))]),a("span",{staticClass:"badge badge-secondary badge-pill"},[e._v(e._s(t.doc_count))])])})),0)])],1)},T=[],$=a("5843"),I=a("39ba");r["a"].component("b-collapse",$["a"]),r["a"].directive("b-toggle",I["a"]);var R={props:{aggregation:{type:Object}},methods:{refine:function(e){this.$emit("toggleFacet",e.currentTarget.dataset.facetKey,e.currentTarget.dataset.facetValue)}}},L=R,A=Object(o["a"])(L,N,T,!1,null,null,null),D=A.exports,Q={props:{aggregations:{type:Array}},components:{Facet:D},data:function(){return{mutableQuery:q.query}},methods:{toggleSidebar:function(){this.$emit("toggleSidebar")},toggleFacet:function(e,t){this.$emit("toggleFacet",e,t)}},computed:{sortedAggregations:function(){var e=this;return this.aggregations?Object.keys(q.facetMap).reduce((function(t,a){var r=e.aggregations.find((function(e){return e.key===a}));return r&&t.push(r),t}),[]):[]},runSearch:function(){return y()((function(e){this.$emit("runSearch",e.srcElement.value)}),250).bind(this)}}},G=Q,K=Object(o["a"])(G,b,v,!1,null,null,null),H=K.exports,W=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"page-content-wrapper"}},[a("div",{staticClass:"container-fluid"},[e._m(0),a("div",{staticClass:"row"},[null==e.hits?a("p",[e._v("Lets do a search!")]):e._e(),e._l(e.hits,(function(e){return a("Result",{key:e._id,attrs:{hit:e}})})),e.searchInProgress?a("Spinner"):e._e(),a("div",{attrs:{id:"pager"}})],2)])])},J=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("h3",{staticClass:"text-muted"},[e._v("PS Store Search")])])])}],U=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"resultWrapper"},[a("div",{staticClass:"result"},[a("a",{attrs:{href:"https://store.playstation.com/en-gb/product/"+e.hit._id,title:e.hit._source.name,target:"_blank"}},[a("img",{attrs:{src:e.hit._source.thumbnailBaseUrl+"?w=400",alt:e.hit._source.name}}),a("p",{staticClass:"title"},[e._v(e._s(e.hit._source.name))])]),a("p",{staticClass:"badge-group"},[e.hit._source.development_status?a("span",{staticClass:"badge badge-pill badge-secondary"},[a("i",{staticClass:"fa fa-code"}),e._v(" "+e._s(e._f("formatFacetKey")(e.hit._source.development_status,"development_status"))+"\n      ")]):e._e(),e._l(e.hit._source.genres,(function(t){return a("span",{key:t,staticClass:"badge badge-pill badge-secondary"},[a("i",{staticClass:"fa fa-tag"}),e._v(" "+e._s(e._f("formatFacetKey")(t,"genres"))+"\n      ")])})),e._l(e.hit._source.platforms,(function(t){return a("span",{key:t,staticClass:"badge badge-pill badge-secondary"},[a("i",{staticClass:"fa fa-tag"}),e._v(" "+e._s(t)+"\n      ")])})),a("span",{staticClass:"badge badge-pill badge-secondary"},[a("i",{staticClass:"fa fa-star"}),e._v(" "+e._s(e.hit._source.rating)+"\n      ")])],2),e.hit.highlight?a("p",{staticClass:"small body"},[e._v(e._s(e._f("striphtml")(e.hit.highlight.body[0])))]):e._e()])])},X=[],z={props:["hit"],filters:{formatLongNumber:function(e){var t=1,a=Math.floor(Math.log(Math.abs(e))/Math.log(1e3)),r="kmbt"[a-1];return r?(e/Math.pow(1e3,a)).toFixed(t)+r:e}}},B=z,V=Object(o["a"])(B,U,X,!1,null,null,null),Y=V.exports,Z=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ee=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sk-cube-grid"},[a("div",{staticClass:"sk-cube sk-cube1"}),a("div",{staticClass:"sk-cube sk-cube2"}),a("div",{staticClass:"sk-cube sk-cube3"}),a("div",{staticClass:"sk-cube sk-cube4"}),a("div",{staticClass:"sk-cube sk-cube5"}),a("div",{staticClass:"sk-cube sk-cube6"}),a("div",{staticClass:"sk-cube sk-cube7"}),a("div",{staticClass:"sk-cube sk-cube8"}),a("div",{staticClass:"sk-cube sk-cube9"})])}],te={},ae=te,re=Object(o["a"])(ae,Z,ee,!1,null,null,null),se=re.exports,ne={props:["hits","searchInProgress"],components:{Result:Y,Spinner:se}},ie=ne,ce=Object(o["a"])(ie,W,J,!1,null,null,null),oe=ce.exports,le={components:{Sidebar:H,MainPageWrapper:oe},data:function(){return{sidebarExpanded:!1,hits:null,aggregations:null,page:0,loadMoreEnabled:!1,searchInProgress:!1}},methods:{loadMore:function(){var e=this;this.loadMoreEnabled&&!this.searchInProgress&&(this.page+=1,this.searchInProgress=!0,q.search(this.page).then((function(t){var a;(a=e.hits).push.apply(a,Object(h["a"])(t.hits.hits)),e.aggregations=t.aggregations,e.loadMoreEnabled=q.pageLength===t.hits.hits.length})).finally((function(){e.searchInProgress=!1})))},toggleSidebar:function(){this.sidebarExpanded=!this.sidebarExpanded},updateQuery:function(e){q.query=e,this.updateRoute()},updateRoute:function(){var e={query:q.query};void 0!==e.query&&0!==e.query.length||(e.query="-"),Object.keys(q.facetMap).forEach((function(t){e[t]="-",q.activeFacets[t]&&q.activeFacets[t].length&&(e[t]=q.activeFacets[t].join(","))})),["query"].concat(Object(h["a"])(Object.keys(q.facetMap))).reverse().some((function(t){return"-"!==e[t]||(delete e[t],!1)})),this.$router.push({name:"PsStoreSearch",params:e})},toggleFacet:function(e,t){q.activeFacets[e]=q.activeFacets[e]||[];var a=q.activeFacets[e].indexOf(t);-1!==a?q.activeFacets[e].splice(a,1):q.activeFacets[e].push(t),this.updateRoute()}},watch:{searchInProgress:{handler:function(e){e||this.$emit("doCheck")}},"$route.params":{immediate:!0,handler:function(e){var t=this;Object.keys(q.facetMap).forEach((function(t){e[t]&&"-"!==e[t]?q.activeFacets[t]=e[t].split(","):q.activeFacets[t]=null})),void 0===e.query||0===e.query.length||"-"===e.query?q.query=void 0:q.query=e.query,this.page=0,this.searchInProgress=!0,q.search(0).then((function(e){t.hits=e.hits.hits,t.aggregations=e.aggregations,t.loadMoreEnabled=q.pageLength===e.hits.hits.length})).finally((function(){t.searchInProgress=!1}))}}}},ue=le,ge=Object(o["a"])(ue,f,p,!1,null,null,null),de=ge.exports;r["a"].use(d["a"]);var fe=["query"].concat(Object.keys(q.facetMap)).map((function(e){return":".concat(e,"?")})).join("/"),pe=new d["a"]({base:"PlaystationStoreSearch",routes:[{path:"/".concat(fe),name:"PsStoreSearch",component:de,props:!0}]});pe.beforeEach((function(e,t,a){document.title="Playstation Store Search",a()}));var he=pe;r["a"].use(n.a),r["a"].config.productionTip=!1,r["a"].filter("striphtml",(function(e){var t=document.createElement("div");t.innerHTML=e;var a=t.textContent||t.innerText||"";return a})),r["a"].filter("formatFacetKey",(function(e,t){return q.facetMap[t]&&q.facetMap[t].labels&&q.facetMap[t].labels[e]?q.facetMap[t].labels[e]:e})),new r["a"]({el:"#app",router:he,render:function(e){return e(g)}})},"5c0b":function(e,t,a){"use strict";var r=a("e332"),s=a.n(r);s.a},e332:function(e,t,a){}});
//# sourceMappingURL=app.2990fe8a.js.map