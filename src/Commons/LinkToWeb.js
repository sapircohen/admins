import React from 'react';
import {Button,Col} from 'react-bootstrap';

const LinkButton = (props)=>{
    return(
        <Col sm="3" style={{textAlign:'center'}}>
            <Button style={{backgroundColor:props.color,borderColor:props.color}} onClick={()=>window.open(props.href,"_blank")} >
                <props.Icon/>
                {props.Title}
            </Button>
        </Col>
    )
}
export default LinkButton;