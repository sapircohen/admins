import React from 'react';
import {Col,Row,Form} from 'react-bootstrap';

const Input = (props)=>{
    return(
        <Row style={{direction:'rtl',padding:'2%',textAlign:'center'}}>
            <Col sm="3">
            </Col>
            <Col sm="2">
                <Form.Label>{props.title}</Form.Label>
            </Col>
            <Col sm="4">
                <Form.Control onChange={e=>props.changedInput(props.title,e)} min={1} max={props.maxNumber} type={props.inputType}/>
            </Col>
            <Col sm="3">
            </Col>
        </Row>
    );
}

export default Input;