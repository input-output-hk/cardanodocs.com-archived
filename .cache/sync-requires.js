// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-pages-document-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/Document.js")),
  "component---src-pages-cn-404-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/cn/404.js")),
  "component---src-pages-cn-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/cn/index.js")),
  "component---src-pages-en-404-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/en/404.js")),
  "component---src-pages-en-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/en/index.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/index.js"))
}

exports.json = {
  "layout-index.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/layout-index.json"),
  "en-post-1.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-post-1.json"),
  "en-for-contributors.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-for-contributors.json"),
  "en-post-2.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-post-2.json"),
  "cn-intro-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-intro-text.json"),
  "cn-welcome-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-welcome-text.json"),
  "en-glossary.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-glossary.json"),
  "cn-glossary.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-glossary.json"),
  "cn-post-1.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-post-1.json"),
  "cn-post-2.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-post-2.json"),
  "en-welcome-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-welcome-text.json"),
  "en-intro-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-intro-text.json"),
  "cn-for-contributors.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-for-contributors.json"),
  "cn-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-404.json"),
  "cn.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn.json"),
  "document.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/document.json"),
  "en-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-404.json"),
  "en.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en.json"),
  "index.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/index.json")
}