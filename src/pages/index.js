import React from 'react'
import styled from 'styled-components'
import Spinner from '../components/Spinner'

const LoadingWrap = styled.div`
  position:absolute;
  z-index:999;
  top:0;
  left:0;
  height:120vh;
  width:101vw;
  background-color:#121326;
`

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
    <LoadingWrap className='d-flex align-items-center justify-content-center'>
      <div style={{zIndex: 9999, position: 'relative', top: '-20em'}}>
        <Spinner />
      </div> 
    </LoadingWrap>  
  )
}


export default IndexPage
