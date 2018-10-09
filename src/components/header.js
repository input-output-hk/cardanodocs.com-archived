import React from 'react'
import Link from 'gatsby-link'
import { updateLanguage } from '../assets/utils/language'


import Logo from './main-cardano-logo'
import BlockWelcome from './BlockWelcome'

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
}

class  Header extends React.Component{
  constructor(props) {
    super(props)
  }

  languageLink(lang) {
    const handleClick = (e) => {
      e.preventDefault();
      const clickedLang = e.target.attributes.getNamedItem('data-lang').value;
      updateLanguage(clickedLang);
    }
    return (
      <a href="#" onClick={handleClick} id='btn_' style={linkStyle} data-lang={lang}>
        {lang === 'en' ? 'English' : 'Chinese'}
      </a>
    )
  }

  render () {
    const props = this.props
    return (
      <div>
        <section className="hero">
          <div className='d-flex justify-content-around row lang-select'>
            <ul className='col-sm-14 text-right list-unstyled'>
              <li className='d-inline'>{this.languageLink(`en`)}</li>
              <li className='d-inline' style={linkStyle}>&nbsp; | &nbsp;</li>
              <li className='d-inline'>{this.languageLink(`cn`)}</li>
            </ul>
          </div>
          <div className="container text-center">
            <Link to="/" >
              <Logo />
            </Link>
            <h2 className="text-uppercase">Cardano <span className='thin-heading'>Documentation</span></h2>
          </div>
        </section>
        <BlockWelcome {...props} />
      </div>
    )
  } 
}

export default Header
