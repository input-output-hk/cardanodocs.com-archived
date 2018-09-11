import React from 'react'
import Link from 'gatsby-link'

const Button = {

}

const ListItem = {

}


const linkStyle = {
  color: 'white',
  fontFamily: 'sans-serif',
  textDecoration: 'none'
}

const getLangs = (e) => {
  let pathArray = location.pathname.split('/');
  pathArray = pathArray.filter( (n) => n != "" ); //just get the actual directories
  const clickedLang = e.target.attributes.getNamedItem('data-lang').value;
  if (pathArray[0] === clickedLang) return;
  return replaceLangDirectory(pathArray, clickedLang)
}

const replaceLangDirectory = (pathArray, clickedLang) => {
  pathArray.splice(0, 1, `${clickedLang}`);
  rebuildPathAndRedirect(pathArray);
}

const rebuildPathAndRedirect = (pathArray) => {
  let newPath = ''
  pathArray.forEach( (e, i) => {
    newPath += '/';
    newPath += pathArray[i];
  });
  window.location = newPath;
}

// TODO: Language link should be a component
function languageLink(lang) {
  function handleClick(e) {
    e.preventDefault();
    getLangs(e);
  }
  return (
    <a href="#" onClick={handleClick} id='btn_' style={linkStyle} onClick={handleClick} data-lang={lang}>
      {lang === 'en' ? 'English' : 'Chinese'}
    </a>
  )
}

const Header = ( {siteTitle} ) => (
  <div
    style={{
      background: 'tomato',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ 
        margin: 0,
        display: 'inline-block'
      }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingTop: '1em',
        float: 'right',
        margin: '0'
      }}>
        <li>{languageLink(`en`)}</li>
        <li style={linkStyle}>&nbsp; | &nbsp;</li>
        <li>{languageLink(`cn`)}</li>
      </ul>
    </div>
  </div>
)

export default Header
