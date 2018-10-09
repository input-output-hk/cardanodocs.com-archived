export function getPathParts () {
  if(typeof window !== 'undefined'){
    return window.location.pathname.replace(/^\//, '').split('/')
  }
  return [null]
}

export function updateUrl (newUrl) {
  if(typeof window !== 'undefined') {
    window.location = newUrl
  }
}