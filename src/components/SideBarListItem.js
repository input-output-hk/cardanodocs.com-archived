import React from 'react'
import Link from 'gatsby-link'


const ListItem =  ({post}) => {
  return (
  <li className='mob-text-center' key={post.node.id} style={{listStyleType: 'none'}}>
    <Link to={post.node.frontmatter.path} key={post.node.id}>
      <h5>{post.node.frontmatter.doc_title}</h5>
    </Link>
  </li>
  )
}

export default ListItem