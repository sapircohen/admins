import React, { useEffect } from 'react';
import {Modal,Button,Container,Row,Col} from 'react-bootstrap';
import RPSEditTree from './RPSjsonTreeEdit';


const TreeEditorJson = (props) => {
  useEffect(()=>{
    localStorage.setItem('dataToRestore',JSON.stringify(props.treeData));
  },[])
  return (
    <Modal style={{backgroundColor:'transparent',fontFamily:'Calibri'}} show={props.openpreview} size="xl" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header  style={{margin:'0px auto'}} closeButton>
        <Modal.Title style={{textAlign:'right'}}>
            {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
            <RPSEditTree keyI={props.keyI} treeData={props.treeData}/>
        </Container>
      </Modal.Body>  
      <Modal.Footer style={{justifyContent:'space-between'}}>
        <Col ></Col>
        <Col style={{textAlign:'center'}}>
            <Button onClick={props.close} variant="warning">סגירה</Button>
        </Col>
        <Col ></Col>
      </Modal.Footer>
    </Modal>
  );
}
 
export default TreeEditorJson;


