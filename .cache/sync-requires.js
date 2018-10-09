// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-pages-cn-404-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/cn/404.js")),
  "component---src-pages-cn-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/cn/index.js")),
  "component---src-pages-en-404-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/en/404.js")),
  "component---src-pages-en-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/en/index.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/index.js"))
}

exports.json = {
  "layout-index.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/layout-index.json"),
  "cn-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-404.json"),
  "cn.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn.json"),
  "en-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-404.json"),
  "en.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en.json"),
  "index.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/index.json")
}