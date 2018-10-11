import React, {Component} from 'react';
import {Index} from 'elasticlunr';
import Markdown from 'markdown-to-jsx';
import styled from 'styled-components'
import colors from '../assets/styles/colors'

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
        super(props);
        this.state = {
            query: ``,
            results: [],
        };
    }


    render() {

      const placeholderText =  (e) => {
        if(!this.state.query) {
          e.target.value = ''
        }
      }

      return (
        <div className="d-flex justify-content-around row">
          <div className='col-sm-12 mt-5'>
            <SearchInput type="text" value={this.state.query ? this.state.query : `Search term...`} onClick={placeholderText} onChange={this.search}/>
            <ul className='list-unstyled'>
                {this.state.results.map(page => (
                    <li key={page.id}
                    >
                        <h4 style={{margin:0}}>{page.title}: <small>{page.keywords}</small></h4>
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

    search = (evt) => {
        const query = evt.target.value;
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