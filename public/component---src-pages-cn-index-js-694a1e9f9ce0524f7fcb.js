webpackJsonp([73016250221158],{61:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDcuNCA0MDcuNCI+CiAgPHBhdGggZD0iTTExMi44IDBMOTEuNiAyMS4ybDE4MS45IDE4Mi41TDkxLjYgMzg2LjNsMjEuMiAyMS4yIDIwMy4xLTIwMy43TDExMi44IDB6IiBmaWxsPSIjNzA5Y2YwIi8+Cjwvc3ZnPgo="},23:function(e,t){"use strict";e.exports={$white:"rgba(255, 255, 255, 0.8)",$overlayColor:"rgba(255, 255, 255, 0.1)",$gray100:"#f8f9fa",$gray200:"#ebebeb",$gray300:"#dee2e6",$gray400:"#ced4da",$gray500:"#adb5bd",$gray600:"#999",$gray700:"#444",$gray800:"#303030",$gray900:"#222",$black:"#000",$teal:"#1fc1c3",$blue:"#1fc1c3",$indigo:"#6610f2",$purple:"#709cf0",$pink:"#e83e8c",$red:"#eb2256",$orange:"#fd7e14",$yellow:"#f0ad4e",$green:"#2cbb69",$cyan:"rgb(89, 185, 216)",$primary:"#1fc1c3",$secondary:"#709cf0",$success:"#2cbb69",$info:"rgb(89, 185, 216)",$warning:"#f0ad4e",$danger:"#eb2256",$light:"#303030",$dark:"#121326"}},47:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){return e.raw=t,e}t.__esModule=!0;var c=l(["\n  .nav-collapse {\n    transition: max-height 0.3s ease-out;\n    overflow: hidden;\n    margin-bottom: 0.25rem;\n  }\n  .nav-collapse.closed {\n    max-height:0 !important;\n  }\n  .nav-collapse.active {\n    max-height: auto;\n  }\n  h4 {\n    cursor: pointer;\n    margin: 0 0 0.25rem 0;\n    position: relative;\n    &:after {\n      transition: all 0.25s ease-out;\n      content: none;\n      background: url(",") no-repeat 100% 25%;\n      position: absolute;\n      top: 0.2rem;\n      right: -15px;\n      height: 12px;\n      width: 12px;\n    }\n  }\n  h4.open {\n    &:after {\n      transform: rotate(90deg);\n    }\n  }\n"],["\n  .nav-collapse {\n    transition: max-height 0.3s ease-out;\n    overflow: hidden;\n    margin-bottom: 0.25rem;\n  }\n  .nav-collapse.closed {\n    max-height:0 !important;\n  }\n  .nav-collapse.active {\n    max-height: auto;\n  }\n  h4 {\n    cursor: pointer;\n    margin: 0 0 0.25rem 0;\n    position: relative;\n    &:after {\n      transition: all 0.25s ease-out;\n      content: none;\n      background: url(",") no-repeat 100% 25%;\n      position: absolute;\n      top: 0.2rem;\n      right: -15px;\n      height: 12px;\n      width: 12px;\n    }\n  }\n  h4.open {\n    &:after {\n      transform: rotate(90deg);\n    }\n  }\n"]),s=l(["\n  &.active {\n    border-right: 2px solid ","\n  }\n  a {\n    color: ",";\n    &:hover {\n      color: ",";\n    }\n    span {\n      margin:0.1rem 0 0.1rem 0.5rem;\n      display:inline-block;\n    }\n  }\n"],["\n  &.active {\n    border-right: 2px solid ","\n  }\n  a {\n    color: ",";\n    &:hover {\n      color: ",";\n    }\n    span {\n      margin:0.1rem 0 0.1rem 0.5rem;\n      display:inline-block;\n    }\n  }\n"]),u=n(3),d=o(u),p=n(29),f=n(40),m=o(f),g=n(14),h=o(g),v=n(11),y=n(64),b=n(23),w=o(b),k=n(61),x=o(k),E="",$=h.default.div(c,x.default),M=h.default.li(s,w.default.$purple,w.default.$white,w.default.$white),S=function(e){function t(n){a(this,t);var o=r(this,e.call(this,n));return o.state={toggleOpen:!0},o.handleDropdown=o.handleDropdown.bind(o),o.handleLinkChange=o.handleLinkChange.bind(o),o.activeSideNavStates=o.activeSideNavStates.bind(o),o.removeDashes=o.removeDashes.bind(o),o.addActiveClass=o.addActiveClass.bind(o),o.navigate=o.navigate.bind(o),o}return i(t,e),t.prototype.handleDropdown=function(){this.setState(function(e){return{toggleOpen:!e.toggleOpen}})},t.prototype.handleLinkChange=function(){},t.prototype.setHeight=function(e){return this.myNavWrap.style.maxHeight=e+"px"},t.prototype.removeDashes=function(e){return e.replace("-"," ")},t.prototype.addActiveClass=function(e,t){(0,m.default)(e).addClass(t)},t.prototype.activeSideNavStates=function(){var e=this,t=(0,y.cleanPath)(location.pathname);return(0,m.default)(".cd-sidebar ul li").each(function(n,o){t=e.removeDashes(t).toLowerCase(),(0,m.default)(o).text().toLowerCase()===t&&e.addActiveClass(o,"active")})},t.prototype.navigate=function(e,t){e.preventDefault(),(0,p.navigateTo)(t)},t.prototype.componentDidMount=function(){var e=this;setTimeout(function(){e.activeSideNavStates()},50)},t.prototype.componentDidUpdate=function(){E=this.myNav.offsetHeight,this.setHeight(E)},t.prototype.render=function(){var e=this,t=this.props,n=t.postList;return d.default.createElement("div",null,d.default.createElement($,{className:"collapse-nav-component"},d.default.createElement("h4",{onClick:this.handleDropdown,className:"mob-text-center navLink "+(this.state.toggleOpen?"open":"closed")},t.section),d.default.createElement("div",{className:"nav-collapse open",ref:function(t){return e.myNavWrap=t}},d.default.createElement("ul",{className:"list-group list-unstyled",id:t.id,ref:function(t){return e.myNav=t}},n.edges.map(function(n,o){return n.node.frontmatter.language===v.language&&"docs"===n.node.frontmatter.label&&n.node.frontmatter.group===t.group&&d.default.createElement(M,{className:"mob-text-center",key:n.node.id,style:{listStyleType:"none"},ref:function(t){return e.myLi=t}},d.default.createElement("a",{href:"/",onClick:function(t){return e.navigate(t,n.node.frontmatter.path)},role:"link",key:n.node.id},d.default.createElement("span",null,n.node.frontmatter.doc_title)))})))))},t}(d.default.Component);t.default=S,e.exports=t.default},48:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){return e.raw=t,e}t.__esModule=!0;var c=l(["\n  &.stickyNav {\n    position: -webkit-sticky;\n    position: sticky;\n    top:0;\n  }\n"],["\n  &.stickyNav {\n    position: -webkit-sticky;\n    position: sticky;\n    top:0;\n  }\n"]),s=n(3),u=o(s),d=n(14),p=o(d),f=n(47),m=o(f),g=n(11),h=0,v=!1,y=p.default.div(c),b=function(e){function t(n){a(this,t);var o=r(this,e.call(this,n));return o.handleScroll=o.handleScroll.bind(o),o.navScrollPosition=o.navScrollPosition.bind(o),o}return i(t,e),t.prototype.navScrollPosition=function(e){e>670?document.querySelector(".navWrap").classList.add("stickyNav"):document.querySelector(".navWrap").classList.remove("stickyNav")},t.prototype.handleScroll=function(){var e=this;h=window.scrollY,v||(window.requestAnimationFrame(function(){e.navScrollPosition(h),v=!v}),v=!v)},t.prototype.componentDidMount=function(){window.addEventListener("scroll",this.handleScroll)},t.prototype.componentWillUnmount=function(){window.removeEventListener("scroll",this.handleScroll)},t.prototype.render=function(){var e=this.props,t=e.postList;return u.default.createElement(y,{className:"navWrap"},u.default.createElement(m.default,{postList:t,section:"en"===g.language?"Introduction":"介绍",group:"base",active:!0}),u.default.createElement(m.default,{postList:t,section:"en"===g.language?"Cardano":"卡尔达诺概述",group:"cardano"}),u.default.createElement(m.default,{postList:t,section:"en"===g.language?"Timeline":"Cardano 时间线",group:"timeline"}),u.default.createElement(m.default,{postList:t,section:"en"===g.language?"Technical":"技术细节",group:"technical"}),u.default.createElement(m.default,{postList:t,section:"en"===g.language?"For Contributors":"对于贡献者",group:"for-contributors"}))},t}(u.default.Component);t.default=b,e.exports=t.default},239:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.pageQuery=void 0;var a=n(3),r=o(a),i=n(77),l=(o(i),n(48)),c=o(l),s=n(11),u=function(e){var t=e.data,n=t.allMarkdownRemark;return r.default.createElement("div",{className:"row"},r.default.createElement("div",{className:"col-sm-6 cd-sidebar"},r.default.createElement(c.default,{postList:n})),r.default.createElement("div",{className:"col-sm-18 doc-content"},t.allMarkdownRemark.edges.map(function(e,t){var n=e.node.frontmatter;if("intro"===n.keywords&&n.language===s.language)return r.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e.node.html}})})))};t.pageQuery="** extracted graphql fragment **";t.default=u}});
//# sourceMappingURL=component---src-pages-cn-index-js-694a1e9f9ce0524f7fcb.js.map