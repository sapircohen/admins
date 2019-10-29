import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component{
    state={
        text:''
    }
    SetName=(e)=>{
        this.setState({
            text:e.target.value
        })
    }
    SaveData=()=>{
        switch (this.props.modalIndex) {
            case 1:
                this.props.AddAdvisor(this.state.text);
                break;
            case 2:
                this.props.AddTech(this.state.text);
                break;
            case 3:
                this.props.AddHashtag(this.state.text);
                break;
            case 4:
                this.props.EditHashtag(this.state.text);
                break;
            default:
                break;
        }
    }
    render(){
    return (
        <div>
        <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{textAlign:'right'}} id="form-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent>
            <TextField
                dir='rtl'
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                onChange={this.SetName}
            />
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