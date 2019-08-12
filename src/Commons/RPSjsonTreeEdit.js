import React from 'react';
import {FaPlus,FaEdit} from 'react-icons/fa';
import {MdHighlightOff,MdAddCircleOutline} from 'react-icons/md'
import {
    JsonTree,
} from 'react-editable-json-tree';
import Button from 'react-bootstrap/Button';
import SAlert from './SAlert';

export default class RPSEditTree extends React.Component{
    state={
        data:{},
        resotreDate:{},
        alertIcon:'info',
        alertShow:false,
        alertTitle:'Change data?',
        alertText:'are u sure?',
        remove:false
    }
    componentDidMount(){
        this.setState({data:this.props.treeData,resotreDate:this.props.treeData})
    }
    // BeforeRemove = (event)=>{
    //     event.preventDefault();
    //     this.setState({alertShow:true},()=>{
    //         if (!this.state.remove) {
    //             return;
    //         }
    //     })
    // }
    CloseAlert=()=>{
        this.setState({alertShow:false,remove:true},()=>{
            new Promise((resolve,reject) => {
                console.log(this.state.remove);
                if (!this.state.remove) {
                    reject();
                }
                else resolve()
            })
        })
    }

    CancelAlert=()=>{
        this.setState({remove:false,alertShow:false},()=>{
            new Promise((resolve,reject) => {
                console.log(this.state.remove);
                if (!this.state.remove) {
                    reject();
                }
                else resolve()
            })
        })
    }
    RemoveElement=(key, keyPath, deep, oldValue)=>{
        this.setState({alertShow:true});
        console.log(key,keyPath,deep,oldValue);
    }
    render(){
        return(
            <div>
                <SAlert CancelAlert={this.CancelAlert} showCancel={true} alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <JsonTree 
                    beforeRemoveAction={this.RemoveElement}
                    // onClick={this.BeforeRemove}
                    minusMenuElement={<span variant="danger"><MdHighlightOff /></span>} 
                    plusMenuElement={<span onClickCapture={()=>{this.setState({alertShow:true})}} variant="success"><MdAddCircleOutline/></span>}
                    editButtonElement={<Button variant="info"><FaEdit/></Button>} style={{fontSize:'20px'}} 
                    cancelButtonElement={<Button style={{marginRight:'2px'}} variant="danger"><MdHighlightOff size={20}/></Button>} 
                    addButtonElement={<Button variant="success"><FaPlus/></Button>} data={this.state.data} 
                />
            </div>
        )
    }
}
