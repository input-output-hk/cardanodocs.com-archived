import React, {Component} from 'react'
import Link from 'gatsby-link'
import {Index} from 'elasticlunr'
import Markdown from 'markdown-to-jsx'
import Mark from '../../static/mark'
import styled from 'styled-components'
import colors from '../assets/styles/colors'
import {language} from '../assets/utils/language'
import Chevron from '../assets/images/chevron.svg'



const SearchInput = styled.input`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.$teal};
  color: ${colors.$white};
  outline:none;
  font-size: 1rem;
  margin-bottom: 2rem;
`

// Search component
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ``,
            results: [],
        };
    }

    performMark (input, instance) {
      const keyword = input.value;
      instance.unmark({
        done: () => {
          instance.mark(keyword, null);
        }
      });
    }

    componentDidUpdate () {
      const markInstance = new Mark(document.querySelector(".context"))
      const keywordInput = document.querySelector("input[name='keyword']")
      this.performMark(keywordInput, markInstance)
    }

    render() {

      const placeholderText =  (e) => {
        if(!this.state.query) {
          e.target.value = ''
        }
      }

      const searchTextLang = () => {
        return (language === 'en' ? `Search term...` : `搜索词`)
      }

      return (
        <div className="d-flex justify-content-around row">
          <div className='col-sm-12 mt-5'>
            <SearchInput type="text" value={this.state.query ? this.state.query : searchTextLang()} onClick={placeholderText} onChange={this.search} name='keyword'/>
          </div>
          <div className="col-sm-24">
            <ul className='list-unstyled'>
                  {this.state.results.map(page => (
                      <li key={page.id} className='context'>
                          <Link to={page.path}>
                            <h4 style={{margin:0}}>{page.title} <small>{page.keywords}</small> <img src={Chevron} alt="angle" style={{maxWidth:'9px'}}/></h4>
                          </Link>
                          <Markdown options={{ forceInline: true }}>
                            {page.excerpt}
                          </Markdown>
                          <hr/>
                      </li>
                  ))}
              </ul>
          </div>
        </div>
      )
    }

    getIndex = () => {
      // Create an elastic lunr index and hydrate with graphql query results
      this.index = this.index || Index.load(this.props.data.siteSearchIndex.index);
      return this.index;
    }

    search = (e) => {
        const query = e.target.value;
        this.index = this.getIndex();
        this.setState({
            query,
            // Query the index with search string to get an [] of IDs
            results: this.index.search(query)
                // Map over each ID and return the full document
                .map(({
                ref,
                }) => this.index.documentStore.docs[ref]),
        });
    }
}