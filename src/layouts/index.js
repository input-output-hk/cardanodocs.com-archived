import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import $ from 'jquery'
import 'typeface-montserrat'

import Header from '../components/header'
import Footer from '../components/footer'
import Medusa from '../components/medusa'

import '../assets/styles/bootstrap-imports.scss'
import '../assets/styles/custom.scss'
import { FaMarkdown } from 'react-icons/fa';

class Layout extends React.Component {
  constructor(props) {
    super(props)
    
  }

  // componentDidMount = () => {
  // }

  render() {
    const {children, data} = this.props;
    return (
      <div >
        <Helmet
          title={data.site.siteMetadata.site_title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Medusa />
        {/* <div className="medusa-section"></div> */}
        <Header
          data={data}
          siteTitle={data.site.siteMetadata.site_title}
          intro={data.allMarkdownRemark}
        />
        <div className='container'>
          {children()}
        </div>
        <Footer/>
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
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
    ){
      edges {
        node {
          id
          html
          frontmatter {
            doc_title
            author
            path
            date
            label
            keywords
            language
          }
        }
      }
    }
  }
  `
