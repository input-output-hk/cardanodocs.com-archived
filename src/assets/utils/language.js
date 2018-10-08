import { getPathParts, updateUrl } from './urlHelper'

function getLanguageFromURL () {
  const supportedLanguages = [ 'en', 'cn' ]
  const defaultLanguage = 'en'
  const URLLanguage = getPathParts()[0]
  if (supportedLanguages.includes(URLLanguage)) return URLLanguage
  updateUrl(`/${defaultLanguage}${window.location.path}`)
}

export const language = getLanguageFromURL()

export function updateLanguage (newLanguage) {
  if (newLanguage !== language) {
    const URLParts = getPathParts()
    URLParts.splice(0, 1, newLanguage)
    updateUrl(`/${URLParts.join('/')}`)
  }
}

