import React from 'react';
import {Modal,Button,Container,Row,Col} from 'react-bootstrap';
import RPSTreeView from './TreeViewer';



export default class TreeViewerJson extends React.Component{
    state={
        isIS:false,
        isBS:false,
    }
    componentDidUpdate(){
        console.log(this.props.treeData)
    }
    render(){  
        return (
            <Modal style={{backgroundColor:'transparent',fontFamily:'Calibri'}} onHide={this.props.close} show={this.props.openpreview} size="xl" aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header  style={{margin:'0px auto'}} closeButton>
                <Modal.Title style={{textAlign:'right'}}>
                    {this.props.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                    <RPSTreeView treeData={this.props.treeData}/>
                </Container>
              </Modal.Body>  
              <Modal.Footer style={{justifyContent:'space-between'}}>
                <Col sm='4'></Col>
                <Col sm='4' style={{textAlign:'center'}}>
                    <Button onClick={this.props.close} variant="warning">סגירה</Button>
                </Col>
                <Col sm='4'></Col>
              </Modal.Footer>
            </Modal>
          );
    }
}

