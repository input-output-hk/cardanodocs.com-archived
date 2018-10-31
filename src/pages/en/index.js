import React from 'react'
import Media from "react-media"
import styled from 'styled-components'
import SideBarNavWrap from '../../components/SideBarNavWrap'

import { language } from '../../assets/utils/language'
import ChevronRight from '../../assets/images/chevron-white.svg'


const MobileNav = styled.div`
  overflow:hidden;
  &.toggleShut {
    max-height: 0
  }
`
const MobileNavButton = styled.button`
  width: calc(100% - 1rem);
  margin-bottom:1rem;
  span {
    position:relative;
    &:after {
      transition: all 0.25s ease-out;
      content: '';
      background: url(${ChevronRight}) no-repeat 100% 25%;
      position: absolute;
      top: calc(50% - 6px);
      right: -1rem;
      height: 12px;
      width: 12px;
    }
  }
  &.open {
    span {
      &:after {
        transform: rotate(90deg);
      }
    }
  }
`

class IndexDocPage extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      toggleViz: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.setState(prevState => ({
      toggleViz: !prevState.toggleViz
    }))
  }

  render () {
    const postList = this.props.data.allMarkdownRemark
    return (
      <div className="row">
        <div className="col-sm-6 cd-sidebar">
          <Media query="(max-width: 719px)">
            {matches =>
              matches ? (
                <div>
                  <MobileNavButton className={`btn btn-primary ${this.state.toggleViz ? `open` : ``}`} onClick={this.handleToggle}>
                    <span>{language === 'en' ? 'Documentation': '文档'}</span>
                  </MobileNavButton>
                  <MobileNav className={!this.state.toggleViz ? `toggleShut` : ``}>
                    <SideBarNavWrap postList={postList}/>
                  </MobileNav>
                </div>
              ) : (
                <SideBarNavWrap postList={postList}/>
              )
            }
          </Media>
        </div>
        <div className="col-sm-18 doc-content">
          {
            postList.edges.map( (el, i) => {
              let data = el.node.frontmatter
              if (data.keywords === 'intro') {
                if (data.language === language) {
                  return <div key={i} dangerouslySetInnerHTML={{__html: el.node.html}} />
                }
              }
            })
          }
        </div>
      </div>
    )
  }
  
}

export const pageQuery = graphql`
query DocListQueryEN {
  allMarkdownRemark(
    sort: { order: ASC, fields: [frontmatter___date] }
    filter: { frontmatter: { language: { eq: "en" } } }
  ) {
    edges {
      node {
        id
        excerpt
        html
        frontmatter {
          path
          doc_title
          author
          date
          language
          label
          keywords
          group
        }
      }
    }
  }
}
`

export default IndexDocPage
