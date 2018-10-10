export function getPathParts () {
  if(typeof window !== 'undefined'){
    return window.location.pathname.replace(/^\//, '').split('/')
  }
  return [null]
}

export function updateUrl (newUrl) {
  if(typeof window !== 'undefined') {
    const body = document.getElementsByTagName('body')[0]
    const vizToggle = () => body.classList.toggle('viz')
    vizToggle()
    setTimeout(() => {
      window.location = newUrl 
    }, 500, vizToggle)
  }
}