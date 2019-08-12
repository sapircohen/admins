import React from 'react';
import JSONTree from 'react-json-tree'
// If you're using Immutable.js: `npm i --save immutable`
const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
  };
export default class RPSTreeView extends React.Component {
    render(){
        return (
            // RENDER THE COMPONENT
            <JSONTree data={this.props.treeData} theme={theme} invertTheme={false} />
        );
    }
}

 
// Inside a React component:

 
