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
import SmallHeaderForm from '../Commons/SmallHeader';

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
        viewerTitle:'',
        keyI:''
    }
    componentDidMount(){
        this.GetData();
    }
    GetDataView = (institudeName,data)=>{
      this.setState({
            openViewer:true,
            institudeName:institudeName,
            readOnly:false,
            treeData:data,
            viewerTitle:'מידע כללי',
        })
    }
    EditData = (institudeName,data,key)=>{
        
        this.setState({
            openEditor:true,
            institudeName:institudeName,
            readOnly:true,
            treeData:data,
            viewerTitle:'מידע כללי',
            institudeKey:key
        })
    }
    CloseAlert = ()=>{this.setState({alertShow:false},()=>console.log(this.state.alertShow))}
    GetData = ()=>{
        this.setState({
            isReady:false
        },()=>{
            const ref = firebase.database().ref();
            ref.on("value", (snapshot,key)=> {
                let rows=[];
                snapshot.forEach((data)=>{
                    if(data.key==='Data'){
                        let r = {
                            key:data.key,
                            //Name:'מידע כולל',
                            Actions:
                            <div >
                                <Button onClick={()=>this.EditData(data.val().Name,data.val(),data.key)}  style={{marginLeft:'4px'}} variant="success"><FaPencilAlt/></Button>
                                <Button onClick={()=>this.GetDataView(data.key,data.val())} variant="info"><FaRegEye/></Button>
                            </div>
                        };
                        rows.push(r);
                    }
                    else{
                        let r = {
                            key:data.key,
                            //Name:'מידע כולל',
                            Actions:
                            <div >
                                <Button onClick={()=>this.GetDataView(data.key,data.val())} variant="info"><FaRegEye/></Button>
                            </div>
                        };
                        rows.push(r);
                    }
                })
            
                const institudes = {
                    columns: [
                        {
                            label: 'מפתח',
                            field: 'key',
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
                <TreeEditorJson keyI={this.state.keyI} title={this.state.viewerTitle} treeData={this.state.treeData} close={this.closePreview} openpreview={this.state.openEditor}/>
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <AdminNavbar/>
                <SmallHeaderForm title={'עריכת מידע כללי'}/>
                <DatatablePage data={this.state.data}/>
            </div>
        )
    }
}