import React from 'react'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'

import { language } from '../assets/utils/language'

const Document = ({data}) => {
  let postData
  if(data.markdownRemark) postData = data.markdownRemark
  const postList = data.allMarkdownRemark
  return (
    <PageTransition>
      <div className="row">
        <div className="col-sm-8">
          <ul className='list-group list-group-flush'>
            {postList.edges.map( post => {
                if(post.node.frontmatter.language === language) {
                  return (
                    post.node.frontmatter.label === 'docs' &&
                    <li className='list-group-item' key={post.node.id} style={{ 
                      listStyleType: 'none'
                    }}>
                      <Link to={post.node.frontmatter.path} key={post.node.id}>
                        <h3>{post.node.frontmatter.doc_title}</h3>
                        <small>Posted by: {post.node.frontmatter.author} | {post.node.frontmatter.date} | {post.node.frontmatter.language}</small>
                        <strong>Read more ...</strong>
                        <hr/>
                      </Link>
                    </li>
                  )
                }
              }
            )}
          </ul>
        </div>
        {
          postData &&
            <div className='col-sm-16'>
              <h1>{postData.frontmatter.doc_title}</h1>
              <h4>By {postData.frontmatter.author}</h4>
              <div dangerouslySetInnerHTML={{__html: postData.html}}/>
            </div>
        }
      </div>
    </PageTransition>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path }}) {
      html
      frontmatter {
        path
        doc_title
        author
        date
        label
        language
        keywords
      }
    }
    allMarkdownRemark {
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
          }
        }
      }
    }
  }
`

export default Document