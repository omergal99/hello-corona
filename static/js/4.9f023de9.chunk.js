(this["webpackJsonphello-corona"]=this["webpackJsonphello-corona"]||[]).push([[4],{293:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("defs",null,r.a.createElement("filter",{id:"dropshadow",height:"130%"},r.a.createElement("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"3"}),r.a.createElement("feOffset",{dx:"2",dy:"2",result:"offsetblur"}),r.a.createElement("feComponentTransfer",null,r.a.createElement("feFuncA",{type:"linear",slope:"0.5"})),r.a.createElement("feMerge",null,r.a.createElement("feMergeNode",null),r.a.createElement("feMergeNode",{in:"SourceGraphic"})))),r.a.createElement("defs",null,r.a.createElement("filter",{id:"dropshadow-color",x:"0%",y:"0%",width:"100%",height:"100%"},r.a.createElement("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"3",result:"blur"}),r.a.createElement("feOffset",{in:"blur",dx:"0",dy:"0",result:"offsetBlur"}),r.a.createElement("feFlood",{floodColor:"var(--color2-border)",floodOpacity:"0.6",result:"offsetColor"}),r.a.createElement("feComposite",{in:"offsetColor",in2:"offsetBlur",operator:"in",result:"offsetBlur"}),r.a.createElement("feMerge",null,r.a.createElement("feMergeNode",null),r.a.createElement("feMergeNode",{in:"SourceGraphic"})))))}},294:function(e,t,a){"use strict";var n=a(17),r=a(0),l=a.n(r);t.a=function(e){var t=e.list,a=void 0===t?[]:t,c=e.filterKeys,s=void 0===c?[]:c,o=e.placeholder,i=void 0===o?"Search":o,u=e.onFilter,m=Object(r.useState)(""),d=Object(n.a)(m,2),f=d[0],E=d[1];return l.a.createElement("input",{className:"filter-input",type:"text",placeholder:i,value:f,onChange:function(e){E(e.target.value);var t=e.target.value.toLowerCase();if(t){var n=a.filter((function(e){return s.some((function(a){return e[a].toLowerCase().includes(t)}))}));u(n)}else u(a)}})}},295:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(18),c=a(15);var s=function(e){var t=e.country,a=e.sounds,l="World"===t.name,s=a.isCountryVoice,o=l?r.a.createElement("video",{className:"country-earth",autoPlay:!0,loop:!0,muted:!0,playsInline:!0,loading:"lazy"},r.a.createElement("source",{src:c.a.getSrc("earth.mp4"),type:"video/mp4"})):r.a.createElement("img",{className:"country-flag",alt:"Flag",title:t.name,src:c.a.getImgSrc("flags/".concat(t.alpha2.toLowerCase(),".png"))});return Object(n.useEffect)((function(){if(s&&!l){var e=new SpeechSynthesisUtterance;e.text=t.name,e.voice=window.speechSynthesis.getVoices()[1],e.voiceURI="native",e.volume=1,e.rate=1,e.pitch=.8,e.lang="en-US",speechSynthesis.speak(e)}}),[t,s,l]),r.a.createElement("div",{className:"country-details-title"},r.a.createElement("div",{className:"wrap-country-icon ".concat(l?"earth":"flag")},o),r.a.createElement("div",{className:"wrap-country-title"},r.a.createElement("h2",null,t.name),r.a.createElement("span",{className:"continent"},t.continent)))},o=a(5);var i=function(e){var t=e.country,a=[o.b,o.f,o.k,o.a,o.e,o.l],n=Object(o.p)().map((function(e){var n=a.some((function(t){return t===e.key})),l=t[e.key]?c.a.numberWithCommas(t[e.key]):"No Data",s=e.key===o.b?o.i:e.dividBy,i=t[e.key]/t[s]*100;return r.a.createElement("li",{className:"country-details-item",key:e.key,style:{color:e.colorHEX}},r.a.createElement("span",{className:"title"},e.title,":\xa0",n&&r.a.createElement("div",{className:"wrap-icon-svg"},e.svgIcon)),r.a.createElement("span",{className:"value",title:l},l),s&&!!t[e.key]&&r.a.createElement("span",{className:"percent",title:i.toFixed(2)},0!==Number(i.toFixed(0))?i.toFixed(0):i.toFixed(2),"%"))})),l=function(){var e=Object(o.q)(o.i),a=c.a.numberWithCommas(t[e.key]);return r.a.createElement("li",{className:"country-details-item"},r.a.createElement("span",{className:"title"},e.title,":\xa0"),r.a.createElement("span",{className:"value population",title:a},a))}();return r.a.createElement("ul",{className:"country-details-list"},l,n)};t.a=function(e){var t=e.country,a=Object(l.c)((function(e){return e.settingsStore})),n=a?a.sounds:{sounds:!1};return r.a.createElement("div",{className:"country-details flex-col"},r.a.createElement(s,{country:t,sounds:n}),r.a.createElement(i,{country:t}))}},299:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(19),c=a(18),s=a(25),o=a(12),i=a(17),u=a(15),m=a(5);var d=function(e){var t=e.country,a=e.selectedCountry,n=e.onSelectCountry,l=t.name===a.name?"selected":"";return r.a.createElement("li",{className:"wrap-country"},r.a.createElement("div",{className:"country ".concat(l),onClick:function(){return n(t)}},r.a.createElement("div",null,r.a.createElement("span",null,t.name)),r.a.createElement("div",null,r.a.createElement("span",null,"Cases: "),r.a.createElement("span",null,u.a.numberWithCommas(t[m.b]))),r.a.createElement("div",null,r.a.createElement("span",null,"Deaths: "),r.a.createElement("span",null,u.a.numberWithCommas(t[m.f]))),r.a.createElement("div",null,r.a.createElement("span",null,"Recovered: "),r.a.createElement("span",null,u.a.numberWithCommas(t[m.k])))))},f=a(294);var E=function(e){var t=e.countriesStore,a=t.countries,l=t.selectedCountryIndex,c=e.onSelectCountry,s=l||0===l?a[l]:{},o=Object(n.useState)(a),u=Object(i.a)(o,2),m=u[0],E=u[1],v=m.map((function(e){return r.a.createElement(d,{key:e.name,country:e,selectedCountry:s,onSelectCountry:c})}));return r.a.createElement("div",{className:"country-view-list flex-col"},r.a.createElement("div",{className:"custom-filter-input"},r.a.createElement(f.a,{list:a,filterKeys:["name"],placeholder:"Search Country",onFilter:E})),r.a.createElement("ul",{className:"countries"},v))},v=a(293);var p=function(e){var t=e.selectedCountry,a=Object(n.useRef)(),l=Object(n.useState)(1),c=Object(i.a)(l,2),s=c[0],o=c[1],u=Object(n.useState)("0 0 100 100"),m=Object(i.a)(u,2),d=m[0],f=m[1];return Object(n.useEffect)((function(){var e=a.current.getBBox();"United States"===t.name&&(e.width=265);var n=Math.abs(e.width-e.height)/2,r=e.width>e.height?e.width:e.height,l=e.width>e.height?e.x:e.x-n,c=e.width>e.height?e.y-n:e.y;f("".concat(l-2," ").concat(c-2," ").concat(r+4," ").concat(r+4)),o(r/200)}),[t]),r.a.createElement("div",{className:"country-view-presentation",key:t.name},r.a.createElement("svg",{className:"svg-country-presentation",viewBox:d,style:{filter:"url(#dropshadow-color)"}},r.a.createElement(v.a,null),r.a.createElement("path",{className:"country-path",d:t.d,ref:a,style:{strokeWidth:"".concat(s,"px")}})))},h=a(295);var y=function(e){var t=e.selectedCountry;return r.a.createElement("div",{className:"country-view-details flex-col"},r.a.createElement(h.a,{country:t}))};var g=function(){return r.a.createElement("div",{className:"country-view-bottom"},r.a.createElement("div",{className:"wrap-loader-svg"},r.a.createElement("div",{className:"lighter-1 lighter"}),r.a.createElement("div",{className:"lighter-2 lighter"}),r.a.createElement("svg",{className:"loader-svg",viewBox:"0 0 100 100"},r.a.createElement("g",{className:"g-loader"},r.a.createElement("circle",{className:"light-source",r:"15%"}),r.a.createElement("circle",{className:"spiner-1 spiner",r:"20%"}),r.a.createElement("circle",{className:"spiner-2 spiner",r:"30%"}),r.a.createElement("circle",{className:"spiner-3 spiner",r:"40%"})))))};t.default=function(){var e=Object(c.c)((function(e){return e.countriesStore})),t=Object(c.b)(),a=Object(l.g)(),i=Object(l.h)();Object(n.useEffect)((function(){if(e&&i){var n=e.countries,r=e.selectedCountryIndex,l=r||0===r;if(i.alpha2&&!l){var c=n.find((function(e){return e.alpha2===i.alpha2}));t(s.a.selectCountry(c))}!i.alpha2&&l&&a.push("/".concat(o.b,"/").concat(n[r].alpha2))}}),[t,e,i,a]);var u=e&&e.selectedCountryIndex,m=u||0===u?e.countries[u]:e?e.worldData:{};return r.a.createElement(r.a.Fragment,null,e&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"country-view"},r.a.createElement(E,{countriesStore:e,onSelectCountry:function(e){var n=e.alpha2===m.alpha2?"":e.alpha2;a.push("/".concat(o.b,"/").concat(n)),t(s.a.selectCountry(e))}}),r.a.createElement(p,{selectedCountry:m}),r.a.createElement(y,{selectedCountry:m}),r.a.createElement(g,null))))}}}]);
//# sourceMappingURL=4.9f023de9.chunk.js.map