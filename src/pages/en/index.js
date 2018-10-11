import React from 'react'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'
import colors from '../../assets/styles/colors.js';

import { language } from '../../assets/utils/language'

const IndexDocPage = ({ data }) => {
  const postList = data.allMarkdownRemark
  return (
    <PageTransition>
      <div className="row">
        <div className="col-sm-6 cd-sidebar">
          <ul className='list-group list-unstyled'>
            {console.log('postlist data', postList.edges)}
            {postList.edges.map( post => (
              (post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === 'base') &&
              <li className='mob-text-center' key={post.node.id} style={{listStyleType: 'none'}}>
                <Link to={post.node.frontmatter.path} key={post.node.id}>
                  <h5>{post.node.frontmatter.doc_title}</h5>
                </Link>
              </li>
              )
            )}
            <li>
              <h4 style={{color: colors.$primary}}>
                Cardano
              </h4>
            </li>
            {postList.edges.map( post => (
              (post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === 'cardano') &&
              <li className='mob-text-center' key={post.node.id} style={{listStyleType: 'none'}}>
                <Link to={post.node.frontmatter.path} key={post.node.id}>
                  <h5>{post.node.frontmatter.doc_title}</h5>
                </Link>
              </li>
              )
            )}
          </ul>
        </div>
        <div className="col-sm-18">
          {
            data.allMarkdownRemark.edges.map( el => {
              let data = el.node.frontmatter
              if (data.keywords === 'intro') {
                if (data.language === language) {
                  return <div key={el.node.id} dangerouslySetInnerHTML={{__html: el.node.html}} />
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
query DocListQueryEN {
  allMarkdownRemark(
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
