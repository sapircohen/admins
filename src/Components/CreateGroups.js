import React from 'react';
import SmallHeaderForm from '../Commons/SmallHeader';
import Select from '../Commons/FormSelect';
import NavbarPage from './AdminNavBar';
import Input from '../Commons/FormInput';
import firebase from 'firebase';
import {Button,Col,Row} from 'react-bootstrap'
import SAlert from '../Commons/SAlert';
import DatatablePage from './DataTable';
import DownloadExcelGroups from '../Commons/ExcelExport2';

const titles = {
    InstituteTitle:'מוסד',
    FacultyTitle:'פקולטה',
    MajorTitle:'התמחות',
    DepartmentTitle:'מחלקה',
    password:'סיסמה',
    numberOfGroups:'מספר הקבוצות'
}



export default class GroupsCreation extends React.Component{
    state={
        alertTitle:'',
        alertText:'',
        alertShow:false,
        alertIcon:'warning',
        faculty:'',
        institute:'',
        major:'',
        department:'',
        departmentList:[],
        facultyList:[],
        instituteList:[],
        majorList:[],
        password:'',
        groupNames:[],
        data:{},
        numberOfGroups:'',
        showData:false,
        showForm:true,
        signature:'',
        lastGroupIndex:0,
        dataSet:[]
    }
    componentDidMount(){
        this.GetInstitutes();
    }
    GetInstitutes=()=>{
        const ref = firebase.database().ref('Data');
        let instituts = [];
        ref.once("value",(snapshot)=>{
            snapshot.forEach((institute)=>{
                if (institute.key!=='Admins') {
                    instituts.push(institute.key);
                }
            })
        }).then(()=>{
            this.setState({
                instituteList:instituts
            })
        })
    }
    GetFaculties = (instituteName)=>{
        if(instituteName!=='בחר'){
            this.setState({institute:instituteName,facultyList:[],departmentList:[],majorList:[]},()=>{
                const ref = firebase.database().ref('Data').child(this.state.institute).child('Faculties');
                let faculties = [];
                ref.once("value",(snapshot)=>{
                    snapshot.forEach((fac)=>{
                        faculties.push(fac.key);
                    })
                    this.setState({
                        facultyList:faculties
                    })
                })
            })
        }
        else{
            this.setState({facultyList:[],departmentList:[],majorList:[]})
        }
    }
    GetDepartments =  (faculatyName)=>{
        if(faculatyName!=='בחר'){
            this.setState({faculty:faculatyName,departmentList:[],majorList:[]},()=>{
                const ref = firebase.database().ref('Data').child(this.state.institute).child('Faculties').child(this.state.faculty).child('Departments');
                let Departments = [];
                ref.once("value",(snapshot)=>{
                    snapshot.forEach((dep)=>{
                        Departments.push(dep.key);
                    })
                    this.setState({
                        departmentList:Departments
                    })
                })
            })
        }
        else{
            this.setState({departmentList:[],majorList:[]})
        }
    }
    GetMajors =  (departmentName)=>{
        if(departmentName!=='בחר'){
            this.setState({department:departmentName,majorList:[]},()=>{
                const ref = firebase.database().ref('Data').child(this.state.institute).child('Faculties').child(this.state.faculty).child('Departments').child(this.state.department).child('Experties');
                let majors = [];
                ref.once("value",(snapshot)=>{
                    snapshot.forEach((maj)=>{
                        majors.push(maj.key);
                    })
                    this.setState({
                        majorList:majors
                    })
                })
            })
        }
        else{
            this.setState({majorList:[]})
        }
    }
    GetSignature = (majorName)=>{
        this.setState({major:majorName},()=>{
            const ref = firebase.database().ref('Data').child(this.state.institute).child('Faculties').child(this.state.faculty).child('Departments').child(this.state.department).child('Experties').child(majorName);
            ref.once("value",(snapshot)=>{
                this.setState({
                    signature:snapshot.val().Signature,
                    lastGroupIndex:parseInt(snapshot.val().LastGroupIndex)
                },()=>console.log("signature: "+this.state.signature))
            })
        })
    }
    //when selected inputs changes
    SelectedInputChange = (name,input)=>{
        switch (name) {
            case titles.InstituteTitle:
                this.GetFaculties(input.target.value);
                break;
            case titles.FacultyTitle:
                this.GetDepartments(input.target.value);
                break;
            case titles.DepartmentTitle:
                this.GetMajors(input.target.value);
                break;
            case titles.MajorTitle:
                this.GetSignature(input.target.value);
                break;
            default:
                break;
        }
    }
    //when text inputs changes
    InputChange = (title,input)=>{
        switch (title) {
            case titles.password:
                this.setState({password:input.target.value})
                break;
            case titles.numberOfGroups:
                this.setState({numberOfGroups:input.target.value})
                break;
            default:
                break;
        }
    }
    ValidateInputs = ()=>{
        let valid = true;
        if (this.state.institute===''||this.state.institute==='בחר') {
            this.setState({alertShow:true,alertTitle:'שים לב',alertText:'בחר מוסד',alertIcon:'warning'});
            valid=false;
        }
        else if (this.state.faculty===''||this.state.faculty==='בחר') {
            this.setState({alertShow:true,alertTitle:'שים לב',alertText:'בחר פקולטה',alertIcon:'warning'});
            valid=false;
        }
        else if (this.state.department===''||this.state.department==='בחר') {
            this.setState({alertShow:true,alertTitle:'שים לב',alertText:'בחר מחלקה',alertIcon:'warning'});
            valid=false;
        }
        else if (this.state.major===''||this.state.major==='בחר') {
            this.setState({alertShow:true,alertTitle:'שים לב',alertText:'בחר התמחות',alertIcon:'warning'});
            valid=false;
        }
        else if (this.state.password==='') {
            this.setState({alertShow:true,alertTitle:'שים לב',alertText:'בחר סיסמה לקבוצות',alertIcon:'warning'});
            valid=false;
        }
        else if (this.state.numberOfGroups==='') {
            this.setState({alertShow:true,alertTitle:'שים לב',alertText:'בחר מספר קבוצות',alertIcon:'warning'});
            valid=false;
        }
        else if(this.state.signature===''|| this.state.signature===undefined){
            this.setState({alertShow:true,alertTitle:'שים לב',alertText:'אין חתימה לקבוצה, פנה לספיר',alertIcon:'warning'});
            valid=false;
        }
        return valid;
    }
    GenerateGroupsData = (event)=>{
        event.preventDefault();
        if(!this.ValidateInputs()){
            return;
        }
        this.CreateDataTableView();
    }
    CreateDataTableView = ()=>{
        let rows = [];
        const numberOfGroups = parseInt(this.state.numberOfGroups) + parseInt(this.state.lastGroupIndex);
        for (let index = this.state.lastGroupIndex; index < numberOfGroups; index++) {
            let r = {
                GroupName:this.state.signature+index,
                Password:this.state.password
            };
            rows.push(r);
        }
        this.setState({groupNames:rows});
        const groups = {
            columns: [
                {
                    label: 'שם הקבוצה',
                    field: 'GroupName',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'סיסמה',
                    field: 'Password',
                    sort: 'asc',
                    width: 270
                },
            ],
            rows:rows  
        }
        this.setState({
            data:groups,
            showData:true,
            alertShow:true,alertTitle:'קבוצות חדשות',alertText:'אנא אשר את פתיחת הקבוצות',alertIcon:'success',
            dataSet:rows
        })
    }
    SaveGroups = ()=>{
        //save groups to firebase
        let ins = this.state.institute;
        if(this.state.institute==="Ruppin"){
            ins = "המרכז האקדמי רופין";
        }
        const rootRef = firebase.database().ref().child('RuppinProjects');
        const numberOfGroups = parseInt(this.state.numberOfGroups) + parseInt(this.state.lastGroupIndex);
        for (let index = this.state.lastGroupIndex; index < numberOfGroups; index++) {
            let project = {
                GroupName: this.state.signature+index,
                Faculty: this.state.faculty,
                Institute: ins,
                Department: this.state.department,
                Major: this.state.major,
                Password: parseInt(this.state.password),
            }
            rootRef.child(project.GroupName).set(project)
            .then(()=>{
                this.setState({
                    alertShow:true,alertTitle:'קבוצות חדשות',alertText:'הקבוצות נפתחו בהצלחה',alertIcon:'success',
                })
            })
            .catch((error)=>{
                this.setState({
                    alertShow:true,alertTitle:'קבוצות חדשות',alertText:'קרתה בעיה בעת יצירת קבוצות',alertIcon:'danger',
                })
            })
        }
        const ref = firebase.database().ref().child('Data').child(this.state.institute).child('Faculties').child(this.state.faculty).child('Departments').child(this.state.department).child('Experties').child(this.state.major);
        ref.update({
            LastGroupIndex:numberOfGroups
        })
    }
    CloseAlert=()=>{this.setState({alertShow:false})}
    render(){
        return(
            <div>
                <SAlert alertIcon={this.state.alertIcon} CloseAlert={this.CloseAlert} show={this.state.alertShow} title={this.state.alertTitle} text={this.state.alertText}/>
                <NavbarPage/>
                {
                this.state.showForm&&
                <div style={{border:'solid 1px',padding:15,borderRadius:20,margin:60,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                    <SmallHeaderForm title={'יצירת קבוצות חדשות'}/>
                    <Select changedInput={this.SelectedInputChange} list={this.state.instituteList} title={titles.InstituteTitle}/>
                    <Select changedInput={this.SelectedInputChange} list={this.state.facultyList} title={titles.FacultyTitle}/>
                    <Select changedInput={this.SelectedInputChange} list={this.state.departmentList}  title={titles.DepartmentTitle}/>
                    <Select changedInput={this.SelectedInputChange} list={this.state.majorList} title={titles.MajorTitle}/>
                    <Input changedInput={this.InputChange} inputType={"text"} title={titles.password}/>
                    <Input changedInput={this.InputChange} maxNumber={500} inputType={"number"} title={titles.numberOfGroups}/>
                    <Row>
                        <Col sm="4"></Col>
                        <Col style={{textAlign:'center'}} sm="4">
                            <Button onClick={this.GenerateGroupsData} variant='success'>
                                המשך
                            </Button>
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                </div>
                }
                {
                this.state.showData&&
                <div style={{border:'solid 1px',padding:15,borderRadius:20,margin:60,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                    <SmallHeaderForm title={'הקבוצות'}/>
                    <Row>
                        <Col xs='4'></Col>
                        <Col xs='4'></Col>
                        <Col style={{textAlign:'center'}} xs='4'>
                            <DownloadExcelGroups data={this.state.dataSet} />
                        </Col>
                    </Row>
                    <DatatablePage paging={true} data={this.state.data}/>
                    <Row>
                        <Col sm="4"></Col>
                        <Col style={{textAlign:'center'}} sm="4">
                            <Button onClick={this.SaveGroups} variant='success'>
                                צור קבוצות
                            </Button>
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                </div>
                }
            </div>
        );
    }
}