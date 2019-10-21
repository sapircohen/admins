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
import { isArray } from 'util';
import ModalExample1 from './ModalExample';
import NavbarPage from './NavbarExample';
import MenuExampleInvertedSecondary from './NavbarExample';

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
        console.log(projectKey);
        console.log(newState);
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
                    if (project.val().Department===this.state.department && project.val().Faculty ===this.state.faculty && project.val().ProjectName) {
                        project={
                            val:project.val(),
                            key:project.key
                        }
                        projectsData.push(project);
                    }
                })
                let rows=[];
                projectsData.forEach((proj)=>{
                    let StudentsNames = '';
                    if(proj.val.Students)
                    {proj.val.Students.forEach((s,key)=>{
                        if (key===proj.val.Students.length-1) {
                            StudentsNames+=s.Name;
                        }
                        else StudentsNames+=s.Name+', ';
                    })}
                    const d = new Date(proj.val.Year);
                    const date = d.getFullYear();
                    let r = {
                        GroupName:proj.key,
                        ProjectName:proj.val.ProjectName,
                        isPublished:proj.val.isPublished?'כן':'לא',
                        Year:date,
                        Major:proj.val.Major,
                        ProjectCourse:proj.val.ProjectCourse,
                        ProjectTopic:proj.val.ProjectTopic,
                        Advisor:proj.val.Advisor&&(!isArray(proj.val.Advisor)?proj.val.Advisor:(proj.val.Advisor.length===2?proj.val.Advisor[0]+','+proj.val.Advisor[1]:proj.val.Advisor[0])),
                        Students:StudentsNames,
                        projectDetails:<Button onClick={()=>this.OpenModal(proj.val)} variant="info"><FaEye/></Button>,
                        isApproved:<ToggleProject GroupName={proj.key} isApproved={proj.val.isApproved} ChangeApproval={this.ChangeApproval}/> ,
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
                {/* <GeneralViewer openpreview={this.state.OpenModal} close={this.closePreview}  projectDetails={this.state.projectDetails}/> */}
                <ModalExample1 openpreview={this.state.OpenModal} close={this.closePreview}  projectDetails={this.state.projectDetails}/>
                <NavbarProj/>
                {/* <MenuExampleInvertedSecondary/> */}
                <BDatatable data={this.state.data} key={'Year'} />
            </div>
        )
    }
}