(function(t){function e(e){for(var a,l,o=e[0],r=e[1],c=e[2],b=0,d=[];b<o.length;b++)l=o[b],Object.prototype.hasOwnProperty.call(i,l)&&i[l]&&d.push(i[l][0]),i[l]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);u&&u(e);while(d.length)d.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],a=!0,o=1;o<s.length;o++){var r=s[o];0!==i[r]&&(a=!1)}a&&(n.splice(e--,1),t=l(l.s=s[0]))}return t}var a={},i={app:0},n=[];function l(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,l),s.l=!0,s.exports}l.m=t,l.c=a,l.d=function(t,e,s){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(l.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(s,a,function(e){return t[e]}.bind(null,a));return s},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],r=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=r;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";s("85ec")},"0422":function(t,e,s){"use strict";s("780b")},"21a3":function(t,e,s){},4436:function(t,e,s){},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("link",{attrs:{href:"https://fonts.googleapis.com/css?family=Nunito%20Sans:600,700,800",rel:"stylesheet",type:"text/css"}}),s("Loader")],1)},n=[],l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade"}},[s("div",{staticStyle:{position:"absolute","z-index":"9999",width:"100%",height:"100%",background:"#f2f6f9"},attrs:{id:"content_loading"}},[s("import-param",{on:{"imported-param":t.importedParam}}),s("export-param"),s("vue-draggable-resizable",{staticClass:"popup-pannel",attrs:{"drag-handle":".panel-heading",parent:!0,active:t.isEditorActive,"class-name-active":"active-pannel",resizable:!1,"enable-native-drag":!0,h:"auto",w:400,"max-width":400,"max-height":800},on:{"update:active":function(e){t.isEditorActive=e},activated:t.onEditorActivated,deactivated:t.onEditorDeactivated}},[s("nav",{staticClass:"panel"},[s("div",{staticClass:"panel-heading"},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-narrow"},[s("i",{staticClass:"fa fa-arrows",staticStyle:{"margin-right":"10px"}}),t._v(" Editor ")]),s("div",{staticClass:"column is-1 is-offset-7"},[s("div",{staticStyle:{cursor:"pointer"},on:{click:t.minimizeEditor}},[t._v(" "+t._s(t.editorMinimized?"➕":"➖")+" ")])])])]),s("p",{staticClass:"panel-tabs"},[s("a",{class:{"is-active":"general"===t.activeTab},on:{click:function(e){return t.openTab("general")}}},[t._v("General")]),s("a",{class:{"is-active":"bubbles"===t.activeTab},on:{click:function(e){return t.openTab("bubbles")}}},[t._v("Bubbles")]),s("a",{class:{"is-active":"logo"===t.activeTab},on:{click:function(e){return t.openTab("logo")}}},[t._v("Logo")]),s("a",{class:{"is-active":"imp-exp"===t.activeTab},on:{click:function(e){return t.openTab("imp-exp")}}},[t._v("Import/Export")])])]),s("div",{staticClass:"editor-content",style:{display:t.editorMinimized?"none":null}},["general"===t.activeTab?s("div",{attrs:{"data-name":"general-tab"}},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.param.showBubbles,expression:"param.showBubbles"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.param.showBubbles)?t._i(t.param.showBubbles,null)>-1:t.param.showBubbles},on:{change:function(e){var s=t.param.showBubbles,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n=null,l=t._i(s,n);a.checked?l<0&&t.$set(t.param,"showBubbles",s.concat([n])):l>-1&&t.$set(t.param,"showBubbles",s.slice(0,l).concat(s.slice(l+1)))}else t.$set(t.param,"showBubbles",i)}}}),t._v(" Show Bubbles ")])])]),s("div",{staticClass:"field"},[s("div",{staticClass:"controle"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.param.playAnimation,expression:"param.playAnimation"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.param.playAnimation)?t._i(t.param.playAnimation,null)>-1:t.param.playAnimation},on:{change:function(e){var s=t.param.playAnimation,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n=null,l=t._i(s,n);a.checked?l<0&&t.$set(t.param,"playAnimation",s.concat([n])):l>-1&&t.$set(t.param,"playAnimation",s.slice(0,l).concat(s.slice(l+1)))}else t.$set(t.param,"playAnimation",i)}}}),t._v(" Bubble Animation ")])])]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Progress Color")]),s("div",{staticClass:"controle"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.param.progressColor,expression:"param.progressColor"}],staticClass:"u-full-width",staticStyle:{width:"100%"},attrs:{type:"color",placeholder:"#2d",id:"progresscolorInput"},domProps:{value:t.param.progressColor},on:{input:function(e){e.target.composing||t.$set(t.param,"progressColor",e.target.value)}}})])])]):t._e(),"bubbles"===t.activeTab?s("div",{attrs:{"data-name":"bubbles-tab"}},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("label",{attrs:{for:"exampleRecipientInput"}},[t._v("Language Code")]),s("v-select",{attrs:{options:t.availbleLangs,reduce:function(t){return t.label},clearable:!1,id:"exampleRecipientInput"},on:{input:t.languageChanged},scopedSlots:t._u([{key:"option",fn:function(e){return[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-4"},[s("span",{staticClass:"fi",class:"fi-"+t.langToCountry(e.label)}),t._v(" "+t._s(e.label)+" ")]),s("div",{staticClass:"column is-4 is-offset-4",staticStyle:{"text-align":"right"}},[e.bubbleCount>0&&e.bubbleCount<3?s("span",{staticClass:"tag is-warning",staticStyle:{"font-size":"9px"}},[t._v("Not enough bubbles")]):e.bubbleCount>=3?s("span",{staticClass:"tag is-success",staticStyle:{"font-size":"9px"}},[t._v("Valide")]):s("span",{staticClass:"tag is-light",staticStyle:{"font-size":"9px"}},[t._v("Empty")])])])]}},{key:"selected-option",fn:function(e){return[s("span",{staticClass:"fi",class:"fi-"+t.langToCountry(e.label)}),s("span",{staticStyle:{"margin-left":"0.5em"}},[t._v(t._s(e.label))])]}}],null,!1,3945665071),model:{value:t.selected_lang,callback:function(e){t.selected_lang=e},expression:"selected_lang"}})],1)]),s("draggable",{staticClass:"bubbles-editor-section",attrs:{tag:"div",list:t.bubbles,handle:".bubble-drag-handle"}},t._l(t.bubbles,(function(e,a){return s("bubbleEdit",{key:a,staticStyle:{margin:"10px"},attrs:{index:a,bubble:e},on:{onDeleteBubble:function(e){return t.deleteBubble(a)}}})})),1),s("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[t.bubbles.length<3?s("div",{staticClass:"alert-warning",staticStyle:{"font-size":"9px","margin-bottom":"10px"}},[t._v(" ⚠️ You still didn't reach the required number of bubbles ("+t._s(3-t.bubbles.length)+") "),s("u",{staticStyle:{cursor:"pointer"},on:{click:t.createNeededBubbles}},[t._v("(create the bubbles)")])]):t._e(),t.bubbles.length<5?s("button",{staticClass:"button",on:{click:t.addBubble}},[t._v("Add Bubble "),s("i",{staticClass:"fa fa-plus-circle",staticStyle:{"margin-left":"5px"}})]):t._e()])],1):t._e(),"logo"===t.activeTab?s("div",[t.showLoadImgError?s("div",{staticClass:"notification is-danger"},[s("button",{staticClass:"delete",on:{click:function(e){t.showLoadImgError=!1}}}),t._v(" please re-upload the image using the form bellow , or change the logo source "),s("strong",[t._v("logo.src")]),t._v(" to a full http link or base64 "),s("i",[t._v('(current value : "'+t._s(t.param.logo.src)+'")')]),t._v(" . "),s("br"),t._v(" (NB: images that exist on smart are not available on this app) . ")]):t._e(),s("div",{staticClass:"file is-centered has-name is-boxed"},[s("label",{staticClass:"file-label"},[s("input",{staticClass:"file-input",attrs:{name:"logo-img",type:"file",accept:".gif,.png,.jpeg,.jpg"},on:{change:t.onFileChange}}),s("span",{staticClass:"file-cta"},[s("span",{staticClass:"file-icon"},[s("i",{staticClass:"fas fa-upload"})]),s("span",{staticClass:"file-label"},[t._v(" Choose an image… ")])]),t.logoFileName?s("span",{staticClass:"file-name"},[t._v(" "+t._s(t.logoFileName)+" ")]):t._e()])]),t.param.logo.src?s("style-editor",{staticStyle:{padding:"2em 3em 0 3em"},attrs:{element:t.param.logo,isImage:!0}}):t._e()],1):t._e(),"imp-exp"===t.activeTab?s("div",[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-6"},[s("button",{staticClass:"button",on:{click:t.openExportModal}},[t._v("Export Params 📥")])]),s("div",{staticClass:"column is-6"},[s("button",{staticClass:"button",on:{click:t.openImportModal}},[t._v("Import Params 📤")])])])]):t._e(),s("hr"),s("div",{staticStyle:{"text-align":"center"}},[s("div",{staticClass:"row"},[s("button",{staticClass:"button is-primary",on:{click:t.simulateLoading}},[t._v("Replay Animation "),s("i",{staticClass:"fa fa-arrows-rotate",staticStyle:{"margin-left":"5px"}})])])])])]),s("vue-topprogress",{ref:"topProgress",attrs:{color:t.param.progressColor,height:5}}),s("div",{class:{slideup:t.param.showBubbles},staticStyle:{width:"100%",height:"25%",display:"flex","align-items":"center","justify-content":"center",transform:"translateY(30vh)"}},[s("span",{staticClass:"loading-progress"},[t._v(t._s(t.progress)+"%")])]),s("div",{staticClass:"bull-container",class:{"popup-animate":t.param.showBubbles}},[t.param.showBubbles?t._l(t.bubbles,(function(e,a){return s("LoginBubble",{key:a,class:{bubble:t.param.playAnimation},style:e.style,attrs:{"opacity-percentage":e.opacity,size:e.size}},[t._l(e.content,(function(a,i){return[s("span",{key:i,style:Object.assign({},{"font-size":t.computeBullFontSize(e.size)},a.style)},[t._v(t._s(a.label))])]}))],2)})):t._e()],2),s("div",{staticStyle:{width:"100%",height:"20%",display:"flex"}},[s("div",{staticStyle:{"flex-grow":"1",flex:"1"}}),s("div",{staticStyle:{"flex-grow":"1",flex:"1",display:"flex","justify-content":"center","align-items":"center"}},[s("div",{staticStyle:{display:"flex"},style:Object.assign({},{height:"50%"},t.param.logo.style)},[t.param.logo.src?s("img",{staticStyle:{"object-fit":"contain"},attrs:{src:t.param.logo.src,alt:"clientLogo"},on:{load:t.logoLoaded,error:t.errorLoadingImage}}):t._e()])]),s("div",{staticStyle:{"flex-grow":"1",flex:"1",display:"flex","justify-content":"flex-end","align-items":"center"}})])],1)])},o=[],r=(s("d3b7"),s("4e82"),s("b0c0"),s("b64b"),s("a434"),s("99af"),s("159b"),s("a36f")),c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bubble-circle bubble-container",style:{opacity:t.opacityPercentage+"%",height:t.size+"px",width:t.size+"px"}},[t._t("default")],2)},u=[],b=(s("a9e3"),{name:"LoginBubble",props:{opacityPercentage:{type:[String,Number],default:10},size:{type:[String,Number],default:150}}}),d=b,p=(s("e72b"),s("2877")),m=Object(p["a"])(d,c,u,!1,null,null,null),h=m.exports,g=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"collapsible-group",attrs:{id:"coll"}},[s("div",{ref:"collapsible",staticClass:"collapsible"},[s("i",{staticClass:"fa fa-align-justify bubble-drag-handle"}),t._v(" Bubble "+t._s(t.index)+" "),s("span",{staticStyle:{padding:"0","margin-left":"190px"},on:{click:t.deleteBubble}},[t._v("🗑️")])]),s("div",{ref:"content",staticClass:"collaps-content",attrs:{id:"coll-content-"+t.index}},[s("div",{staticStyle:{"margin-top":"10px"}},[s("label",[t._v("Style")]),s("styleEditor",{attrs:{element:t.bubble}})],1),s("hr"),s("div",[s("h6",{staticClass:"title is-6"},[t._v("Content")]),s("draggable",{staticClass:"list-group",attrs:{tag:"ul",list:t.bubble.content,draggable:".item",handle:".drag-handle"}},[t._l(t.bubble.content,(function(e,a){return s("li",{key:a,staticClass:"list-group-item item"},[s("i",{staticClass:"fa fa-align-justify drag-handle"}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.label,expression:"line.label"}],staticClass:"input is-small label-input",attrs:{type:"text",placeholder:"Text...",id:"label"+a},domProps:{value:e.label},on:{input:function(s){s.target.composing||t.$set(e,"label",s.target.value)}}}),s("div",{staticClass:"actions"},[s("popper",{attrs:{trigger:"clickToOpen","boundaries-selector":"#coll-content-"+t.index}},[s("div",{staticClass:"popper"},[s("styleEditor",{attrs:{element:e,noSize:!0}})],1),s("i",{staticClass:"fa fa-paint-brush",attrs:{slot:"reference"},slot:"reference"})]),s("i",{staticClass:"fa fa-trash-can delete-label",on:{click:function(e){return t.deleteLabel(a)}}})],1)])})),s("li",{staticClass:"list-group-item",staticStyle:{padding:"0","margin-bottom":"1em"},attrs:{slot:"footer"},slot:"footer"},[t.bubble.content.length<3?s("button",{staticClass:"button is-fullwidth add-label",on:{click:t.addLabel}},[s("span",{staticStyle:{"text-decoration":"underline"}},[t._v(" Add Label ")]),s("span",{staticClass:"icon is-medium",staticStyle:{"margin-left":"5px"}},[s("i",{staticClass:"fa fa-circle-plus"})])]):t._e()])],2)],1)])])},f=[],v=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"style-container"},[s("div",{staticStyle:{"text-align":"right"}},[s("i",{staticClass:"fa fa-arrows-rotate reset",on:{click:t.reset}})]),t.noSize||t.isImage?t._e():[s("div",{staticClass:"columns fix-margin"},[s("div",{staticClass:"column",staticStyle:{"padding-top":"0"}},[s("label",[t._v("Size:")]),s("vue-slider",{attrs:{min:50,max:300},model:{value:t.element.size,callback:function(e){t.$set(t.element,"size",e)},expression:"element.size"}})],1)])],t.isImage?[s("div",{staticClass:"columns fix-margin"},[s("div",{staticClass:"column",staticStyle:{"padding-top":"0"}},[s("label",[t._v("Size:")]),s("vue-slider",{attrs:{min:5,max:100},on:{change:t.heightChanged},model:{value:t.height,callback:function(e){t.height=e},expression:"height"}})],1)])]:t._e(),s("div",{staticClass:"columns fix-margin"},[s("div",{staticClass:"column"},[s("label",[t._v("X:")]),s("vue-slider",{attrs:{min:-100,max:100,name:"marginX"},on:{change:t.xRangeChanged},model:{value:t.xpos,callback:function(e){t.xpos=e},expression:"xpos"}})],1),s("div",{staticClass:"column"},[s("label",[t._v("Y:")]),s("vue-slider",{attrs:{min:-100,max:100,name:"marginY"},on:{change:t.yRangeChanged},model:{value:t.ypos,callback:function(e){t.ypos=e},expression:"ypos"}})],1)]),t.isImage?t._e():s("div",{staticClass:"field has-addons",staticStyle:{"justify-content":"center"}},[s("p",{staticClass:"control"},[s("button",{staticClass:"button is-small",class:{"is-active active":t.isActiveStyle("font-weight")},on:{click:function(e){return t.toggleStyle("font-weight","bold")}}},[t._m(0)])]),s("p",{staticClass:"control"},[s("button",{staticClass:"button is-small",class:{"is-active active":t.isActiveStyle("font-style")},on:{click:function(e){return t.toggleStyle("font-style","italic")}}},[t._m(1)])]),s("p",{staticClass:"control"},[s("button",{staticClass:"button is-small",class:{"is-active active":t.isActiveStyle("text-decoration")},on:{click:function(e){return t.toggleStyle("text-decoration","underline")}}},[t._m(2)])]),s("p",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.element.style.color,expression:"element.style.color"}],staticClass:"input color-input is-small",attrs:{type:"color"},domProps:{value:t.element.style.color},on:{input:function(e){e.target.composing||t.$set(t.element.style,"color",e.target.value)}}})])])],2)},y=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon is-small"},[s("i",{staticClass:"fas fa-bold"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon is-small"},[s("i",{staticClass:"fas fa-italic"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon is-small"},[s("i",{staticClass:"fas fa-underline"})])}],C=s("4971"),x=s.n(C),_=(s("24df"),{name:"StyleEditor",props:{element:{type:Object},noSize:{type:Boolean,default:!1},isImage:{type:Boolean,default:!1}},data:function(){return{xpos:0,ypos:0,height:50}},components:{VueSlider:x.a},methods:{isActiveStyle:function(t){return!!this.element.style&&Object.prototype.hasOwnProperty.call(this.element.style,t)},heightChanged:function(t){this.$set(this.element.style,"height",t+"%")},xRangeChanged:function(t){this.$set(this.element.style,"position","relative"),this.$set(this.element.style,"right",t+"px")},yRangeChanged:function(t){this.$set(this.element.style,"position","relative"),this.$set(this.element.style,"top",t+"px")},toggleStyle:function(t,e){this.isActiveStyle(t)?this.$delete(this.element.style,t):this.$set(this.element.style,t,e)},reset:function(){this.element.style={},this.xpos=0,this.ypos=0,this.height=50,this.$delete(this.element,"size")}},mounted:function(){}}),w=_,S=(s("66b0"),Object(p["a"])(w,v,y,!1,null,"5a72e24c",null)),$=S.exports,B=s("526e"),j=s.n(B),O=s("b76a"),E=s.n(O),k=(s("a101"),{name:"bubbleEdit",props:["index","bubble"],components:{styleEditor:$,Popper:j.a,draggable:E.a},methods:{addLabel:function(){var t=this;this.bubble.content.push({label:"",style:{}}),setTimeout((function(){t.$refs.content.style.maxHeight=t.$refs.content.scrollHeight+"px"}),100)},deleteLabel:function(t){this.bubble.content.splice(t,1)},deleteBubble:function(){this.$emit("onDeleteBubble",this.bubble)},initCollapsible:function(){var t=this.$refs.collapsible;t.addEventListener("click",(function(){this.classList.toggle("active");var t=this.nextElementSibling;t.style.maxHeight?t.style.maxHeight=null:t.style.maxHeight=t.scrollHeight+"px"}))}},mounted:function(){this.initCollapsible()}}),P=k,A=(s("ff1f"),Object(p["a"])(P,g,f,!1,null,"0686573c",null)),z=A.exports,L=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("modal",{attrs:{name:"import-dialog",height:"auto",draggable:!0}},[s("div",{staticStyle:{padding:"1em","max-height":"85vh",overflow:"auto"}},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("div",{staticClass:"control"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.jsonString,expression:"jsonString"}],staticClass:"textarea json-text",attrs:{rows:"8",placeholder:"{format: JSON}"},domProps:{value:t.jsonString},on:{input:function(e){e.target.composing||(t.jsonString=e.target.value)}}})])])]),s("json-viewer",{attrs:{value:t.parsedJson,copyable:"",boxed:"",sort:""}}),s("div",{staticClass:"columns",staticStyle:{"margin-top":"10px"}},[s("div",{staticClass:"column is-5"},[s("button",{staticClass:"button is-primary",attrs:{type:"submit",disabled:""===t.jsonString},on:{click:t.importParam}},[t._v("Import 📤")])]),s("div",{staticClass:"column is-7"},[t.error?s("div",{staticClass:"alert-error"},[t._v(" ⚠️ "+t._s(t.error)+" ")]):t._e()])])],1)])},N=[],T=s("b5ae"),I=s("349e"),M=s.n(I),F=s("ef5d"),R=function(t){return"object"===F(t)},D=function(t){return"array"===F(t)},J=function(t){return!T["helpers"].req(t)||"boolean"===F(t)},q=T["helpers"].regex("isHexColor",/^#[0-9a-f]{3,6}$/i),H={name:"importParam",data:function(){return{jsonString:'{\n    "showBubbles": true,\n    "progressColor": "#FF0000",\n    "playAnimation": true,\n    "bubbles": {\n        "fr": [{\n            "content": [{\n                "label": "2800",\n                "style": {\n                    "font-weight": "bold"\n                }\n            }, {\n                "label": "Collaborateurs"\n            }]\n        }, {\n            "style": {\n                "margin-bottom": "10%"\n            },\n            "content": [{\n                "label": "Dans + de"\n            }, {\n                "label": "7 pays",\n                "style": {\n                    "font-weight": "bold"\n                }\n            }]\n        }, {\n            "style": {\n                "margin-top": "5%"\n            },\n            "size": "200",\n            "content": [{\n                "label": "200M€",\n                "style": {\n                    "font-weight": "bold"\n                }\n            }, {\n                "label": "chiffres d\'affaires en 2020"\n            }]\n        }, {\n            "style": {\n                "margin-bottom": "7%"\n            },\n            "content": [{\n                "label": "Fondée en"\n            }, {\n                "label": "1984",\n                "style": {\n                    "font-weight": "bold"\n                }\n            }]\n        }, {\n            "content": [{\n                "label": "Top #10",\n                "style": {\n                    "font-weight": "bold"\n                }\n            }, {\n                "label": "Greate Places To Work"\n            }]\n        }],\n        "en": [{\n            "size": "200",\n            "content": [{\n                "label": "Somthing in english"\n            }, {\n                "label": "8M£",\n                "style": {\n                    "font-weight": "bold"\n                }\n            }]\n        }, {\n            "content": [{\n                "label": "Test"\n            }, {\n                "label": "Somthing else in english",\n                "style": {\n                    "font-weight": "bold"\n                }\n            }]\n        }, {\n            "size": "200",\n            "content": [{\n                "label": "Test"\n            }, {\n                "label": "Somthing else in english!",\n                "style": {\n                    "font-weight": "bold"\n                }\n            }]\n        }]\n    },\n    "logo": {\n        "src": "../img/srh.gif",\n        "style": {}\n    }\n} ',param:"",error:null}},validations:function(){return{param:{isObject:R,required:T["required"],showBubbles:{isBoolean:J},playAnimation:{isBoolean:J},progressColor:{isHexColor:q},logo:{isObject:R,src:{alphaNum:T["alphaNum"]},style:{isObject:R,required:T["required"]}},bubbles:{$each:{$each:{size:{numeric:T["numeric"]},style:{required:T["required"],isObject:R},content:{required:T["required"],isArray:D,$each:{style:{required:T["required"],isObject:R}}}}}}}}},components:{JsonViewer:M.a},computed:{parsedJson:function(){try{return JSON.parse(this.jsonString)}catch(t){return"JSON YOU ENTERED IS NOT CORRECT!"}}},methods:{importParam:function(){this.error=null;try{this.param=JSON.parse(this.jsonString)}catch(l){return void(this.error="Param should have a JSON format")}if(this.$v.param.$touch(),console.log("this.$v",this.$v),this.$v.param.$invalid){if(console.log("INVALID"),!this.$v.param.isObject)return void(this.error="Param should be an Object");if(!this.$v.param.required)return void(this.error="Param should have attributes");if(!this.$v.param.showBubbles.isBoolean)return void(this.error="showBubbles should be a Boolean");if(!this.$v.param.playAnimation.isBoolean)return void(this.error="playAnimation should be a Boolean");if(!this.$v.param.progressColor.isHexColor)return void(this.error="progressColor should be a color in hex format #RRGGBB");for(var t in this.$v.param.bubbles.$each.$iter){var e=this.$v.param.bubbles.$each.$iter[t];for(var s in e.$each.$iter){var a=e.$each.$iter[s];if(!a.size.numeric)return void(this.error="bubbles[".concat(t,"][").concat(s,"].size should be numeric"));if(a.style.required){if(!a.style.isObject)return void(this.error="bubbles[".concat(t,"][").concat(s,"].style should be an Object"))}else this.$set(this.param.bubbles[t][s],"style",{});if(a.content.required)if(a.content.isArray)for(var i in a.content.$each.$iter){var n=a.content.$each.$iter[i];if(n.style.required){if(!n.style.isObject)return void(this.error="bubbles[".concat(t,"][").concat(s,"].content[").concat(i,"].style should be an Object"))}else this.$set(this.param.bubbles[t][s].content[i],"style",{})}else this.error="bubbles[".concat(t,"][").concat(s,"].content should be an Array");else this.$set(this.param.bubbles[t][s],"content",[])}}if(this.$v.param.logo.$model){if(!this.$v.param.logo.isObject)return void(this.error="logo should be an object containing src and style")}else this.$set(this.param,"logo",{});if(this.$v.param.logo.style.$model&&!this.$v.param.logo.style.isObject)return void(this.error="logo.style should be an object")}console.log("PARAM",this.param),this.$emit("imported-param",this.param)}}},U=H,V=(s("5d33"),Object(p["a"])(U,L,N,!1,null,"0082ae69",null)),Y=V.exports,G=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("modal",{attrs:{name:"export-dialog",height:"auto",draggable:!0},on:{"before-open":t.prepareParam}},[s("div",{staticStyle:{padding:"1em","max-height":"85vh",overflow:"auto"}},[t.raw?s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("div",{staticClass:"control"},[s("textarea",{staticClass:"textarea json-text",attrs:{rows:"8",placeholder:"{format: JSON}"},domProps:{value:t.stringifyJson}})])])]):s("json-viewer",{attrs:{value:t.param,copyable:"",boxed:"",sort:""}}),s("div",{staticClass:"columns",staticStyle:{"margin-top":"10px"}},[s("div",{staticClass:"column is-2"},[s("button",{staticClass:"button is-primary",attrs:{type:"submit"},on:{click:t.closeModal}},[t._v("Okay 😊")])]),s("div",{staticClass:"column"},[s("button",{staticClass:"button",staticStyle:{"margin-right":"5px"},attrs:{type:"submit"},on:{click:function(e){t.raw=!t.raw}}},[t._v(t._s(t.raw?"Beautify":"Raw"))]),t.isFileUploaded?s("button",{staticClass:"button",attrs:{type:"submit"},on:{click:function(e){t.wantBase64=!t.wantBase64,t.toggleBase64()}}},[t._v("Convert Logo to "+t._s(t.wantBase64?"FileName":"Base64"))]):t._e()])]),s("div",{staticStyle:{"text-align":"center"}},[t.error?s("div",{staticClass:"alert-warning"},[t._v(" ⚠️ "+t._s(t.error)+" ")]):t._e()])],1)])},X=[],W=(s("e9c4"),s("3410"),{name:"exportParam",data:function(){return{param:{},error:null,raw:!1,logoFileName:null,logoBase64:null,wantBase64:!1,isFileUploaded:!1}},components:{JsonViewer:M.a},computed:{stringifyJson:function(){try{return JSON.stringify(this.param,null,4)}catch(t){return"JSON YOU ENTERED IS NOT CORRECT!"}}},methods:{init:function(){this.logoFileName=null,this.logoBase64=null,this.error=null,this.isFileUploaded=!1},prepareParam:function(t){var e=this;function s(t){return t&&0===Object.keys(t).length&&Object.getPrototypeOf(t)===Object.prototype}this.init();var a=JSON.parse(JSON.stringify(t.params)),i=Object.keys(a.bubbles);i.forEach((function(t){var i=a.bubbles[t];i.length?(i.length<3&&(e.error="warning: bubbles in lang [".concat(t,"] are less than 3.")),i.forEach((function(t){s(t.style)&&delete t.style,delete t.opacity,t.content&&t.content.forEach((function(t){s(t.style)&&delete t.style}))}))):delete a.bubbles[t]})),s(a.logo.style)&&delete a.logo.style,a.logo.name&&(this.isFileUploaded=!0,this.logoBase64=a.logo.src,this.logoFileName=a.logo.name,delete a.logo.name,this.wantBase64?a.logo.src=this.logoBase64:a.logo.src=this.logoFileName),a.logo.src||delete a.logo,this.param=a},toggleBase64:function(){this.wantBase64?this.param.logo.src=this.logoBase64:this.param.logo.src=this.logoFileName},closeModal:function(){this.$modal.hide("export-dialog")}}}),K=W,Q=(s("0422"),Object(p["a"])(K,G,X,!1,null,"21ecef1e",null)),Z=Q.exports,tt=s("fb19"),et=s.n(tt),st=s("1157"),at=s.n(st),it=(s("69be"),{name:"LoaderView",data:function(){return{activeTab:"general",progress:0,selected_lang:"fr",logoFileName:null,Dfds:[],isLoaded:!1,bubbleProgress:0,startingProgress:0,editorMinimized:!1,param:{progressColor:"#2299DD",playAnimation:!0,showBubbles:!0,bubbles:{fr:[]},logo:{src:null,style:{}}},isEditorActive:!0,showLoadImgError:!1}},components:{ImportParam:Y,exportParam:Z,vueTopprogress:r["vueTopprogress"],LoginBubble:h,bubbleEdit:z,VueDraggableResizable:et.a,importParam:Y,draggable:E.a,styleEditor:$},computed:{bubbles:function(){return this.param.bubbles[this.selected_lang]},availbleLangs:function(){var t=this,e=["fr","en","de","es","cz","pl"],s=[];return e.forEach((function(e){s.push({label:e,bubbleCount:t.bubbleCount(e)})})),s.sort((function(t,e){return e.bubbleCount-t.bubbleCount}))}},methods:{bubbleCount:function(t){return this.param.bubbles[t]?this.param.bubbles[t].length:0},openTab:function(t){this.activeTab=t,this.isEditorActive=!0},onFileChange:function(t){var e=this,s=t.target.files[0];if(s){var a=new FileReader;a.onloadend=function(){e.logoFileName=s.name,e.param.logo.src=a.result,e.param.logo.name=s.name},a.readAsDataURL(s)}},errorLoadingImage:function(){this.showLoadImgError=!0,this.activeTab="logo",this.isEditorActive=!0},logoLoaded:function(){this.showLoadImgError=!1},importedParam:function(t){Object.keys(t.bubbles).length||(t.bubbles.fr=[]),t.logo&&t.logo.src&&(this.logoFileName=null),this.selected_lang=Object.keys(t.bubbles)[0],this.param=t,this.$modal.hide("import-dialog"),this.simulateLoading()},openImportModal:function(){this.$modal.show("import-dialog")},openExportModal:function(){this.$modal.show("export-dialog",this.param)},deleteBubble:function(t){this.bubbles.splice(t,1)},onEditorActivated:function(){this.editorMinimized&&this.minimizeEditor()},onEditorDeactivated:function(){this.editorMinimized||this.minimizeEditor()},minimizeEditor:function(){this.editorMinimized=!this.editorMinimized},showProgress:function(t){this.progress=Math.floor(t),this.param.showBubbles&&this.showBubble()},showBubble:function(){var t=Math.floor((this.startingProgress-(100-this.progress))/this.bubbleProgress);if(!(t>=this.bubbles.length))for(var e=0;e<=t+1;e++)this.bubbles[e]&&!this.bubbles[e].opacity&&(this.bubbles[e].opacity=100)},createLang:function(t){console.log("created lang:",t),this.$set(this.param.bubbles,t,[])},langToCountry:function(t){switch(t){case"en":return"gb";default:return t}},addBubble:function(){this.bubbles.push({content:[],style:{},opacity:100})},createNeededBubbles:function(){console.log("(3 - this.bubbles.length)",3-this.bubbles.length);for(var t=3-this.bubbles.length,e=0;e<t;e++)console.log("HHEREE",e),this.addBubble()},loadBubbles:function(){this.startingProgress=100-this.progress,this.bubbleProgress=this.startingProgress/this.bubbles.length},init:function(){"true"!=sessionStorage.getItem("hideMenu")&&(at()(".srhLoaderLogo").addClass("ready"),this.$refs.topProgress.start())},increaseProgress:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;"string"!==typeof t&&this.$refs.topProgress.increase(t)},newStep:function(t,e,s){console.log("Loading Step Message:",s),"true"!=sessionStorage.getItem("hideMenu")&&(this.Dfds.push(e),at.a.when(e).done(this.increaseProgress(t)))},loaded:function(){var t=this;this.increaseProgress(10),at.a.when.apply(at.a,this.Dfds).done((function(){t.$refs.topProgress.done(),t.isLoaded=!0}))},computeBullFontSize:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:150,e=.004*t;return"calc(".concat(e,"vw + ").concat(e,"vh)")},languageChanged:function(){this.selected_lang&&!this.param.bubbles[this.selected_lang]&&this.createLang(this.selected_lang),this.simulateLoading()},simulateLoading:function(){var t=this;console.log("simulateLoading"),this.bubbles.forEach((function(t){delete t.opacity})),this.init(),setTimeout((function(){t.loadBubbles()}),1e3),setTimeout((function(){t.newStep(20,(new at.a.Deferred).resolve(),"test")}),3e3),setTimeout((function(){t.newStep(20,(new at.a.Deferred).resolve(),"test")}),5e3),setTimeout((function(){t.loaded()}),7e3)}},mounted:function(){var t=this;this.loadBubbles(),this.$watch((function(){if(t.$refs.topProgress)return t.$refs.topProgress.progress}),(function(e){t.showProgress(e)})),this.simulateLoading()}}),nt=it,lt=(s("be8f"),Object(p["a"])(nt,l,o,!1,null,"322635c4",null)),ot=lt.exports,rt={name:"App",components:{Loader:ot}},ct=rt,ut=(s("034f"),Object(p["a"])(ct,i,n,!1,null,null,null)),bt=ut.exports,dt=s("1881"),pt=s.n(dt),mt=s("1dce"),ht=s.n(mt),gt=s("4a7a"),ft=s.n(gt);s("278f"),s("ac66"),s("4436"),s("6672"),s("6dfc");a["default"].use(ht.a),a["default"].use(pt.a,{dialog:!0,dynamicDefaults:{draggable:!0}}),a["default"].config.productionTip=!1,a["default"].component("v-select",ft.a),new a["default"]({render:function(t){return t(bt)}}).$mount("#app")},"5d33":function(t,e,s){"use strict";s("90b2")},"616b":function(t,e,s){},6672:function(t,e,s){},"66b0":function(t,e,s){"use strict";s("616b")},7514:function(t,e,s){},"780b":function(t,e,s){},"7b6a":function(t,e,s){},"85ec":function(t,e,s){},"90b2":function(t,e,s){},ac66:function(t,e,s){},be8f:function(t,e,s){"use strict";s("7514")},e72b:function(t,e,s){"use strict";s("21a3")},ff1f:function(t,e,s){"use strict";s("7b6a")}});
//# sourceMappingURL=app.f98dd4bc.js.map