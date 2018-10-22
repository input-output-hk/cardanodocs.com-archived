import React from 'react'
import Link from 'gatsby-link'
import colors from '../assets/styles/colors'
import styled from 'styled-components'

const LiComponent = styled.li`
  a {
    color: ${colors.$white};
    &:hover {
      color: ${colors.$primary};
    }
    h6 {
      margin-left:0.5rem;
    }
  }
`

const SideBarListItem = ({post}) => {
  return (
  <LiComponent className='mob-text-center' key={post.node.id} style={{listStyleType: 'none'}}>
    <Link to={post.node.frontmatter.path} key={post.node.id}>
      <h6>{post.node.frontmatter.doc_title}</h6>
    </Link>
  </LiComponent>
  )
}

export default SideBarListItem