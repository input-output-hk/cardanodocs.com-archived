import React from 'react'
import NavLinksCollapse from './NavLinksCollapse'
import colors from '../assets/styles/colors'
import styled from 'styled-components'
import ChevronRight from '../assets/images/chevron-2.svg'

const NavCollapse = styled.div`
    .nav-collapse {
      transition: max-height 0.3s ease-out;
      overflow: hidden;
    }
    .nav-collapse.closed {
      max-height:0 !important;
    }
    h4 {
      display: inline-block;
      cursor: pointer;
      margin: 0 0 0.5rem 0;
      position: relative;
      &:after {
        transition: all 0.25s ease-out;
        content: '';
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

class SideBarNavCollapse extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      toggle: props.active ? props.active : false,
      linksToggle: false
    } // TODO: Add prevState checker to this set State call
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck () {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
      linksToggle: !prevState.linksToggle
    }))
  }

  render () {
    const props = this.props
    return (
      <div>
        <NavCollapse className="collapse-nav-component">
          <h4 onClick={this.handleCheck} className={(this.state.toggle || this.state.linksToggle) ? 'open' : 'closed'}>
            {props.section}
          </h4>
          <NavLinksCollapse toggle={this.state.toggle} linksToggle={this.state.linksToggle} postList={props.postList} group={props.group}/> 
        </NavCollapse>
      </div>
    )
  }
}

export default SideBarNavCollapse