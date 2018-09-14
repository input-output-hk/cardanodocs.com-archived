import React, {Component} from 'react';
import {Index} from 'elasticlunr';
import Markdown from 'markdown-to-jsx';

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
      console.log('data',this.props)
        return (
            <div
            style={{
              position: 'relative'
            }}
            >
                <input type="text" value={this.state.query} onChange={this.search}/>
                <ul 
                  style={{
                    position: 'absolute',
                    top: '2em',
                    left: '-1.4em',
                    listStyleType: 'none',
                    background: '#e5e5e5',
                    width: 500,                              
                    opacity: 0.8,
                    border: `${this.state.results.length > 0 ? '1px solid darkgrey' : 'none'}`
                  }}
                >
                    {this.state.results.map(page => (
                        <li key={page.id}
                        >
                            <h4 style={{margin:0}}>{page.title}: <small>{page.keywords}</small></h4>
                            <Markdown options={{ forceInline: true }}>
                              {page.excerpt}
                            </Markdown>
                        </li>
                    ))}
                </ul>
            </div>
        );
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