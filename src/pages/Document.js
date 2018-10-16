import React from 'react'
import SideBarNav from '../components/SideBarNav'
import PageTransition from 'gatsby-plugin-page-transitions'

const Document = ({data}) => {
  let postData
  if(data.markdownRemark) postData = data.markdownRemark
  const postList = data.allMarkdownRemark
  return (
    <PageTransition>
      <div className="row">
        <div className="col-sm-6 cd-sidebar">
          <SideBarNav postList={postList}/>
        </div>
        {
          postData &&
            <div className='col-sm-18'>
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ){
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