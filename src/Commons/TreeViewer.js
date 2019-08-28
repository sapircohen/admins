import React from 'react';
import JSONTree from 'react-json-tree';
import exportFromJSON from 'export-from-json';
import {Row,Col,Button} from 'react-bootstrap';

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
    BackUp(){
        const data = this.props.treeData;
        const fileName = 'RPSdata'+Date.now()
        const exportType = 'json'
        
        exportFromJSON({ data, fileName, exportType })
    }
    render(){
        return (
            // RENDER THE COMPONENT
            <div>
                <JSONTree data={this.props.treeData} theme={theme} invertTheme={false} />
                <Row style={{marginTop:'2%'}}>
                    <Col></Col>
                    <Col ></Col>
                    {/* <Col style={{textAlign:'center'}}>
                        <Button size="sm"  onClick={this.SaveData} variant="success">שמירה</Button>
                    </Col> */}
                    {/* <Col style={{textAlign:'center'}}>
                        <Button size="sm" onClick={this.RestoreData} variant="info">שחזר למידע לפני שינויים</Button>
                    </Col> */}
                    <Col></Col>
                    <Col style={{textAlign:'center'}}>
                        <Button size="sm"  onClick={this.BackUp.bind(this)} variant="success">Download json</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

 
// Inside a React component:

 
