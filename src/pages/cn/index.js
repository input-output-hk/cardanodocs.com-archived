import React from 'react'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'

const IndexPage = () => (
  <PageTransition>
    <div>
      <h1>Cardano Documentation 你好</h1>
      <h2>Built with Gatsby using React &amp; GraphQL</h2>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
    </div>
  </PageTransition>
)

export default IndexPage
