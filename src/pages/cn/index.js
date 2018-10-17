import React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'
import SideBarNav from '../../components/SideBarNav'

import { language } from '../../assets/utils/language'

const IndexDocPage = ({ data }) => {
  const postList = data.allMarkdownRemark
  return (
    <PageTransition>
      <div className="row">
        <div className="col-sm-6 cd-sidebar">
          <SideBarNav postList={postList}/>
        </div>
        <div className="col-sm-18">
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
    </PageTransition>
  )
}

export const pageQuery = graphql`
query DocListQueryCN {
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: { frontmatter: { language: { eq: "cn" } } }
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
