var plugins = [{
      plugin: require('/Users/robinclark/iohk-sites/cardanodocs.com/node_modules/gatsby-plugin-catch-links/gatsby-browser'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/robinclark/iohk-sites/cardanodocs.com/node_modules/gatsby-plugin-page-transitions/gatsby-browser'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/robinclark/iohk-sites/cardanodocs.com/node_modules/gatsby-plugin-typography/gatsby-browser'),
      options: {"plugins":[],"pathToConfigModule":"src/utils/typography.js"},
    }]
// During bootstrap, we write requires at top of this file which looks
// basically like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-browser.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-browser.js"),
//     options: { ... },
//   },
// ]

export function apiRunner(api, args, defaultReturn) {
  let results = plugins.map(plugin => {
    if (plugin.plugin[api]) {
      const result = plugin.plugin[api](args, plugin.options)
      return result
    }
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else if (defaultReturn) {
    return [defaultReturn]
  } else {
    return []
  }
}

export function apiRunnerAsync(api, args, defaultReturn) {
  return plugins.reduce(
    (previous, next) =>
      next.plugin[api]
        ? previous.then(() => next.plugin[api](args, next.options))
        : previous,
    Promise.resolve()
  )
}
