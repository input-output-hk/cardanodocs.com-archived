import React from 'react'
import TriangleSeparator from './triangle-separator'
import { language } from '../assets/utils/language'

class BlockWelcome extends React.Component {
  constructor (props) {
    super (props)

  }

  render () {
    const props = this.props
    return (
      <div className='d-flex justify-content-around row'>
        {language === 'en' &&
          <h1>EN</h1>
        }
        {language === 'cn' &&
          <h1>CN</h1>
        }
        <TriangleSeparator />
        <div className="welcome text-center pt-5 pr-5 pb-5 pl-5 mt-0 mr-md-5 mb-5 ml-md-5 col-sm-12  overlay-bg">
          {
            props.intro.edges.map( el => {
              let data = el.node.frontmatter
              if (data.keywords === 'welcome') {
                if (data.language === language) {
                  return <div key={el.node.id} dangerouslySetInnerHTML={{__html: el.node.html}} />
                }
              }
            })
          }
        </div>
      </div>
  
    )
  }
}

export default BlockWelcome
