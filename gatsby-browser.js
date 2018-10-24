const injectGourceScript = () => {
  if (typeof window !== 'undefined'){
    function addJS(jsCode) {
      var s = document.createElement(`script`)
      s.type = `text/javascript`
      s.src = `/medusa.main.js`
      document.getElementsByTagName(`head`)[0].appendChild(s)
    }
    addJS()
  }
}

let injectedGourceScript = false
exports.onRouteUpdate = function({ location }) {
  if (!injectedGourceScript) {
    injectGourceScript()
    injectedGourceScript = true
  }
}