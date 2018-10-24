import React from 'react'
import Link from 'gatsby-link'
import colors from '../assets/styles/colors'
import styled from 'styled-components'

import $ from 'jquery'

const LiComponent = styled.li`
  &.active {
    border-right: 2px solid ${colors.$purple}
  }
  a {
    color: ${colors.$white};
    &:hover {
      color: ${colors.$white};
    }
    h6 {
      margin-left:0.5rem;
    }
  }
`

const SideBarListItem = ({post}) => {

  const cleanPath = () => {
    let path = location.pathname.split('/');
    return path.filter( (n) => n != "" );
  }
  
  const removeDashes = (el) => {
    return el.replace('-', ' ');
  }
  
  const addActiveClass = (el, d, classToAdd) => {
    $(el).addClass(classToAdd);
    $(el).parent().addClass(classToAdd);
  }

  const activeSideNavStates = () => {
    //console.log('activeSideNavStates')
    const path = location.pathname.split('/');
    let directory = cleanPath(path).pop();
      
    return $('.cd-sidebar ul li').each((i, o) => {
      const th1s = o;
      directory = removeDashes(directory).toLowerCase();
      if ($(th1s).text().toLowerCase() === directory) {
        addActiveClass(th1s, directory, 'active');
        //addParentClasses(th1s, 'activeLi');
      }
    });
  }

  activeSideNavStates()

  return (
  <LiComponent className='mob-text-center' key={post.node.id} style={{listStyleType: 'none'}}>
    <Link to={post.node.frontmatter.path} key={post.node.id}>
      <h6>{post.node.frontmatter.doc_title}</h6>
    </Link>
  </LiComponent>
  )
}

export default SideBarListItem