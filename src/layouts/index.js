import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Index } from 'elasticlunr';


import Header from '../components/header'
import Nav from '../components/nav'
import Search from '../components/search'
import './index.css'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      langToggle: false,
      language: '',
      query: ``,
      results: []
    }
  }

  changeLanguage(lang) {
    console.log(lang)
    this.setState(
      {language: lang}
    );
  }

  toggleLanguageButtonState() {
    this.setState(prevState => ({
      langToggle: !prevState.langToggle
    }));
  }

  getLangs() {
    if(this.state.langToggle) {
      this.toggleLanguageButtonState();
      let pathArray = location.pathname.split('/');
      pathArray = pathArray.filter( (n) => n != "" ); //just get the actual directories
      const clickedLang = this.state.language;
      if (pathArray[0] === clickedLang) return;
      return this.replaceLangDirectory({pathArray, clickedLang})
    }
  }

  replaceLangDirectory(pathArray) {
    pathArray.pathArray.splice(0, 1, `${this.state.language}`);
    this.rebuildPathAndRedirect(pathArray);
  }
  
  rebuildPathAndRedirect(pathArray) {
    let newPath = '';
    pathArray.pathArray.forEach( (e) => {
      newPath += '/';
      newPath += e;
    });
    console.log('final', newPath)
    window.location = newPath;
  }

  componentDidUpdate() {
    this.getLangs();
  }


  render() {
    const {children, data} = this.props;
    console.log('1', Object.assign({}, this.props))
    return (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header 
          data ={data}
          siteTitle={data.site.siteMetadata.title} 
          changeLanguage={this.changeLanguage.bind(this)}
          toggleLanguageButtonState={this.toggleLanguageButtonState.bind(this)}
        />
        <Nav language={this.state.language}/>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children()}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

// Graphql query used to retrieve the serialized search index and siteTitle
export const pageQuery = graphql`
  query SearchIndexExampleQueryAndSiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
    siteSearchIndex {
      index
    }
  }`;
