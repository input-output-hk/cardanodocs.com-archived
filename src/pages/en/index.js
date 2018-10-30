import React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'
import SideBarNavWrap from '../../components/SideBarNavWrap'

import { language } from '../../assets/utils/language'

const IndexDocPage = ({ data }) => {
  const postList = data.allMarkdownRemark
  return (
    
      <div className="row">
        <div className="col-sm-6 cd-sidebar">
          <SideBarNavWrap postList={postList}/>
        </div>
        <div className="col-sm-18 doc-content">
          {
            data.allMarkdownRemark.edges.map( (el, i) => {
              let data = el.node.frontmatter
              if (data.keywords === 'intro') {
                if (data.language === language) {
                  return <div key={i} dangerouslySetInnerHTML={{__html: el.node.html}} />
                }
              }
            })
          }
        </div>
      </div>
    
  )
}

export const pageQuery = graphql`
query DocListQueryEN {
  allMarkdownRemark(
    sort: { order: ASC, fields: [frontmatter___date] }
    filter: { frontmatter: { language: { eq: "en" } } }
  ) {
    edges {
      node {
        id
        excerpt
        html
        frontmatter {
          path
          doc_title
          author
          date
          language
          label
          keywords
          group
        }
      }
    }
  }
}
`

export default IndexDocPage
