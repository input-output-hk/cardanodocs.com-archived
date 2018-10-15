import React from 'react'
import SideBarListItem from './SideBarListItem'
import {language} from '../assets/utils/language'
import colors from '../assets/styles/colors'

const SideBarNav = ({postList}) => {
  return (
    <ul className='list-group list-unstyled'>
      {postList.edges.map( (post, i) => (
        (post.node.frontmatter.language === language && post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === 'base') &&
          <SideBarListItem post={post} key={i}/>
        )
      )}
      <li>
        <h4 style={{color: colors.$primary}}>
          Cardano
        </h4>
      </li>
      {postList.edges.map( (post, i) => (
        (post.node.frontmatter.language === language &&  post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === 'cardano') &&
          <SideBarListItem post={post} key={i}/>
        )
      )}
    </ul>
  )
}

export default SideBarNav

// postList.edges.map( post => {
//   if(post.node.frontmatter.language === language) {
//     return (