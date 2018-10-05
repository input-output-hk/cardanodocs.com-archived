import React from 'react';
import Link from 'gatsby-link';
import { language, updateLanguage } from '../assets/utils/language'

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
}

class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }

  navLink(lang, dest) {
    function handleClick(e) {
      e.preventDefault()
      if (language === lang) {
        window.location = `/${language}/${dest}`
      } else {
        window.location = `/${lang}/${dest}`
      }
      
    }
    return (
      <a href={`#`} onClick={handleClick} id='btn_' style={linkStyle}>
        {language === lang ? `${language} ${dest}` : `${lang} ${dest}`}
      </a>
    )
  }

  render() {
    return (
      <div style={{
        background: 'dodgerBlue',
        color: 'white',
        clear: 'both'
      }}>
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '1em',
          maxWidth: 960,
          margin: '0 auto'
        }}>
          <li>{this.navLink(language, 'home')}</li>
          <li>{this.navLink('en', 'docs')}</li>
          <li>{this.navLink('cn', 'docs')}</li>
          <li>{this.navLink(language, 'contact')}</li>
        </ul>
      </div>
    )
  }
};

export default Navigation;