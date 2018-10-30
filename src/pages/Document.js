import React from 'react'
import SideBarNavWrap from '../components/SideBarNavWrap'
import PageTransition from 'gatsby-plugin-page-transitions'

const Document = ({data}) => {
  let postData
  if(data.markdownRemark) postData = data.markdownRemark
  const postList = data.allMarkdownRemark
  return (
    
      <div className="row">
        <div className="col-sm-6 cd-sidebar">
          <SideBarNavWrap postList={postList}/>
        </div>
        {
          postData &&
            <div className='col-sm-18 doc-content'>
              <div dangerouslySetInnerHTML={{__html: postData.html}}/>
            </div>
        }
      </div>
    
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
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
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

export default Document