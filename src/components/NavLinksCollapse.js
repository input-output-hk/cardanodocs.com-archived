import React from 'react'
import SideBarListItem from './SideBarListItem'

import {language} from '../assets/utils/language'

let NavHeight = '';

class NavLinksCollapse extends React.Component{
  constructor (props) {
    super (props)
  }

  componentDidUpdate () {
    NavHeight = this.myNav.offsetHeight
    this.setHeight(NavHeight)
  }

  setHeight (height) {
    return this.myNavWrap.style.maxHeight = `${height}px`
  }
  
  render () {
    const props = this.props
    const postList = props.postList
    
    return (
      <div className={`nav-collapse ${(props.toggle || props.linksToggle) ? '' : 'closed'}`} ref={(myNavWrap) => this.myNavWrap = myNavWrap}>
          <ul className='list-group list-unstyled' id={props.id} ref={(myNav) => this.myNav = myNav} >
            {postList.edges.map( (post, i) => (
              (post.node.frontmatter.language === language && post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === props.group) &&
                <SideBarListItem post={post} key={i} />
              )
            )}
          </ul>
        </div>
    )
  }
}

export default NavLinksCollapse