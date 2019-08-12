import React from 'react';
import firebase from 'firebase';
// import DatatablePage from './DataTable';
import GeneralViewer from './GeneralViewer';
import NavbarProj from './NavBar';
import Loader from 'react-loader-spinner';
import Button from 'react-bootstrap/Button';
import { FaEye } from "react-icons/fa";
import ToggleProject from '../Commons/toggle';
import SAlert from '../Commons/SAlert';
import BDatatable from './BootstrapDatatable';

//consts

let projectsData = [];

export default class AdminPage extends React.Component{
    state={
        alertTitle:'',
        alertText:'',
        alertShow:false,
        alertIcon:'warning',
        data:[],
        isReady:true,
        OpenModal:false,
        projectDetails:'',
        isApproved:true,
        department:'',
        faculty:'',
    }
    componentDidMount(){
        projectsData=[];
        this.setState({
            department:JSON.parse(localStorage.getItem('department')),
            faculty:JSON.parse(localStorage.getItem('faculty'))
        },()=>{
            this.GetData();
        })
    }
    OpenModal = (proj)=>{
        this.setState({OpenModal:true,projectDetails:proj})
    }
    closePreview = ()=>this.setState({OpenModal:false})
    ChangeApproval = (projectKey,newState)=>{
        const ref = firebase.database().ref('RuppinProjects/'+projectKey);
        ref.update({
            isApproved:newState
        })
        .then(()=>{
            if (newState) {
                this.setState({alertShow:true,alertTitle:projectKey,alertText:'הפרויקט מאושר לפרסום',alertIcon:'success'});
            } else {
                this.setState({alertShow:true,alertTitle:projectKey,alertText:'הפרויקט אינו מאושר לפרסום',alertIcon:'warning'});
            }
        })

    }
    CloseAlert = ()=>{this.setState({alertShow:false},()=>console.log(this.state.alertShow))}
    GetData = ()=>{
        this.setState({
            isReady:false,
        },()=>{
            const ref = firebase.database().ref('RuppinProjects');
            ref.once("value", (snapshot,key)=> {
                snapshot.forEach((project)=>{
                    if (project.val().Department===this.state.department && project.val().Faculty ===this.state.faculty && project.val().templateSubmit!==undefined) {
                        console.log(project.val())
                        projectsData.push(project.val());
                    }
                })
                let rows=[];
                projectsData.forEach((proj)=>{
                    let StudentsNames = '';
                    proj.Students.forEach((s,key)=>{
                        if (key===proj.Students.length-1) {
                            StudentsNames+=s.Name;
                        }
                        else StudentsNames+=s.Name+', ';
                    })
                    let r = {
                        GroupName:proj.GroupName,
                        ProjectName:proj.ProjectName,
                        isPublished:proj.isPublished?'כן':'לא',
                        Year:proj.Year,
                        Major:proj.Major,
                        ProjectCourse:proj.ProjectCourse,
                        ProjectTopic:proj.ProjectTopic,
                        Advisor:proj.Advisor&&(proj.Advisor.length===2?proj.Advisor[0]+','+proj.Advisor[1]:proj.Advisor[0]),
                        Students:StudentsNames,
                        projectDetails:<Button onClick={()=>this.OpenModal(proj)} variant="info"><FaEye/></Button>,
                        isApproved:<ToggleProject GroupName={proj.GroupName} isApproved={proj.isApproved} ChangeApproval={this.ChangeApproval}/> ,
                        key:rows.length+1
                    };
                    rows.push(r);
                })
                this.setState({
                    data:rows,
                    isReady:true,
                })
            })
        })
        
    }
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
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <GeneralViewer openpreview={this.state.OpenModal} close={this.closePreview}  projectDetails={this.state.projectDetails}/>
                <NavbarProj/>
                <BDatatable data={this.state.data} key={'Year'} />
            </div>
        )
    }
}