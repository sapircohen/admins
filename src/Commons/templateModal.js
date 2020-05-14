import React, { useState, useEffect } from 'react';
import {Form,Row,Col,Modal,Button} from 'react-bootstrap';

const TemplateModal2 = (props) => {
    const [isMandatory,setIsMandatory] = useState('none');
    const [maximum,setMaximum] = useState('none');
    const [minimum,setMinimum] = useState('none');
    const [alertText,setAlertText] = useState('none');
    const {validator,open} = props;

    useEffect(()=>{
        console.log(props.validator)
        if(props.validator===undefined){
            props.handleClose();
        }
    },[])
    const close =  ()=>{
        props.handleClose();
    }
    const saveData=()=>{
        props.saveData(validator,maximum,minimum,isMandatory,alertText);
        props.handleClose();
    }
    const changeMandatoryField=(evt)=>{
        console.log(evt.target.checked);
        setIsMandatory(evt.target.checked);
    }
    const changeMaximum=(evt)=>{setMaximum(parseInt(evt.target.value))}
    const changeMinimum=(evt)=>{setMinimum(parseInt(evt.target.value))}
    const changeAlert=(evt)=>{setAlertText(evt.target.value)}
    return ( 
        <Modal size="md" show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>{validator.DisplayName}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form.Group>
            <Form.Check defaultChecked={validator.isMandatory} onChange={changeMandatoryField} type="checkbox" label="Mandatory? " />
                </Form.Group>
                {(validator.maximum || validator.maximum===0)&&
                <Form.Group as={Row}>
                    <Form.Label column sm="4">Maximum</Form.Label>
                    <Col sm="8">
                        <Form.Control defaultValue={validator.maximum} onChange={changeMaximum} type="number"/>
                    </Col>
                </Form.Group>}
                {(validator.minimum || validator.minimum===0)&&
                <Form.Group as={Row}>
                    <Form.Label column sm="4">Minimum</Form.Label>
                    <Col sm="8">
                        <Form.Control defaultValue={validator.minimum} onChange={changeMinimum} type="number"/>
                    </Col>
                </Form.Group>}
                {validator.alertText&&
                <Form.Group as={Row}>
                    <Form.Label column sm="4">alert Text</Form.Label>
                    <Col sm="8">
                        <Form.Control defaultValue={validator.alertText} onChange={changeAlert} type="text"/>
                    </Col>
                </Form.Group>}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={close} variant="secondary">Close</Button>
                <Button onClick={saveData} variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default TemplateModal2;
