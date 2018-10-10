import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'typeface-montserrat'

import Header from '../components/header'

import '../assets/styles/bootstrap-imports.scss'
import '../assets/styles/custom.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    const {children, data} = this.props;
    return (
      <div>
        <Helmet
          title={data.site.siteMetadata.site_title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <div className="gource-section"></div>
        <Header
          data={data}
          siteTitle={data.site.siteMetadata.site_title}
          intro={data.allMarkdownRemark}
        />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children()}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

// Graphql query used to retrieve the serialized search index and meta siteTitle
export const pageQuery = graphql`
  query SearchIndexSiteTitleQuery {
    site {
      siteMetadata {
        site_title
      }
    }
    siteSearchIndex {
      index
    }
    allMarkdownRemark{
      edges {
        node {
          id
          html
          frontmatter {
            doc_title
            author
            path
            date
            layout
            permalink
            label
            keywords
            language
          }
        }
      }
    }
  }
  `
