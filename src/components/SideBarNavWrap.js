import React from 'react'
import SideBarNavCollapse from './SideBarNavCollapse'

import {language} from '../assets/utils/language'


const SideBarNavWrap = ({postList}) => {
  return (
    <div>
      <SideBarNavCollapse postList={postList} section={language === 'en' ? `Introduction` : `介绍`} group='base' active/>
      <SideBarNavCollapse postList={postList} section={language === 'en' ? `Cardano` : `卡尔达诺概述`} group='cardano'/>
      <SideBarNavCollapse postList={postList} section={language === 'en' ? `Timeline` : `Cardano 时间线`} group='timeline'/>
      <SideBarNavCollapse postList={postList} section={language === 'en' ? `Technical` : `技术细节`} group='technical'/>
      <SideBarNavCollapse postList={postList} section={language === 'en' ? `For Contributors` : `对于贡献者`} group='for-contributors'/>
    </div>
  )
}

export default SideBarNavWrap
