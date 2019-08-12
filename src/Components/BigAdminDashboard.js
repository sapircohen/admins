import React from 'react';
import AdminNavbar from './AdminNavBar';
import BarGraph from '../Commons/BarGraph';
import {Row,Col} from 'react-bootstrap';
import SmallHeaderForm from '../Commons/SmallHeader';
import RPSPieChart from '../Commons/PieChart';
import KPI from '../Commons/KPI';
import firebase from 'firebase';
import Select from '../Commons/FormSelect';

//dashboard 


const titles = {
    instituteChoice:'בחר מוסד',
    facultyChoice:'פקולטה',
}
export default class Dashboard extends React.Component{
    state={
        projectsCount:'',
        projectFacultyPie:[],
        institutePieTitle:'בחר',
        instituteList:[]
    }
    componentDidMount(){
        this.GetDataForBarCharts();
        this.GetDataForKPI();
        this.GetDataForPieCharts();
        this.GetInstituteList();
    }
    GetDataForBarCharts=()=>{

    }
    GetDataForKPI=()=>{
        this.GetProjectCount();
    }
    GetDataForPieCharts=()=>{
        this.GetFacultiesProjectsCount();
    }
    GetInstituteList = ()=>{
        const ref = firebase.database().ref('Data');
        let institutes=[];
        ref.once("value", (snapshot,key)=> {
            snapshot.forEach((institute)=>{
                if(institute.key!=='Admins'){
                    institutes.push(institute.key);
                }
            })
        })
        .then(()=>{
            this.setState({instituteList:institutes});
        })
    }
    GetFacultiesProjectsCount = ()=>{
        const ref = firebase.database().ref('Data').child(this.state.institutePieTitle).child('Faculties');
        let faculties = [];
        ref.once("value", (snapshot,key)=> {
            snapshot.forEach((faculty)=>{
                faculties.push(faculty.val().Name);
            })
        })
        .then(()=>{
            console.log('second ref')
            const secondRef = firebase.database().ref('RuppinProjects');
            let dataForFac = [];
            secondRef.once("value", (snapshot,key)=> {
                faculties.forEach((fac)=>{
                    let counter = 0;
                    snapshot.forEach((project)=>{
                        if (project.val().ProjectName && project.val().Faculty===fac) {
                            counter++;
                        }
                    })
                    dataForFac.push({name:fac,value:counter})
                })
                this.setState({projectFacultyPie:dataForFac})
            })
        })
    }
    GetProjectCount = ()=>{
        const ref = firebase.database().ref('RuppinProjects');
        let counter = 0;
        ref.once("value", (snapshot,key)=> {
            snapshot.forEach((project)=>{
                if (project.val().ProjectName) {
                    counter++;
                }
            })
        })
        .then(()=>{
            this.setState({
                projectsCount:counter
            })
        })
    }
    //when selected inputs changes
    SelectedInputChange = (name,input)=>{
        switch (name) {
            case titles.instituteChoice:
                this.setState({institutePieTitle:input.target.value},()=>{this.GetFacultiesProjectsCount()});
                break;
            case titles.facultyChoice:
                this.GetDepartments(input.target.value);
                break;
            default:
                break;
        }
    }
    render(){
        return(
            <div>
                <AdminNavbar/>
                <Row style={{marginTop:'2%',textAlign:'-webkit-center',direction:'rtl'}}>
                    <Col>
                        <KPI title='מספר הפרויקטים באתר' kpi={this.state.projectsCount}/>
                    </Col>
                    <Col >
                        <KPI/>
                    </Col>
                    <Col >
                        <KPI/>
                    </Col>
                </Row>
                <Row style={{marginTop:'1%',textAlign:'-webkit-center'}}>
                    <Col >
                        <SmallHeaderForm title={'מספר פרויקטים לפי פקולטות'} />
                        <Select value={this.state.institutePieTitle} changedInput={this.SelectedInputChange} list={this.state.instituteList} title={titles.instituteChoice}/>
                        <RPSPieChart data={this.state.projectFacultyPie}/>
                    </Col>
                </Row>
                <Row style={{marginTop:'1%',textAlign:'-webkit-center'}}>
                    <Col >
                        <SmallHeaderForm title={'מספר פרויקטים לפי מחלקות'} />
                        <BarGraph/>
                    </Col>
                    <Col>
                        <SmallHeaderForm title={'מספר פרויקטים לפי מחלקות'} />
                        <BarGraph/>
                    </Col>
                </Row>
            </div>
        )
    }
}