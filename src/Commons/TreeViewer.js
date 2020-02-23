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
  const RPSTreeView = (props) => {
    function BackUp(){
        const data = props.treeData;
        const fileName = 'RPSdata'+Date.now()
        const exportType = 'json'
        
        exportFromJSON({ data, fileName, exportType })
    }
      return ( 
          <div>       
            <JSONTree data={props.treeData} theme={theme} invertTheme={false} />
            <Row style={{marginTop:'2%'}}>
                <Col></Col>
                <Col ></Col>
                <Col></Col>
                <Col style={{textAlign:'center'}}>
                    <Button size="sm"  onClick={BackUp} variant="success">Download json</Button>
                </Col>
            </Row>
        </div>

       );
  }
   
export default RPSTreeView;



 
