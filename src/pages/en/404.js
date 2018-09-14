import React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'

const NotFoundPage = () => (
  <PageTransition>
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </PageTransition>
)

export default NotFoundPage
