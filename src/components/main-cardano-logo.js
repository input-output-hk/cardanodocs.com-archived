import React from 'react'
import logoImageSrc from '../assets/images/cardano-logo.svg'


const Logo = () => {

  const style = {
    background: `url(${logoImageSrc}) no-repeat center`,
    backgroundSize: '100%',
    margin: '40px auto 40px auto',
    width: '120px',
    height: '120px',
    opacity: 1
  }

  return (
    <div>
      <h1 className="text-hide CaRustLogo" style={style}>Cardano Rust project logo</h1>
    </div>
  )
}

export default Logo
