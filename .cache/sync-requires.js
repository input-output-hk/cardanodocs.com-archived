// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-pages-document-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/Document.js")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/dev-404-page.js")),
  "component---src-pages-cn-404-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/cn/404.js")),
  "component---src-pages-cn-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/cn/index.js")),
  "component---src-pages-en-404-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/en/404.js")),
  "component---src-pages-en-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/en/index.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/robinclark/iohk-sites/cardanodocs.com/src/pages/index.js"))
}

exports.json = {
  "layout-index.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/layout-index.json"),
  "en-welcome-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-welcome-text.json"),
  "en-installation.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-installation.json"),
  "en-for-contributors.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-for-contributors.json"),
  "en-glossary.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-glossary.json"),
  "en-post-1.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-post-1.json"),
  "cn-welcome-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-welcome-text.json"),
  "cn-glossary.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-glossary.json"),
  "cn-post-1.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-post-1.json"),
  "cn-post-2.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-post-2.json"),
  "en-cardano-addresses.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-addresses.json"),
  "cn-for-contributors.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-for-contributors.json"),
  "en-cardano-balance-and-stake.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-balance-and-stake.json"),
  "en-cardano-topology.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-topology.json"),
  "en-cardano-monetary-policy.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-monetary-policy.json"),
  "en-cardano-transaction-fees.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-transaction-fees.json"),
  "en-introduction.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-introduction.json"),
  "en-technical.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical.json"),
  "en-cardano-proof-of-stake.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-proof-of-stake.json"),
  "en-cardano-transactions.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-transactions.json"),
  "en-cardano-explorer.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-explorer.json"),
  "cn-intro-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-intro-text.json"),
  "en-cardano-update-mechanism.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-update-mechanism.json"),
  "en-cardano-transaction-assurance.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-transaction-assurance.json"),
  "en-intro-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-intro-text.json"),
  "en-cardano-differences.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-differences.json"),
  "dev-404-page.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/dev-404-page.json"),
  "cn-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-404.json"),
  "cn.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn.json"),
  "document.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/document.json"),
  "en-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-404.json"),
  "en.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en.json"),
  "index.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/index.json")
}