import React from 'react';
import Link from 'gatsby-link';
import PageTransition from 'gatsby-plugin-page-transitions'

const getLanguage = () => {
  // Skip build, Browsers only
  if (typeof window !== 'undefined') {
    let lang = location.pathname.split('/');
    lang = lang.filter( (n) => n != "" ); //strip unwanted
    lang = lang[0]; // 1st one is language
    return lang;
  }
}

const BlogPost = ({data}) => {
  const post = data.markdownRemark;
  return (
    <PageTransition>
      <div>
        <Link to={`/${getLanguage()}/docs`}>{`< `}Go back</Link>
        <hr/>
        <h1>{post.frontmatter.doc_title}</h1>
        <h4>By {post.frontmatter.author}</h4>
        <div dangerouslySetInnerHTML={{__html: post.html}}/>
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
      }
    }
  }
`

export default BlogPost