import React from 'react'
import Link from 'gatsby-link'

import Logo from './main-cardano-logo'
import BlockWelcome from './BlockWelcome'

const Header = (props) => (
  <div>
    <section className="hero">
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

export default Header
