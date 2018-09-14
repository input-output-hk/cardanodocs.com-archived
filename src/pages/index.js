import React from 'react'

let lang = 'en'

const setDefaultLanguage = (lang) => {
  // Skip build, Browsers only (needed for running build command to deploy site)
  if (typeof window !== 'undefined') {
    // Check below to only make en switch on initial site load
    let homePageCheck = window.location.pathname.split('/');
    homePageCheck = homePageCheck.filter( (n) => n != "" );
    if(homePageCheck.length < 1) window.location.href = `${window.location.href}${lang}`
  }
}

const IndexPage = () => {
  setDefaultLanguage(lang)
  return (
    <div>
      <h1>Cardano Documentation</h1>
      <h2>Built with Gatsby using React &amp; GraphQL</h2>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
    </div>
  )
}


export default IndexPage
