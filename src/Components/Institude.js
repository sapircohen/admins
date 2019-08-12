import React from 'react';
import firebase from 'firebase';
import DatatablePage from './DataTable';
import AdminNavbar from './AdminNavBar';
import Loader from 'react-loader-spinner';
import SAlert from '../Commons/SAlert';
import Button from 'react-bootstrap/Button';
import {FaPencilAlt,FaRegEye} from 'react-icons/fa';
import TreeViewerJson from '../Commons/TreeViewModal';
import TreeEditorJson from '../Commons/RPStreeEditModal';

export default class InstitudePage extends React.Component{
    state={
        alertTitle:'',
        alertText:'',
        alertShow:false,
        alertIcon:'warning',
        data:[],
        isReady:true,
        openViewer:false,
        openEditor:false,
        institudeName:'',
        readOnly:true,
        treeData:{},
        viewerTitle:''
    }
    componentDidMount(){
        this.GetData();
    }
    GetDataOnInstitude = (institudeName,data)=>{
      this.setState({
            openViewer:true,
            institudeName:institudeName,
            readOnly:false,
            treeData:data,
            viewerTitle:institudeName
        })
    }
    EditDataOnInstitude = (institudeName,data)=>{
        this.setState({
            openEditor:true,
            institudeName:institudeName,
            readOnly:true,
            treeData:data,
            viewerTitle:institudeName
        })
    }
    CloseAlert = ()=>{this.setState({alertShow:false},()=>console.log(this.state.alertShow))}
    GetData = ()=>{
        this.setState({
            isReady:false
        },()=>{
            const ref = firebase.database().ref('Data');
            ref.once("value", (snapshot,key)=> {
                let rows=[];
                snapshot.forEach((institude)=>{
                    if (institude.key!=='Admins') {
                        let r = {
                            key:(rows.length+1),
                            Name:institude.val().Name,
                            Actions:
                            <div >
                                <Button onClick={()=>this.EditDataOnInstitude(institude.val().Name,institude.val())}  style={{marginLeft:'4px'}} variant="success"><FaPencilAlt/></Button>
                                {/* <Button style={{marginLeft:'4px'}} variant="danger"><FaRegTrashAlt/></Button> */}
                                <Button onClick={()=>this.GetDataOnInstitude(institude.val().Name,institude.val())} variant="info"><FaRegEye/></Button>
                            </div>
                        };
                        rows.push(r);
                    }
                })
                const institudes = {
                    columns: [
                        {
                            label: 'מספר',
                            field: 'key',
                            sort: 'asc',
                          },
                        {
                          label: 'שם המוסד',
                          field: 'Name',
                          sort: 'asc',
                        },
                        {
                            label: 'פעולות',
                            field: 'Actions',
                            sort: 'asc',
                          },
                      ],
                    rows:rows  
                }
                this.setState({
                    data:institudes,
                    isReady:true,
                },()=>console.log(this.state.data))
            })
        })
    }
    closePreview = ()=>this.setState({openViewer:false,openEditor:false})

    render(){
        if(!this.state.isReady){
            return(
              <div style={{flex:1,marginTop:'20%',textAlign:'center'}}>
                <Loader 
                type="Watch"
                color="#58947B"
                height="100"	
                width="100"
                />  
              </div> 
            )
        }
        return(
            <div>
                <TreeViewerJson title={this.state.viewerTitle} treeData={this.state.treeData} close={this.closePreview} openpreview={this.state.openViewer}/>
                <TreeEditorJson title={this.state.viewerTitle} treeData={this.state.treeData} close={this.closePreview} openpreview={this.state.openEditor}/>
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <AdminNavbar/>
                <DatatablePage data={this.state.data}/>
            </div>
        )
    }
}