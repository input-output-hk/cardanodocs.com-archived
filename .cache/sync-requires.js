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
  "en-welcome-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-welcome-text.json"),
  "en-post-1.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-post-1.json"),
  "cn-welcome-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-welcome-text.json"),
  "cn-intro-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-intro-text.json"),
  "en-intro-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-intro-text.json"),
  "en-for-contributors-building-from-source.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-for-contributors-building-from-source.json"),
  "en-for-contributors-haddock.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-for-contributors-haddock.json"),
  "en-en-cardano-differences.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-differences.json"),
  "en-en-cardano-addresses.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-addresses.json"),
  "en-en-cardano-balance-and-stake.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-balance-and-stake.json"),
  "en-en-cardano-topology.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-topology.json"),
  "en-en-cardano-monetary-policy.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-monetary-policy.json"),
  "en-en-cardano-transaction-fees.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-transaction-fees.json"),
  "en-en-cardano-explorer.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-explorer.json"),
  "en-technical-launcher.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-launcher.json"),
  "en-technical-explorer.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-explorer.json"),
  "en-technical-leader-selection.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-leader-selection.json"),
  "en-technical-hd-wallets.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-hd-wallets.json"),
  "en-technical-wallet-backend.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-wallet-backend.json"),
  "en-technical-formal-specification-for-a-cardano-wallet.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-formal-specification-for-a-cardano-wallet.json"),
  "en-technical-wallet-frontend.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-wallet-frontend.json"),
  "en-en-timeline-bootstrap.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-timeline-bootstrap.json"),
  "en-en-timeline-testnet.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-timeline-testnet.json"),
  "en-timeline-reward.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-timeline-reward.json"),
  "en-technical-plutus-introduction.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-plutus-introduction.json"),
  "en-technical-plutus-types.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-plutus-types.json"),
  "en-technical-plutus-examples.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-plutus-examples.json"),
  "en-technical-wallet-api.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-wallet-api.json"),
  "en-en-cardano-proof-of-stake.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-proof-of-stake.json"),
  "en-en-cardano-transactions.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-transactions.json"),
  "en-en-cardano-update-mechanism.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-update-mechanism.json"),
  "en-en-cardano-transaction-assurance.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-en-cardano-transaction-assurance.json"),
  "en-technical-updater.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-updater.json"),
  "en-technical-blocks.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-blocks.json"),
  "en-technical-pvss.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-pvss.json"),
  "en-technical-delegation.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-delegation.json"),
  "en-technical-protocols-time-warp-nt.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-protocols-time-warp-nt.json"),
  "en-technical-protocols-csl-application-level.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-protocols-csl-application-level.json"),
  "en-technical-protocols-p-2-p.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-protocols-p-2-p.json"),
  "en-technical-protocols-network-transport.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-protocols-network-transport.json"),
  "en-technical-cli-options.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-cli-options.json"),
  "en-technical-protocols-binary-protocols.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical-protocols-binary-protocols.json"),
  "cn-introduction.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-introduction.json"),
  "cn-installation.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-installation.json"),
  "cn-technical.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-technical.json"),
  "cn-for-contributors.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-for-contributors.json"),
  "cn-glossary.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-glossary.json"),
  "en-introduction.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-introduction.json"),
  "en-installation.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-installation.json"),
  "en-technical.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical.json"),
  "en-for-contributors.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-for-contributors.json"),
  "en-glossary.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-glossary.json"),
  "cn-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-404.json"),
  "cn.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn.json"),
  "document.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/document.json"),
  "en-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-404.json"),
  "en.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en.json"),
  "index.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/index.json")
}