import React from 'react';
import {FaPlus,FaEdit} from 'react-icons/fa';
import {MdHighlightOff,MdAddCircleOutline} from 'react-icons/md'
import {
    JsonTree,
} from 'react-editable-json-tree';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from 'firebase';
import exportFromJSON from 'export-from-json'

export default class RPSEditTree extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.treeData,
            alertIcon:'info',
            alertShow:false,
            alertTitle:'Change data?',
            alertText:'are u sure?',
        }
    }
    componentDidMount(){
        const data = this.props.treeData;
        const fileName = 'RPSdata'+Date.now()
        const exportType = 'json'
        
        exportFromJSON({ data, fileName, exportType })
    }
    onFullyUpdate(newJson) {
        this.setState({
            data: newJson
        });      
    }
    RestoreData = ()=>{
        this.setState({
            data:JSON.parse(localStorage.getItem('dataToRestore'))
        },()=>{
            console.log(this.state.data);
        })
    }
    beforeRemoveAction = (key, keyPath, deep, oldValue) => window.confirm('are u sure?') ? new Promise(resolve => resolve()):new Promise(reject => false)

    SaveData = ()=>{
        
       if( window.confirm('save data to firebase?')){
            const ref = firebase.database().ref();
            ref.update({
                Data:this.state.data
            })
            .then(()=>{
                alert('saved successfully')
            })

       }
    }
    // beforeUpdateAction(){
    //     localStorage.setItem('dataOneStepBefore',JSON.stringify(this.state.data))
    //     new Promise(resolve => resolve())
    // }
    // BackUp=()=>{
    //     this.setState({
    //         data:JSON.parse(localStorage.getItem('dataOneStepBefore'))
    //     },()=>{
    //         console.log(this.state.data);
    //     })
    // }
    render(){
        return(
            <div>
                <JsonTree 
                    beforeRemoveAction={this.beforeRemoveAction}
                    onFullyUpdate={this.onFullyUpdate.bind(this)}
                    minusMenuElement={<span variant="danger"><MdHighlightOff /></span>} 
                    plusMenuElement={<span variant="success"><MdAddCircleOutline/></span>}
                    editButtonElement={<Button variant="info"><FaEdit/></Button>} style={{fontSize:'20px'}} 
                    cancelButtonElement={<Button style={{marginRight:'2px'}} variant="danger"><MdHighlightOff size={20}/></Button>} 
                    addButtonElement={<Button variant="success"><FaPlus/></Button>}
                    save = {this.props.SaveData} 
                    data={this.state.data} 
                />
                <Row style={{marginTop:'2%'}}>
                    <Col></Col>
                    <Col ></Col>
                    {/* <Col style={{textAlign:'center'}}>
                        <Button size="sm"  onClick={this.SaveData} variant="success">שמירה</Button>
                    </Col> */}
                    {/* <Col style={{textAlign:'center'}}>
                        <Button size="sm" onClick={this.RestoreData} variant="info">שחזר למידע לפני שינויים</Button>
                    </Col> */}
                    <Col></Col>
                    <Col style={{textAlign:'center'}}>
                        <Button size="sm"  onClick={this.SaveData} variant="success">שמירה</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
