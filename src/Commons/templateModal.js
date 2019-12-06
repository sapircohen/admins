import React from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle} from '@material-ui/core';
import {Form,Row,Col} from 'react-bootstrap';

export default class TemplateModal extends React.Component{
    state={
        isMandatory:'',
        maximum:'',
        minimum:''
    }
    SaveData=()=>{
        this.props.saveData(this.props.validator,this.state.maximum,this.state.minimum,this.state.isMandatory)
    }
    changeMandatoryField=(evt)=>{
        this.setState({isMandatory:evt.target.checked},()=>console.log(this.state.isMandatory))
    }
    changeMaximum=(evt)=>{this.setState({maximum:parseInt(evt.target.value)})}
    changeMinimum=(evt)=>{this.setState({minimum:parseInt(evt.target.value)})}
    render(){
    return (
        <div>
        <Dialog keepMounted open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{textAlign:'right'}} id="form-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent>
                <Form.Group>
                    <Form.Check defaultChecked={this.props.validator.isMandatory} onChange={this.changeMandatoryField} type="checkbox" label="Mandatory? " />
                </Form.Group>
                {this.props.validator.maximum&&
                <Form.Group as={Row}>
                    <Form.Label column sm="4">Maximum</Form.Label>
                    <Col sm="8">
                        <Form.Control defaultValue={this.props.validator.maximum} onChange={this.changeMaximum} type="number"/>
                    </Col>
                </Form.Group>}
                {this.props.validator.minimum&&
                <Form.Group as={Row}>
                    <Form.Label column sm="4">Minimum</Form.Label>
                    <Col sm="8">
                        <Form.Control defaultValue={this.props.validator.minimum} onChange={this.changeMinimum} type="number"/>
                    </Col>
                </Form.Group>}
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={this.SaveData} color="primary">
                    שמירה
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );}
}