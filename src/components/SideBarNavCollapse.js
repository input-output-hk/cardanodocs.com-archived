import React from 'react'
import SideBarListItem from './SideBarListItem'

import {language} from '../assets/utils/language'
import colors from '../assets/styles/colors'
import styled from 'styled-components'
import FaChevronRight from '../assets/images/chevron.svg'

function getNavCollapseComponent (height) {
  return styled.div`
    .nav-collapse {
      transition: max-height 0.3s ease-out;
      overflow: hidden;
      max-height:0;
    }
    .nav-collapse.open {
      max-height: ${height}px;
    }
    label {
      cursor: pointer;
      padding: 0 0 0 0;
      margin: 0;
      position: relative;
      &:after {
        transition: all 0.25s ease-out;
        content: '';
        background: url(${FaChevronRight}) no-repeat 100% 25%;
        position: absolute;
        top: 0.2rem;
        right: -15px;
        height: 15px;
        width: 15px;
      }
    }
    input {
      display:none;
    }
    input:checked + label {
      &:after {
        transform: rotate(90deg);
      }
    }
  `
}

class SideBarNavCollapse extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      checked: props.active ? props.active : false
    }
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck () {
    this.setState({checked: !this.state.checked});
  }
  
  render () {
    console.log('checked', this.state.checked)
    const props = this.props
    const postList = props.postList
    const NavCollapse = getNavCollapseComponent(this.myNav ? this.myNav.offsetHeight : 0)
    return (
      <div>
        <NavCollapse className="collapse-nav-component">
          <input type="checkbox" id="nav-collapse-menu" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
          <label htmlFor="nav-collapse-menu" onClick={this.toggle}>
            <h4 style={{color: colors.$primary}}>
              {props.section}
            </h4>
          </label>
          <div className={`nav-collapse ${this.state.checked ? 'open' : 'closed'}`}  data-collapsed={this.state.checked} >
            <ul className='list-group list-unstyled' id={props.id} ref={(myNav) => this.myNav = myNav} >
              {postList.edges.map( (post, i) => (
                (post.node.frontmatter.language === language && post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === props.group) &&
                  <SideBarListItem post={post} key={i}/>
                )
              )}
            </ul>
          </div>
        </NavCollapse>
      </div>
    )
  }
}

export default SideBarNavCollapse