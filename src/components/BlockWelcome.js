import React from 'react'
import TriangleSeparator from './triangle-separator'

const BlockWelcome = (props) => {
  return (
    <div className='d-flex justify-content-around row'>
      {console.log(props)}
      <TriangleSeparator />
      <div className="welcome text-center pt-5 pr-5 pb-5 pl-5 mt-0 mr-md-5 mb-5 ml-md-5 col-sm-18  overlay-bg">
        {props.intro.edges.map( el => (
          (el.node.frontmatter && el.node.frontmatter.keywords === 'welcome') &&
            <div key={el.node.id} dangerouslySetInnerHTML={{__html: el.node.html}} />
            )
        )}
      </div>
    </div>

  )
}

export default BlockWelcome
