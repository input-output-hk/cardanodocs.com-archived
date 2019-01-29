import { getPathParts, updateUrl } from './urlHelper'

function getLanguageFromURL () {
  if(typeof window !== 'undefined'){
    const supportedLanguages = [ 'en', 'cn' ]
    const defaultLanguage = 'en'
    const UrlLanguage = getPathParts()[0]
    if (supportedLanguages.includes(UrlLanguage)) return UrlLanguage
    return updateUrl(`/${defaultLanguage}${window.location.pathname}`)
  }
}

export const language = getLanguageFromURL()

export function updateLanguage (newLanguage) {
  if(typeof window !== 'undefined'){
    if (newLanguage !== language) {
      const UrlParts = getPathParts()
      UrlParts.splice(0, 1, newLanguage)
      updateUrl(`/${UrlParts.join('/')}`)
    }
  }
}

