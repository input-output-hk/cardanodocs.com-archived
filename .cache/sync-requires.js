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
  "cn-glossary.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-glossary.json"),
  "cn-post-1.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-post-1.json"),
  "cn-post-2.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-post-2.json"),
  "en-cardano-addresses.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-addresses.json"),
  "cn-for-contributors.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-for-contributors.json"),
  "en-cardano-balance-and-stake.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-balance-and-stake.json"),
  "en-cardano-topology.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-topology.json"),
  "en-cardano-monetary-policy.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-monetary-policy.json"),
  "en-cardano-transaction-fees.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-transaction-fees.json"),
  "en-cardano-proof-of-stake.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-proof-of-stake.json"),
  "en-cardano-transactions.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-transactions.json"),
  "en-cardano-explorer.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-explorer.json"),
  "cn-intro-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-intro-text.json"),
  "en-cardano-update-mechanism.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-update-mechanism.json"),
  "en-cardano-transaction-assurance.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-transaction-assurance.json"),
  "en-intro-text.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-intro-text.json"),
  "en-cardano-differences.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-cardano-differences.json"),
  "en-introduction.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-introduction.json"),
  "en-installation.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-installation.json"),
  "en-technical.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-technical.json"),
  "en-for-contributors.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-for-contributors.json"),
  "en-glossary.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-glossary.json"),
  "en-timeline-testnet.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-timeline-testnet.json"),
  "en-timeline-bootstrap.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-timeline-bootstrap.json"),
  "timeline-reward.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/timeline-reward.json"),
  "technical-leader-selection.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-leader-selection.json"),
  "technical-formal-specification-for-a-cardano-wallet.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-formal-specification-for-a-cardano-wallet.json"),
  "technical-hd-wallets.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-hd-wallets.json"),
  "technical-wallet-frontend.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-wallet-frontend.json"),
  "technical-launcher.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-launcher.json"),
  "technical-explorer.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-explorer.json"),
  "technical-wallet-backend.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-wallet-backend.json"),
  "technical-pvss.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-pvss.json"),
  "technical-updater.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-updater.json"),
  "technical-blocks.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-blocks.json"),
  "technical-delegation.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-delegation.json"),
  "technical-plutus-examples.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-plutus-examples.json"),
  "technical-plutus-introduction.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-plutus-introduction.json"),
  "technical-plutus-types.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-plutus-types.json"),
  "technical-protocols-time-warp-nt.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-protocols-time-warp-nt.json"),
  "technical-protocols-network-transport.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-protocols-network-transport.json"),
  "technical-protocols-p-2-p.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-protocols-p-2-p.json"),
  "technical-protocols-csl-application-level.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-protocols-csl-application-level.json"),
  "technical-cli-options.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-cli-options.json"),
  "technical-protocols-binary-protocols.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-protocols-binary-protocols.json"),
  "technical-wallet-api.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/technical-wallet-api.json"),
  "for-contributors-haddock.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/for-contributors-haddock.json"),
  "for-contributors-building-from-source.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/for-contributors-building-from-source.json"),
  "cn-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn-404.json"),
  "cn.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/cn.json"),
  "document.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/document.json"),
  "en-404.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en-404.json"),
  "en.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/en.json"),
  "index.json": require("/Users/robinclark/iohk-sites/cardanodocs.com/.cache/json/index.json")
}