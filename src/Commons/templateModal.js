import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TemplateModal extends React.Component{
    state={
        text:''
    }
    SaveData=()=>{
        alert('thanks')
    }
    render(){
    return (
        <div>
        <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{textAlign:'right'}} id="form-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent>
            
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