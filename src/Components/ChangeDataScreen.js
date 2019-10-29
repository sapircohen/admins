import React from 'react';
import firebase from 'firebase';
import NavbarProj from './NavBar';
import Loader from 'react-loader-spinner';
import SmallHeaderForm from '../Commons/SmallHeader';
import DatatablePage from './DataTable';
import Button from 'react-bootstrap/Button';
import {FaEdit, FaTrashAlt,FaPlusSquare,FaGoogleDrive } from "react-icons/fa";
import FormDialog from '../Commons/PopUpModal';
import {Row,Col} from 'react-bootstrap';
import DownloadExcel from '../Commons/ExcelExport';
import { isObject } from 'util';
//consts
const department = JSON.parse(localStorage.getItem('department'));
const faculty = JSON.parse(localStorage.getItem('faculty'));
const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
const GoogleDriveLink = JSON.parse(localStorage.getItem('GoogleDriveLink'));
var advisorsList = [];
var techsList = [];
var hashsList=[];
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
        dataSet:[],
        hashData:[],
        hashKey:'',
        hashName:''
    }
    componentDidMount(){
        this.getGroupsTable();
        this.getAdvisorsTable();
        this.getHashtagsTable();
        if (adminInfo.techs) {
            this.getTechsTable();
        }
    }
    DeleteAdvisor=(key)=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty).child('Departments').child(department).child('Advisors').child(key);
        ref.remove();
    }
    DeleteHashtag=(key)=>{
        if(window.confirm('פעולה זו תמחק את ההאשטג לכל התוצרים שתייגו את הפרויקט שלהם עם ההאשטג הזה. לאחר מכן לא יהיה ניתן לשחזר עבור הפרויקטים את ההאשטג שנמחק, האם להמשיך?')){
            let hashName='';
            let fac2 = '';
            if(faculty==='מנהל עסקים וכלכלה'){
                fac2 = 'כלכלה ומנהל עסקים';
            }
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty).child('HashTags').child(key);
            ref.once('value',(snapshot)=>{
                hashName=snapshot.val().Name;
            }).then(()=>{
                ref.remove()
                .then(()=>{
                    const ref2 = firebase.database().ref('RuppinProjects');
                    ref2.on('value',(snapshot)=>{
                        snapshot.forEach((project)=>{
                            if(project.val().HashTags){
                                if(faculty===project.val().Faculty || fac2===project.val().Faculty){
                                    let ref3 = firebase.database().ref('RuppinProjects').child(project.key).child('HashTags');
                                    ref3.on('value',(snapshot)=>{
                                        snapshot.forEach((hash)=>{
                                            if(isObject(hash.val())){
                                                if(hash.val().value===hashName){
                                                    console.log('same');
                                                    const ref4 =firebase.database().ref('RuppinProjects').child(project.key).child('HashTags');
                                                    ref4.child(hash.key).remove();
                                                 }
                                            }
                                            else{
                                                if(hash.val()===hashName){
                                                    const ref4 =firebase.database().ref('RuppinProjects').child(project.key).child('HashTags');
                                                    ref4.child(hash.key).remove();
                                                }
                                            }
                                        })
                                    })
                                }
                            }
                        })
                    })
                })
                .then(()=>this.setState({openModal:false}))            
            })
        }

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
    getHashtagsTable =()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty).child('HashTags');
        ref.on("value", (snapshot,key)=> {
            let rows=[];
            hashsList=[];
            snapshot.forEach((hash)=>{
                hashsList.push(hash.val());
                let r = {
                    Hashtag:hash.val().Name,
                    Value:hash.val().Value,
                    Actions:
                        (<div>
                            <Button style={{marginLeft:'2%'}} onClick={()=>this.setState({openModal:true,modalTitle:'עריכת האשטג',modalIndex:4,hashKey:hash.key,hashName:hash.val().Name})} variant="warning"><FaEdit/></Button>
                            <Button onClick={()=>this.DeleteHashtag(hash.key)} variant="danger"><FaTrashAlt/></Button>
                        </div>),
                };
                rows.push(r);
            })
            const hashs = {
                columns: [
                    {
                      label: 'האשטג',
                      field: 'ProjectName',
                      sort: 'asc',
                      width: 270
                    },
                    {
                        label: 'מספר מופעים',
                        field: 'Delete',
                        sort: 'asc',
                        width: 270
                    },
                    {
                        label: 'פעולות',
                        field: 'Actions',
                        sort: 'asc',
                        width: 270
                    },
                  ],
                rows:rows  
            }
            this.setState({
                hashData:hashs,
            })
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
    AddHashtag=(hashName)=>{
        let isHashExists = false;
        hashsList.forEach((hash)=>{
            if(hash.Name===hashName){
                isHashExists=true;
            }
        })
        if(!isHashExists){
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty);
            const newHash = {
                Name:hashName,
                Value:1
            }
            hashsList.push(newHash);
            console.log(hashsList);
            ref.update({
                HashTags:hashsList
            })
            .then(()=>this.setState({openModal:false}))
        }
        else{
            this.setState({openModal:false},()=>{
                alert('האשטג כבר קיים');
            })
            
        }
    }
    EditHashtag = (newHashTagName)=>{
        if(window.confirm('פעולה זו תשנה לכל התוצרים שעבורם קיים האשטג בשם הזה לשם החדש, האם להמשיך?')){
            let fac2 = '';
            if(faculty==='מנהל עסקים וכלכלה'){
                fac2 = 'כלכלה ומנהל עסקים';
            }
            const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties').child(faculty).child('HashTags').child(this.state.hashKey);
            ref.update({
                Name:newHashTagName
            })
            .then(()=>{
                const ref2 = firebase.database().ref('RuppinProjects');
                ref2.on('value',(snapshot)=>{
                    snapshot.forEach((project)=>{
                        if(project.val().HashTags){
                            if(faculty===project.val().Faculty || fac2===project.val().Faculty){
                                let ref3 = firebase.database().ref('RuppinProjects').child(project.key).child('HashTags');
                                ref3.on('value',(snapshot)=>{
                                    snapshot.forEach((hash)=>{
                                        if(isObject(hash.val())){
                                            if(hash.val().value===this.state.hashName){
                                                console.log('same');
                                                const ref4 =firebase.database().ref('RuppinProjects').child(project.key).child('HashTags');
                                                ref4.child(hash.key).update({value:newHashTagName,label:newHashTagName})
                                             }
                                        }
                                        else{
                                            if(hash.val()===this.state.hashName){
                                                const ref4 =firebase.database().ref('RuppinProjects').child(project.key).child('HashTags');
                                                ref4.child(hash.key).update({value:newHashTagName,label:newHashTagName})
                                            }
                                        }
                                    })
                                })
                            }
                        }
                    })
                })
            })
            .then(()=>this.setState({openModal:false}))        
        }
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
                <FormDialog modalIndex={this.state.modalIndex} title={this.state.modalTitle} AddHashtag={this.AddHashtag} EditHashtag={this.EditHashtag} AddTech={this.AddTech} AddAdvisor={this.AddAdvisor} handleClose={this.handleClose} open={this.state.openModal}/>
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
                <div style={{direction:'rtl',border:'solid 1px',padding:15,borderRadius:20,backgroundColor:'#fff',margin:'5%',boxShadow:'5px 10px #888888'}}>
                    <SmallHeaderForm title={'עריכת  האשטגים'}/>
                    <Row>
                        <Col style={{textAlign:'center'}} xs='4'>
                            <Button onClick={()=>this.setState({openModal:true,modalTitle:'שם האשטג',modalIndex:3})} variant="success"><FaPlusSquare/>  הוספת האשטג</Button>
                        </Col>
                        <Col xs='4'></Col>
                        <Col xs='4'></Col>
                    </Row>
                    <DatatablePage paging={true} data={this.state.hashData}/>
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