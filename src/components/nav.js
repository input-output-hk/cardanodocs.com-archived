import React from 'react';
import Link from 'gatsby-link';

const linkStyle = {
  color: 'white',
  fontFamily: 'sans-serif',
  textDecoration: 'none'
}

class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {language} = this.props.language;
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
          <li><Link to='/' style={linkStyle} >Home</Link></li>
          <li><Link to={ language ? `${language}/about` : `/en/about`} style={linkStyle} >About</Link></li>
          <li><Link to='/en/docs' style={linkStyle} >Docs EN</Link></li>
          <li><Link to='/cn/docs' style={linkStyle} >Docs CN</Link></li>
          <li><Link to={ language ? `${language}/contact` : `/en/contact`} style={linkStyle} >Contact</Link></li>
        </ul>
      </div>
    )
  }
};

export default Navigation;