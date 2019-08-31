import React from 'react';
import {Modal,Button,Container,Row,Col} from 'react-bootstrap';
import RPSEditTree from './RPSjsonTreeEdit';



export default class TreeEditorJson extends React.Component{
    state={
        isIS:false,
        isBS:false,
    }
    componentDidMount(){
      localStorage.setItem('dataToRestore',JSON.stringify(this.props.treeData));
    }
    render(){  
        return (
            <Modal style={{backgroundColor:'transparent',fontFamily:'Calibri'}} show={this.props.openpreview} size="xl" aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header  style={{margin:'0px auto'}} closeButton>
                <Modal.Title style={{textAlign:'right'}}>
                    {this.props.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                    <RPSEditTree keyI={this.props.keyI} treeData={this.props.treeData}/>
                </Container>
              </Modal.Body>  
              <Modal.Footer style={{justifyContent:'space-between'}}>
                <Col ></Col>
                <Col style={{textAlign:'center'}}>
                    <Button onClick={this.props.close} variant="warning">סגירה</Button>
                </Col>
                <Col ></Col>
              </Modal.Footer>
            </Modal>
          );
    }
}

