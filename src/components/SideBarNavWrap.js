import React from 'react'
import styled from 'styled-components'
import SideBarNavCollapse from './SideBarNavCollapse'

import {language} from '../assets/utils/language'

let lastScrollPos = 0;
let tick = false;

const NavWrap = styled.div`
  &.stickyNav {
    position: -webkit-sticky;
    position: sticky;
    top:0;
  }
`

class SideBarNavWrap extends React.Component {
  constructor (props) {
    super (props)
    this.handleScroll = this.handleScroll.bind(this)
    this.navScrollPosition = this.navScrollPosition.bind(this)
  }

  navScrollPosition (scrollPos) {
    if (scrollPos > 700) {
      document.querySelector('.navWrap').classList.add('stickyNav')
    } else {
      document.querySelector('.navWrap').classList.remove('stickyNav')
    }
  }

  handleScroll() {
    lastScrollPos = window.scrollY
    if (!tick) {
      window.requestAnimationFrame( () => {
        this.navScrollPosition(lastScrollPos);
        tick = !tick
      });
      tick = !tick
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render () {
    const props = this.props
    const postList = props.postList
    return (
      <NavWrap className='navWrap'>
        <SideBarNavCollapse postList={postList} section={language === 'en' ? `Introduction` : `介绍`} group='base' active/>
        <SideBarNavCollapse postList={postList} section={language === 'en' ? `Cardano` : `卡尔达诺概述`} group='cardano'/>
        <SideBarNavCollapse postList={postList} section={language === 'en' ? `Timeline` : `Cardano 时间线`} group='timeline'/>
        <SideBarNavCollapse postList={postList} section={language === 'en' ? `Technical` : `技术细节`} group='technical'/>
        <SideBarNavCollapse postList={postList} section={language === 'en' ? `For Contributors` : `对于贡献者`} group='for-contributors'/>
      </NavWrap>
    )
  }
}

export default SideBarNavWrap
