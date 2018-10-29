import React from 'react'
import { navigateTo } from 'gatsby-link'

import $ from 'jquery'
import styled from 'styled-components'
import {language} from '../assets/utils/language'
import colors from '../assets/styles/colors'
import ChevronRight from '../assets/images/chevron-2.svg'

let NavHeight = '';
//let navOpen = false;

const NavCollapse = styled.div`
  .nav-collapse {
    transition: max-height 0.3s ease-out;
    overflow: hidden;
    margin-bottom: 0.25rem;
  }
  .nav-collapse.closed {
    max-height:0 !important;
  }
  .nav-collapse.active {
    max-height: auto;
  }
  h4 {
    cursor: pointer;
    margin: 0 0 0.25rem 0;
    position: relative;
    &:after {
      transition: all 0.25s ease-out;
      content: none;
      background: url(${ChevronRight}) no-repeat 100% 25%;
      position: absolute;
      top: 0.2rem;
      right: -15px;
      height: 12px;
      width: 12px;
    }
  }
  h4.open {
    &:after {
      transform: rotate(90deg);
    }
  }
`

const LiComponent = styled.li`
  &.active {
    border-right: 2px solid ${colors.$purple}
  }
  a {
    color: ${colors.$white};
    &:hover {
      color: ${colors.$white};
    }
    span {
      margin:0.1rem 0 0.1rem 0.5rem;
      display:inline-block;
    }
  }
`

class SideBarNavCollapse extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      toggleOpen: true,
      // toggleNavOpen: true
    } 
    this.handleDropdown = this.handleDropdown.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.activeSideNavStates = this.activeSideNavStates.bind(this)
    this.cleanPath = this.cleanPath.bind(this)
    this.removeDashes = this.removeDashes.bind(this)
    this.addActiveClass = this.addActiveClass.bind(this)
    this.navigate = this.navigate.bind(this)
  }

  handleDropdown () {
    this.setState(prevState => ({
      toggleOpen: !prevState.toggleOpen
    }))
  }

  handleLinkChange () {
    // this.setState(prevState => ({
    //   toggleNavOpen: !prevState.toggleNavOpen
    // }))
    //navOpen = !navOpen;
  }

  setHeight (height) {
    return this.myNavWrap.style.maxHeight = `${height}px`
  }

  cleanPath () {
    let path = location.pathname.split('/');
    return path.filter( (n) => n != "" );
  }
  
  removeDashes (el) {
    return el.replace('-', ' ');
  }
  
  addActiveClass (el, classToAdd) {
    $(el).addClass(classToAdd);
  }

  activeSideNavStates () {
    const path = location.pathname.split('/');
    let directory = this.cleanPath(path).pop();
    return $('.cd-sidebar ul li').each((i, li) => {
      directory = this.removeDashes(directory).toLowerCase();
      if ($(li).text().toLowerCase() === directory) {
        this.addActiveClass(li, 'active');
      }
    });
  }

  navigate (e, path) {
    e.preventDefault()
    //this.handleLinkChange()
    navigateTo(path)
  }

  componentDidMount () {
    setTimeout( () => {
      this.activeSideNavStates()
    }, 50)
  }

  componentDidUpdate () {
    NavHeight = this.myNav.offsetHeight
    this.setHeight(NavHeight)
  }

  render () {
    const props = this.props
    const postList = props.postList
    return (
      <div>
        <NavCollapse className={`collapse-nav-component`}>
          <h4 onClick={this.handleDropdown} className={`mob-text-center navLink ${this.state.toggleOpen ? 'open' : 'closed'}`}>
            {props.section}
          </h4>
          <div className={`nav-collapse open`} ref={(myNavWrap) => this.myNavWrap = myNavWrap}>
            <ul className='list-group list-unstyled' id={props.id} ref={(myNav) => this.myNav = myNav} >
              {postList.edges.map( (post, i) => (
                (post.node.frontmatter.language === language && post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === props.group) &&
                <LiComponent className='mob-text-center' key={post.node.id} style={{listStyleType: 'none'}} ref={(myLi) => this.myLi = myLi}>
                  <a href='/' onClick={(e) => this.navigate(e, post.node.frontmatter.path)} role="link" key={post.node.id}>
                    <span>{post.node.frontmatter.doc_title}</span>
                  </a>
                </LiComponent>
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

//{`nav-collapse ${this.state.toggleOpen || this.state.toggleNavOpen ? 'open' : 'closed'}`}