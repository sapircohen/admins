import React from 'react';
import firebase from 'firebase';
import NavbarProj from './NavBar';
import Loader from 'react-loader-spinner';
import SmallHeaderForm from '../Commons/SmallHeader';
import DatatablePage from './DataTable';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt,FaPlusSquare,FaGoogleDrive } from "react-icons/fa";
import FormDialog from '../Commons/PopUpModal';
import {Row,Col} from 'react-bootstrap';
import DownloadExcel from '../Commons/ExcelExport';
//consts
const department = JSON.parse(localStorage.getItem('department'));
const faculty = JSON.parse(localStorage.getItem('faculty'));
const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
const GoogleDriveLink = JSON.parse(localStorage.getItem('GoogleDriveLink'));
var advisorsList = [];
var techsList = [];
var projectsData = [];
export default class ChangeData extends React.Component{
    state={
        isReady:true,
        advisors:[],
        dataForGroups:[],
        openModal:false,
        data:[],
        techsData:{},
        modalIndex:0,
        dataSet:[]
    }
    componentDidMount(){
        
        this.getGroupsTable();
        this.getAdvisorsTable();
        if (adminInfo.techs) {
            this.getTechsTable();
        }
    }
    DeleteAdvisor=(key)=>{
        console.log(key)
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty).child('Departments').child(department).child('Advisors').child(key);
        ref.remove();
    }
    DeleteTech=(key)=>{
        console.log(key)
        const ref = firebase.database().ref(adminInfo.techs).child(key);
        ref.remove();
    }
    getAdvisorsTable=()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty).child('Departments').child(department).child('Advisors');
        ref.on("value", (snapshot,key)=> {
            advisorsList=[];
            let rows=[];
            snapshot.forEach((advisor)=>{
                advisorsList.push(advisor.val());
                let r = {
                    Advisor:advisor.val(),
                    Delete:<Button onClick={()=>this.DeleteAdvisor(advisor.key)} variant="danger"><FaTrashAlt/></Button>,
                };
                rows.push(r);
            })
            const advisors = {
                columns: [
                    {
                      label: 'שם המנחה',
                      field: 'ProjectName',
                      sort: 'asc',
                      width: 270
                    },
                    {
                        label: 'פעולות',
                        field: 'Delete',
                        sort: 'asc',
                        width: 270
                    },
                  ],
                rows:rows  
            }
            this.setState({
                data:advisors,
            },()=>console.log(this.state.data))
        })
    }
    getGroupsTable=()=>{
        const ref = firebase.database().ref('RuppinProjects');
        ref.on("value", (snapshot)=> {
            let rows=[];
            snapshot.forEach((project)=>{
                if (project.val().Department===department && project.val().Faculty===faculty && project.val().GroupName) {
                    projectsData.push(project.val());
                    let r = {
                        GroupName:project.val().GroupName,
                        IsOccupied:project.val().ProjectName?'כן':'לא'
                    };
                    rows.push(r);
                }
            })
            const groups = {
                columns: [
                    {
                      label: 'שם הקבוצה',
                      field: 'GroupName',
                      sort: 'asc',
                      width: 200
                    },
                    {
                        label: 'האם בשימוש?',
                        field: 'IsOccupied',
                        sort: 'asc',
                        width: 200
                    },
                  ],
                rows:rows  
            }
            this.setState({
                dataForGroups:groups,
                dataSet:rows,
                isReady:true
            },()=>console.log(this.state.dataForGroups))

        })
    }
    getTechsTable=()=>{
        if (adminInfo.techs!=='') {
            const ref = firebase.database().ref(adminInfo.techs);
            ref.on("value", (snapshot,key)=> {
                techsList=[];
                let techsRows=[];
                snapshot.forEach((tech)=>{
                    techsList.push(tech.val());
                    let r = {
                        TechName:tech.val(),
                        Delete:<Button onClick={()=>this.DeleteTech(tech.key)} variant="danger"><FaTrashAlt/></Button>,
                    };
                    techsRows.push(r);
                })
                const techs = {
                    columns: [
                        {
                            label: 'שם הטכנולוגיה',
                            field: 'TechName',
                            sort: 'asc',
                            width: 270
                        },
                        {
                            label: 'פעולות',
                            field: 'Delete',
                            sort: 'asc',
                            width: 270
                        },
                    ],
                    rows:techsRows  
                }
                this.setState({
                    techsData:techs,
                })
            })
        }
    }
    AddAdvisor = (advisorName)=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty).child('Departments').child(department);
        advisorsList.push(advisorName);
        ref.update({
            Advisors:advisorsList
        })
        .then(()=>this.setState({openModal:false}))
    }
    AddTech = (techName)=>{
        const ref = firebase.database().ref();
        techsList.push(techName);
        console.log(techsList);
        ref.update({
            Technologies:techsList
        })
        .then(()=>this.setState({openModal:false}))
    }
    handleClose=()=>{this.setState({openModal:false})}
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
                <NavbarProj/>
                <FormDialog  modalIndex={this.state.modalIndex} title={this.state.modalTitle} AddTech={this.AddTech} AddAdvisor={this.AddAdvisor} handleClose={this.handleClose} open={this.state.openModal}/>
                <div style={{direction:'rtl',border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',margin:'5%',boxShadow:'5px 10px #888888'}}>
                    <SmallHeaderForm title={'עריכת מנחי הפרויקטים'}/>
                    <Row>
                        <Col style={{textAlign:'center'}} xs='4'>
                            <Button onClick={()=>this.setState({openModal:true,modalTitle:'שם המנחה',modalIndex:1})} variant="success"><FaPlusSquare/>  הוספת מנחה</Button>
                        </Col>
                        <Col xs='4'></Col>
                        <Col xs='4'></Col>
                    </Row>
                    <DatatablePage paging={true} data={this.state.data}/>
                </div>
                <div style={{direction:'rtl',border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',margin:'5%',boxShadow:'5px 10px #888888'}}>
                    <SmallHeaderForm title={'קבוצות'}/>
                    <Row>
                        <Col style={{textAlign:'center'}} xs='4'>
                            <DownloadExcel data={this.state.dataSet} />
                        </Col>
                        <Col xs='4'></Col>
                        <Col style={{textAlign:'center'}} xs='4'>
                            <Button onClick={()=>window.open(GoogleDriveLink)} variant="success"><FaGoogleDrive/> כל הקבוצות</Button>
                        </Col>
                    </Row>
                    <DatatablePage paging={true} data={this.state.dataForGroups}/> 
                </div>
                {adminInfo.techs&&
                <div style={{direction:'rtl',border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',margin:'5%',boxShadow:'5px 10px #888888'}}>
                    <SmallHeaderForm title={'עריכת טכנולוגיות'}/>
                    <Row>
                        <Col style={{textAlign:'center'}} xs='4'>
                            <Button onClick={()=>this.setState({openModal:true,modalTitle:'שם הטכנולוגיה',modalIndex:2})} variant="success"><FaPlusSquare/>  הוספת טכנולוגיה</Button>
                        </Col>
                        <Col xs='4'></Col>
                        <Col xs='4'></Col>
                    </Row>
                    <DatatablePage paging={true} data={this.state.techsData}/>
                </div>
                }
            </div>
        )
    }
}