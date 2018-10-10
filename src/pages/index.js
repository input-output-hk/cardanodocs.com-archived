import React from 'react'
//import Spinner from '../components/Spinner'

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
      //<Spinner />
      <div><h1>FOO</h1></div>
  )
}


export default IndexPage
