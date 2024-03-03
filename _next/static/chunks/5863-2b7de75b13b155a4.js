"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5863],{62323:function(e,t,r){r.d(t,{H:function(){return u}});var o=r(83152),c=r(66662),n=r(84941),a=r(66150),i=r(27739),l=r(58010);let u=(0,c.forwardRef)((e,t)=>{var r;let{token:c,transformValue:u,type:d,...h}=e,{getToken:s}=(0,i.a$)(),{formatComputedValue:f,formatTokenValue:b,useTokenInput:m}=(0,l.BG)();return(0,o.jsxs)(n.R,{type:d,...h,...m({token:c,transformValue:u}),ref:t,children:[(null===(r=s(c))||void 0===r?void 0:r.isColor)&&(0,o.jsx)(a.B6,{color:f(c)}),"range"===d&&(0,o.jsx)("div",{children:(0,o.jsx)(a.EK,{children:b(c)||""})})]})});u.displayName="FormFieldDesignToken"},84941:function(e,t,r){r.d(t,{R:function(){return i}});var o=r(83152),c=r(66150),n=r(98370),a=r(66662);let i=(0,a.forwardRef)((e,t)=>{let{name:r,invalid:i,disabled:l,label:u,errorMessage:d,description:h,readOnly:s,status:f,autoComplete:b,list:m,min:g,max:p,step:k,placeholder:x,pattern:y,required:S,type:P,value:v,onChange:C,onInput:T,onFocus:w,onBlur:F,defaultValue:j,size:V,children:O,...z}=e,B=(0,a.useId)(),I=(0,a.useId)(),M=(0,a.useId)(),R=(0,a.useId)();return(0,o.jsxs)(c.Wi,{invalid:i,...z,children:[(0,o.jsx)(c.lX,{className:"voorbeeld-form-label",htmlFor:B,children:u}),h&&(0,o.jsx)(c.ue,{id:I,children:h}),i&&d&&(0,o.jsx)(c.w7,{className:"voorbeeld-form-field__error-message",id:R,children:d}),(0,o.jsx)(c.fE,{ref:t,id:B,name:r,className:"voorbeeld-form-field__input",type:P||"text",autoComplete:b,"aria-describedby":(0,n.Z)({[I]:h,[R]:i,[M]:f})||void 0,invalid:i,dir:"auto",disabled:l,min:"number"==typeof g?String(g):"string"==typeof g?g:void 0,max:"number"==typeof p?String(p):"string"==typeof p?p:void 0,pattern:y,placeholder:x,readOnly:s,"aria-required":S,value:v,onFocus:w,onBlur:F,onInput:T,onChange:C,defaultValue:j,list:m,size:V,step:k}),f&&(0,o.jsx)("div",{className:"voorbeeld-form-field__status",id:M,children:(0,o.jsx)("div",{className:"voorbeeld-form-field-description voorbeeld-form-field-description--status",children:f})}),O]})});i.displayName="FormFieldTextbox"},58010:function(e,t,r){r.d(t,{BG:function(){return a},Wc:function(){return n},cV:function(){return initCustomTokenContext}});var o=r(66662),c=r(94358);let[n,a]=(0,c.I)({name:"CustomToken"}),initCustomTokenContext=e=>{let{tokens:t,tokenMap:r}=e,[c,n]=(0,o.useState)({...t}),getTokenValue=e=>Object.prototype.hasOwnProperty.call(c,e)?c[e]:void 0,getComputedValue=e=>Object.prototype.hasOwnProperty.call(c,e)?c[e]:Object.prototype.hasOwnProperty.call(r,e)?r[e].value:void 0,setTokenValue=(e,t)=>n({...c,[e]:t}),format=e=>void 0==e?"":String(e),formatComputedValue=e=>format(getComputedValue(e));return{tokenMap:c,getTokenValue,getComputedValue,useTokenInput:e=>{let{token:t,transformValue:o}=e,c=Object.prototype.hasOwnProperty.call(r,t)?r[t]:void 0;return{defaultValue:formatComputedValue(t),onInput:e=>{let r=e.target;if(r){let e=r.value;o&&(e=o(e)),setTokenValue(t,e)}},list:c&&["color","border-color","background-color"].includes(c.path[c.path.length-1])?"color-tokens":c&&"font-family"==c.path[c.path.length-1]?"font-family-values":void 0}},formatTokenValue:e=>format(getTokenValue(e)),formatComputedValue,reset:()=>n({})}}},95601:function(e,t,r){r.d(t,{AP:function(){return a},Ey:function(){return n},T:function(){return initStudioContext}});var o=r(66662),c=r(94358);let[n,a]=(0,c.I)({name:"StudioContext"}),initStudioContext=()=>{let[e,t]=(0,o.useState)({});return{pinned:e,setPinned:t,togglePinned:r=>{let o;let c=Object.prototype.hasOwnProperty.call(e,r);c?(o={...e},delete o[r]):o={...e,[r]:!e[r]},t(o)}}}},27739:function(e,t,r){r.d(t,{a$:function(){return a},dS:function(){return n},i1:function(){return initTokenDataContext}});var o=r(94358),c=r(50070);let[n,a]=(0,o.I)({name:"TokenData"}),initTokenDataContext=e=>{let{tokens:t}=e,r=t.map(c.FQ),o=(0,c.Dz)(r),tokenExists=e=>Object.prototype.hasOwnProperty.call(o,e);return{tokens:r,tokenMap:o,getToken:e=>tokenExists(e)?o[e]:void 0,tokenExists}}},94358:function(e,t,r){r.d(t,{I:function(){return createStrictContext}});var o=r(66662);function createStrictContext(e){let{errorMessage:t,name:r}=e,c=(0,o.createContext)(void 0);return c.displayName=r,[c.Provider,function(){let e=(0,o.useContext)(c);if(!e)throw Error(t||"".concat(r||""," Context Provider is missing"));return e}]}},50070:function(e,t,r){r.d(t,{Dz:function(){return createDesignTokenMap},FQ:function(){return addTokenInfo},Kk:function(){return getSearchParamTokens},Lb:function(){return designTokensMapToCssVariables},OW:function(){return createResetCssVariables},Vl:function(){return d},Wp:function(){return c},Xv:function(){return u},aT:function(){return getComponentTokens},iW:function(){return i},jX:function(){return a},o_:function(){return createFontSizeScaleTokens},wx:function(){return h}}),r(66662);var o=r(64729);let c=o,n={type:"",value:"",filePath:"",name:"",original:{},isSource:!1,attributes:{category:""},path:[]},a=[{...n,path:["voorbeeld","decoration","background-color"],attributes:{category:"voorbeeld"}},{...n,path:["voorbeeld","decoration","color"]}],tokenRef=e=>e.path.join("."),createDesignTokenMap=e=>e.reduce((e,t)=>({...e,[tokenRef(t)]:t}),{}),i=[{exponent:1.067,label:"Minor second"},{exponent:1.125,label:"Major second"},{exponent:1.2,label:"Minor third"},{exponent:1.25,label:"Major third"},{exponent:1.333,label:"Perfect fourth"},{exponent:1.444,label:"Augmented fourth"},{exponent:1.5,label:"Perfect fifth"},{exponent:1.618,label:"Golden Ratio"}],l=c.reduce((e,t)=>(t.$extensions&&Array.isArray(t.$extensions["nl.nldesignsystem.fallback"])&&(e[tokenRef(t)]=t.$extensions["nl.nldesignsystem.fallback"][0]),e),{}),u={...l,"denhaag.sidenav.link.font-family":"utrecht.document.font-family","todo.avatar.text.font-family":"utrecht.document.font-family","todo.breadcrumb.font-family":"utrecht.document.font-family","todo.data-list.font-family":"utrecht.document.font-family","todo.form-field-label.font-family":"utrecht.document.font-family","todo.form-field-option-label.font-family":"utrecht.document.font-family","todo.form-field-option.label.font-family":"utrecht.document.font-family","todo.modal-dialog.header.label.font-family":"utrecht.document.font-family","todo.modal-dialog.header-label.font-family":"utrecht.document.font-family","todo.pagination.font-family":"utrecht.document.font-family","todo.task-list.font-family":"utrecht.document.font-family","utrecht.accordion.button.font-family":"utrecht.document.font-family","utrecht.alert.heading.font-family":"utrecht.document.font-family","utrecht.blockquote.content.font-family":"utrecht.document.font-family","utrecht.blockquote.attribution.font-family":"utrecht.document.font-family","utrecht.counter-badge.font-family":"utrecht.document.font-family","utrecht.drawer.header.label.font-family":"utrecht.document.font-family","utrecht.drawer.header-label.font-family":"utrecht.document.font-family","utrecht.paragraph-small-print.font-family":"utrecht.document.font-family","utrecht.paragraph-lead.font-family":"utrecht.document.font-family","utrecht.select.font-family":"utrecht.document.font-family","utrecht.table.footer-cell.font-family":"utrecht.document.font-family","utrecht.table.data-cell.font-family":"utrecht.document.font-family","utrecht.table.caption.font-family":"utrecht.document.font-family","utrecht.table.header-cell.font-family":"utrecht.document.font-family","utrecht.accordion.button.color":"utrecht.interaction.color","utrecht.accordion.button.expanded.color":"utrecht.interaction.color","utrecht.link.text-decoration.color":"utrecht.interaction.color","utrecht.radio.checked.background-color":"utrecht.interaction.color","denhaag.sidenav.link.color":"utrecht.interaction.color","todo.breadcrumb.link.color":"utrecht.interaction.color","todo.pagination.page-link.color":"utrecht.interaction.color","todo.pagination.relative.link.color":"utrecht.interaction.color","utrecht.focus.outline.color":"utrecht.interaction.color","utrecht.form-control.accent-color":"utrecht.interaction.color","utrecht.link.text-decoration-color":"utrecht.link.color","todo.avatar.background-color":"voorbeeld.decoration.background-color"},createFontSizeScaleTokens=e=>Array(10).fill(0).map((t,r)=>({["--frameless-font-scale-".concat(r+1,"-number")]:Math.pow(e,r+1),["--frameless-font-scale-".concat(r+1,"-font-size")]:"calc(var(--frameless-font-minimum-font-size, 1rem) * ".concat(Math.pow(e,r+1),")")})).reduce((e,t)=>({...e,...t}),{}),toCustomProperty=e=>"--".concat(e.replace(/\./g,"-")),getFallbackToken=e=>Array.isArray(e)?e[e.length-1]:e,createResetCssVariables=(e,t)=>Object.entries(t).filter(t=>{let[r,o]=t,c=getFallbackToken(o);return e[r]&&e[c]&&e[r].value===e[c].value}).reduce((e,t)=>{let[r,o]=t;return{...e,[toCustomProperty(r)]:"var(".concat(toCustomProperty(getFallbackToken(o)),")")}},{}),designTokensMapToCssVariables=e=>Object.entries(e).reduce((e,t)=>{let[r,o]=t;return{...e,[toCustomProperty(r)]:o}},{}),d=["Arial","Helvetica","Verdana","Times New Roman","Fira Sans","Open Sans","IBM Plex Serif","Roboto Serif","Comic Sans MS","Source Sans Pro","Source Serif Pro","Work Sans"],getSearchParamTokens=(e,t)=>Array.from(e||[]).filter(e=>{let[r]=e;return t(r)}).reduce((e,t)=>{let[r,o]=t;return{...e,[r]:o}},{}),addTokenInfo=e=>({...e,isColor:["color","accent-color","border-color","text-decoration-color","background-color","border-block-color","border-block-end-color","border-block-start-color","border-bottom-color","border-color","border-inline-color","border-inline-end-color","border-inline-start-color","border-left-color","border-right-color","border-top-color","outline-color"].includes(e.path[e.path.length-1]),isFontFamily:e&&"font-family"==e.path[e.path.length-1],isLineHeight:e&&"line-height"==e.path[e.path.length-1],isFontWeight:e&&"font-weight"==e.path[e.path.length-1],isFontSize:e&&"font-size"==e.path[e.path.length-1],isLetterSpacing:e&&"letter-spacing"==e.path[e.path.length-1],isBorderRadius:["border-bottom-left-radius","border-bottom-right-radius","border-end-end-radius","border-end-start-radius","border-radius","border-start-end-radius","border-start-start-radius","border-top-left-radius","border-top-right-radius"].includes(e.path[e.path.length-1]),isBorderStyle:["outline-style","border-block-end-style","border-block-start-style","border-block-style","border-bottom-style","border-inline-end-style","border-inline-start-style","border-inline-style","border-left-style","border-right-style","border-style","border-top-style"].includes(e.path[e.path.length-1]),isBorderWidth:["border-block-end-width","border-block-start-width","border-block-width","border-bottom-width","border-image-width","border-inline-end-width","border-inline-start-width","border-inline-width","border-left-width","border-right-width","border-top-width","border-width"].includes(e.path[e.path.length-1]),isPadding:["padding","padding-left","padding-right","padding-top","padding-bottom","padding-inline","padding-block","padding-inline-start","padding-inline-end","padding-block-start","padding-block-end"].includes(e.path[e.path.length-1]),isMargin:["margin","margin-left","margin-right","margin-top","margin-bottom","margin-inline","margin-block","margin-inline-start","margin-inline-end","margin-block-start","margin-block-end"].includes(e.path[e.path.length-1]),isSpace:["gap","column-gap","row-gap"].includes(e.path[e.path.length-1]),isSize:["width","height","inline-size","block-size","min-block-size","min-inline-size","min-height","min-width","max-block-size","max-inline-size","max-height","max-width","size"].includes(e.path[e.path.length-1])}),h=[{label:"Accordion",id:"utrecht-accordion",cssSelector:".utrecht-accordion, utrecht-accordion",tokenPrefix:"utrecht.accordion"},{label:"Alert",id:"utrecht-alert",cssSelector:".utrecht-alert, utrecht-alert",tokenPrefix:"utrecht.alert"},{label:"Alert dialog",id:"utrecht-alert-dialog",cssSelector:".utrecht-alert-dialog, utrecht-alert-dialog",tokenPrefix:"utrecht.alert-dialog"},{label:"Article",id:"utrecht-article",cssSelector:".utrecht-article, utrecht-article",tokenPrefix:"utrecht.article"},{label:"Backdrop",id:"utrecht-backdrop",cssSelector:".utrecht-backdrop, utrecht-backdrop",tokenPrefix:"utrecht.backdrop"},{label:"Badge counter",id:"utrecht-badge-counter",cssSelector:".utrecht-badge-counter, utrecht-badge-counter",tokenPrefix:"utrecht.badge-counter"},{label:"Badge data",id:"utrecht-badge-data",cssSelector:".utrecht-badge-data, utrecht-badge-data",tokenPrefix:"utrecht.badge-data"},{label:"Badge status",id:"utrecht-badge-status",cssSelector:".utrecht-badge-status, utrecht-badge-status",tokenPrefix:"utrecht.badge-status"},{label:"Blockquote",id:"utrecht-blockquote",cssSelector:".utrecht-blockquote, utrecht-badge-counter",tokenPrefix:"utrecht.blockquote"},{label:"Breadcrumb navigation",id:"utrecht-breadcrumb-nav",cssSelector:".utrecht-breadcrumb-nav, utrecht-breadcrumb-nav",tokenPrefix:"utrecht.breadcrumb-nav"},{label:"Button",id:"utrecht-button",cssSelector:".utrecht-button, utrecht-button",tokenPrefix:"utrecht.button"},{label:"Button group",id:"utrecht-button-group",cssSelector:".utrecht-button-group, utrecht-button-group",tokenPrefix:"utrecht.button-group"},{label:"Checkbox",id:"utrecht-checkbox",cssSelector:".utrecht-checkbox, utrecht-checkbox",tokenPrefix:"utrecht.checkbox"},{label:"Code block",id:"utrecht-code-block",cssSelector:".utrecht-code-block, utrecht-code-block",tokenPrefix:"utrecht.code-block"},{label:"Code",id:"utrecht-code",cssSelector:".utrecht-code, utrecht-code",tokenPrefix:"utrecht.code"},{label:"Color sample",id:"utrecht-color-sample",cssSelector:".utrecht-color-sample, utrecht-color-sample",tokenPrefix:"utrecht.color-sample"},{label:"Data list",id:"utrecht-data-list",cssSelector:".utrecht-data-list, utrecht-data-list",tokenPrefix:"utrecht.data-list"},{label:"Document",id:"utrecht-document",cssSelector:".utrecht-document, utrecht-document",tokenPrefix:"utrecht.document"},{label:"Drawer",id:"utrecht-drawer",cssSelector:".utrecht-drawer, utrecht-drawer",tokenPrefix:"utrecht.drawer"},{label:"Emphasis",id:"utrecht-emphasis",cssSelector:".utrecht-emphasis, utrecht-emphasis",tokenPrefix:"utrecht.emphasis"},{label:"Figure",id:"utrecht-figure",cssSelector:".utrecht-figure, utrecht-figure",tokenPrefix:"utrecht.figure"},{label:"Form field",id:"utrecht-form-field",cssSelector:".utrecht-form-field, utrecht-form-field",tokenPrefix:"utrecht.form-field"},{label:"Form field description",id:"utrecht-form-field-description",cssSelector:".utrecht-form-field-description, utrecht-form-field-description",tokenPrefix:"utrecht.form-field-description"},{label:"Form field error message",id:"utrecht-form-field-error-message",cssSelector:".utrecht-form-field-error-message, utrecht-form-field-error-message",tokenPrefix:"utrecht.form-field-error-message"},{label:"Fieldset",id:"utrecht-fieldset",cssSelector:".utrecht-fieldset, utrecht-fieldset",tokenPrefix:"utrecht.fieldset"},{label:"Form label",id:"utrecht-form-label",cssSelector:".utrecht-form-label, utrecht-form-label",tokenPrefix:"utrecht.form-label"},{label:"Heading 1",id:"utrecht-heading-1",cssSelector:".utrecht-heading-1, utrecht-heading-1",tokenPrefix:"utrecht.heading-1"},{label:"Heading 2",id:"utrecht-heading-2",cssSelector:".utrecht-heading-2, utrecht-heading-2",tokenPrefix:"utrecht.heading-2"},{label:"Heading 3",id:"utrecht-heading-3",cssSelector:".utrecht-heading-3, utrecht-heading-3",tokenPrefix:"utrecht.heading-3"},{label:"Heading 4",id:"utrecht-heading-4",cssSelector:".utrecht-heading-4, utrecht-heading-4",tokenPrefix:"utrecht.heading-4"},{label:"Heading 5",id:"utrecht-heading-5",cssSelector:".utrecht-heading-5, utrecht-heading-5",tokenPrefix:"utrecht.heading-5"},{label:"Heading 6",id:"utrecht-heading-6",cssSelector:".utrecht-heading-6, utrecht-heading-6",tokenPrefix:"utrecht.heading-6"},{label:"Link",id:"utrecht-link",cssSelector:".utrecht-link, utrecht-link",tokenPrefix:"utrecht.link"},{label:"Heading group",id:"utrecht-heading-group",cssSelector:".utrecht-heading-group, utrecht-heading-group",tokenPrefix:"utrecht.heading-group"},{label:"Icon",id:"utrecht-icon",cssSelector:".utrecht-icon, utrecht-icon",tokenPrefix:"utrecht.icon"},{label:"Image",id:"utrecht-img",cssSelector:".utrecht-img, utrecht-img",tokenPrefix:"utrecht.img"},{label:"Link list",id:"utrecht-link-list",cssSelector:".utrecht-link-list, utrecht-link-list",tokenPrefix:"utrecht.link-list"},{label:"Logo",id:"utrecht-logo",cssSelector:".utrecht-logo, utrecht-logo",tokenPrefix:"utrecht.logo"},{label:"Mark",id:"utrecht-mark",cssSelector:".utrecht-mark, utrecht-mark",tokenPrefix:"utrecht.mark"},{label:"Ordered list",id:"utrecht-ordered-list",cssSelector:".utrecht-ordered-list, utrecht-ordered-list",tokenPrefix:"utrecht.ordered-list"},{label:"Page header",id:"utrecht-page-header",cssSelector:".utrecht-page-header, utrecht-page-header",tokenPrefix:"utrecht.page-header"},{label:"Page footer",id:"utrecht-page-footer",cssSelector:".utrecht-page-footer, utrecht-page-footer",tokenPrefix:"utrecht.page-footer"},{label:"Pagination",id:"utrecht-pagination",cssSelector:".utrecht-pagination, utrecht-pagination",tokenPrefix:"utrecht.pagination"},{label:"Paragraph",id:"utrecht-paragraph",cssSelector:".utrecht-paragraph, utrecht-paragraph",tokenPrefix:"utrecht.paragraph"},{label:"Pre-heading",id:"utrecht-pre-heading",cssSelector:".utrecht-pre-heading, utrecht-pre-heading",tokenPrefix:"utrecht.pre-heading"},{label:"Preserve data",id:"utrecht-preserve-data",cssSelector:".utrecht-preserve-data, utrecht-preserve-data"},{label:"Radio button",id:"utrecht-radio-button",cssSelector:".utrecht-radio-button, utrecht-radio-button",tokenPrefix:"utrecht.radio-button"},{label:"Select",id:"utrecht-select",cssSelector:".utrecht-select, utrecht-select",tokenPrefix:"utrecht.select"},{label:"Separator",id:"utrecht-separator",cssSelector:".utrecht-separator, utrecht-separator",tokenPrefix:"utrecht.separator"},{label:"Skip link",id:"utrecht-skip-link",cssSelector:".utrecht-skip-link, utrecht-skip-link",tokenPrefix:"utrecht.skip-link"},{label:"Spotlight section",id:"utrecht-spotlight-section",cssSelector:".utrecht-spotlight-section, utrecht-spotlight-section",tokenPrefix:"utrecht.spotlight-section"},{label:"Surface",id:"utrecht-surface",cssSelector:".utrecht-surface, utrecht-surface",tokenPrefix:"utrecht.surface"},{label:"Table",id:"utrecht-table",cssSelector:".utrecht-table, utrecht-table",tokenPrefix:"utrecht.table"},{label:"Textarea",id:"utrecht-textarea",cssSelector:".utrecht-textarea, utrecht-textarea",tokenPrefix:"utrecht.textarea"},{label:"Textbox",id:"utrecht-textbox",cssSelector:".utrecht-textbox, utrecht-textbox",tokenPrefix:"utrecht.textbox"},{label:"Toptask link",id:"utrecht-toptask-link",cssSelector:".utrecht-toptask-link, utrecht-toptask-link",tokenPrefix:"utrecht.toptask-link"},{label:"Toptask navigation",id:"utrecht-toptask-nav",cssSelector:".utrecht-toptask-nav, utrecht-toptask-nav",tokenPrefix:"utrecht.toptask-nav"},{label:"Unordered list",id:"utrecht-unordered-list",cssSelector:".utrecht-unordered-list, utrecht-unordered-list",tokenPrefix:"utrecht.unordered-list"}],getComponentTokens=(e,t,r)=>{let o=t.find(t=>{let{id:r}=t;return r===e});if(o){let e=(o.tokenPrefix||"").split(".");if(e.length>=1&&o)return r.filter(t=>{let{path:r}=t;return e.every((e,t)=>r[t]===e)})}return[]}}}]);