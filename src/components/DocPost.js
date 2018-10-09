import React from 'react';
import PageTransition from 'gatsby-plugin-page-transitions'

const DocPost = ({data}) => {
  if(data) {
    const post = data.allMarkdownRemark
    return (
      <PageTransition>
        <div>
          { 
            post.edges.map( (el, i) => {
              const doc = el.node.frontmatter
              if (doc.label === 'docs' ) {
                return <div key={i}>
                  <h1>{doc.doc_title}</h1>
                  <h4>By {doc.author}</h4>
                  <div dangerouslySetInnerHTML={{__html: el.node.html}} />
                </div> 
              }
            })
          }
        </div>  
      </PageTransition>
    )
  }
  return null
}

export default DocPost