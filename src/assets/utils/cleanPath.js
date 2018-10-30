export function cleanPath (path) {
  if(typeof window != 'undefined') {
    path = path.split('/');
    path = path.filter( (n) => n != "" );
    return path.pop()
  }
}