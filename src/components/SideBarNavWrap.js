import React from 'react'
import SideBarListItem from './SideBarListItem'
import SideBarNavCollapse from './SideBarNavCollapse'

import {language} from '../assets/utils/language'
import colors from '../assets/styles/colors'


const SideBarNavWrap = ({postList}) => {
  return (
    <div>
      <SideBarNavCollapse postList={postList} section={language === 'en' ? `Introduction` : `介绍`} group='base' active/>
      {/* <SideBarNavCollapse postList={postList} section={language === 'en' ? `Cardano` : `卡尔达诺概述`} group='cardano'/> */}
      
      {/* <ul className='list-group list-unstyled'>
        <li>
          <h4 style={{color: colors.$primary}}>
            {language === 'en' ? `Cardano` : `卡尔达诺概述`}
          </h4>
        </li>
        {postList.edges.map( (post, i) => (
          (post.node.frontmatter.language === language &&  post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === 'cardano') &&
            <SideBarListItem post={post} key={i}/>
          )
        )}
      </ul>
      <ul className='list-group list-unstyled'>
        <li>
          <h4 style={{color: colors.$primary}}>
            {language === 'en' ? `Timeline` : `Cardano 时间线`}
          </h4>
        </li>
        {postList.edges.map( (post, i) => (
          (post.node.frontmatter.language === language &&  post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === 'timeline') &&
            <SideBarListItem post={post} key={i}/>
          )
        )}
      </ul>
      <ul className='list-group list-unstyled'>
        <li>
          <h4 style={{color: colors.$primary}}>
            {language === 'en' ? `Technical` : `技术细节`}
          </h4>
        </li>
        {postList.edges.map( (post, i) => (
          (post.node.frontmatter.language === language &&  post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === 'technical') &&
            <SideBarListItem post={post} key={i}/>
          )
        )}
      </ul>
      <ul className='list-group list-unstyled'>
        <li>
          <h4 style={{color: colors.$primary}}>
            {language === 'en' ? `For Contributors` : `对于贡献者`}
          </h4>
        </li>
        {postList.edges.map( (post, i) => (
          (post.node.frontmatter.language === language &&  post.node.frontmatter.label === 'docs' && post.node.frontmatter.group === 'for-contributors') &&
            <SideBarListItem post={post} key={i}/>
          )
        )}
      </ul> */}
    </div>
  )
}

export default SideBarNavWrap
