webpackJsonp([1135276415346],{23:function(e,t,a){"use strict";function n(){var e=["en","cn"],t="en",a=(0,d.getPathParts)()[0];return e.includes(a)?a:void("undefined"!=typeof window&&(0,d.updateUrl)("/"+t+window.location.path))}function l(e){if(e!==o){var t=(0,d.getPathParts)();t.splice(0,1,e),(0,d.updateUrl)("/"+t.join("/"))}}t.__esModule=!0,t.language=void 0,t.updateLanguage=l;var d=a(26),o=t.language=n()},26:function(e,t){"use strict";function a(){return"undefined"!=typeof window?window.location.pathname.replace(/^\//,"").split("/"):[null]}function n(e){"undefined"!=typeof window&&(window.location=e)}t.__esModule=!0,t.getPathParts=a,t.updateUrl=n},252:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.pageQuery=void 0;var l=a(2),d=n(l),o=a(42),r=n(o),u=a(43),i=n(u),c=a(23),s=function(e){var t=e.data,a=t.allMarkdownRemark;return d.default.createElement(i.default,null,d.default.createElement("div",{className:"row"},d.default.createElement("div",{className:"col-sm-8"},d.default.createElement("ul",{className:"list-group list-group-flush"},a.edges.map(function(e){return"docs"===e.node.frontmatter.label&&d.default.createElement("li",{className:"list-group-item",key:e.node.id,style:{listStyleType:"none"}},d.default.createElement(r.default,{to:e.node.frontmatter.path,key:e.node.id},d.default.createElement("h4",null,e.node.frontmatter.doc_title)))}))),d.default.createElement("div",{className:"col-sm-16"},t.allMarkdownRemark.edges.map(function(e){var t=e.node.frontmatter;if("intro"===t.keywords&&t.language===c.language)return d.default.createElement("div",{key:e.node.id,dangerouslySetInnerHTML:{__html:e.node.html}})}))))};t.pageQuery="** extracted graphql fragment **";t.default=s}});
//# sourceMappingURL=component---src-pages-en-index-js-d4792d4dc033200422f2.js.map