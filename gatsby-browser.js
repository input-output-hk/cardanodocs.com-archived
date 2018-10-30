import $ from 'jquery';
import {language} from './src/assets/utils/language'
import {cleanPath} from './src/assets/utils/cleanPath'

const initialNavState = () => {
  let directory = cleanPath(location.pathname)
  if(language === 'en' && directory === 'en') {
    $('.cd-sidebar ul li').each(function(i, el) {
      if( $(el).text().toLowerCase() === 'introduction' ) {
        $(el).addClass('active')
      }
    })
  } 
}

exports.onInitialClientRender = () => {
  console.log("ReactDOM.render has executed")
  initialNavState()
}

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