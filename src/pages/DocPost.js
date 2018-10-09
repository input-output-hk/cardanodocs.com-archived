import React from 'react';
import PageTransition from 'gatsby-plugin-page-transitions'

const DocPost = ({data}) => {
  const post = data.allMarkdownRemark;
  return (
    <PageTransition>
      <div>
        {
            post.edges.map( el => {
              const doc = el.node.frontmatter
              if (doc.label === 'docs' ) {
                return <div>
                <h1>{doc.doc_title}</h1>
                <h4>By {doc.author}</h4>
                <div key={el.node.id} dangerouslySetInnerHTML={{__html: el.node.html}} />
                </div> 
              }
            })
          }
      </div>  
    </PageTransition>
  )
}

export default DocPost