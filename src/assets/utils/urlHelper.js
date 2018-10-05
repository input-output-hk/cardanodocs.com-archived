export function getPathParts () {
  return window.location.pathname.replace(/^\//, '').split('/')
}

export function updateUrl (newUrl) {
  console.log(newUrl)
  window.location = newUrl
}