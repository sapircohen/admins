import React from 'react';
import BarGraph from '../Commons/BarGraph';
import {Row,Col} from 'react-bootstrap';
import SmallHeaderForm from '../Commons/SmallHeader';
import RPSPieChart from '../Commons/PieChart';
import firebase from 'firebase';
import NavBar from './NavBar';
import RPSLineChart from '../Commons/LineChart';


export default class SmallDashboard extends React.Component{
    state={
        projectsCount:'',
        projectExpertiesPie:[],
        projectAdvisorsBar:[],
        projectYearsLine:[],
        department:JSON.parse(localStorage.getItem('department')),
        faculty:JSON.parse(localStorage.getItem('faculty')),
        institute:JSON.parse(localStorage.getItem('adminInfo')).institute
    }
    componentDidMount(){
        this.GetDataForBarCharts();
        //this.GetDataForKPI();
        this.GetDataForPieCharts();
        this.GetProjectByYear();
    }
    GetProjectByYear=()=>{
        const Years=["2013","2014","2015","2016","2017","2018","2019"]
        const secondRef = firebase.database().ref('RuppinProjects');
        let dataForDep = [];
        secondRef.once("value", (snapshot,key)=> {
            Years.forEach((y)=>{
                let counter = 0;
                snapshot.forEach((project)=>{
                    let s = project.val().Year;
                    
                    if (project.val().Year!==undefined && project.val().Year===y && project.val().Faculty===this.state.faculty && project.val().Department===this.state.department) {
                       
                        console.log(s)
                         counter++;
                    }
                    else if(s==="1"){
                        let d = new Date(project.val().Year);
                        console.log(d.getFullYear())
                        if(d.getFullYear()===y){
                            counter++;
                        }
                    }
                })
                dataForDep.push({name:y,value:counter})
            })
            this.setState({projectYearsLine:dataForDep})
        })
    }
    GetDataForBarCharts=()=>{
        this.getAdvisorsProjectsCount();
    }
    GetDataForKPI=()=>{
        this.GetProjectCount();
    }
    GetDataForPieCharts=()=>{
        this.GetExpertiesProjectsCount();
    }
    GetExpertiesProjectsCount = ()=>{
        const ref = firebase.database().ref('Data').child(this.state.institute).child('Faculties').child(this.state.faculty).child('Departments').child(this.state.department).child('Experties');
        let Experties = [];
        ref.once("value", (snapshot,key)=> {
            snapshot.forEach((exp)=>{
                console.log(exp.val().Name)
                Experties.push(exp.val().Name);
            })
        })
        .then(()=>{
            console.log(Experties)
            const secondRef = firebase.database().ref('RuppinProjects');
            let dataForDep = [];
            secondRef.once("value", (snapshot,key)=> {
                Experties.forEach((exp)=>{
                    let counter = 0;
                    snapshot.forEach((project)=>{
                        if(!project.val().ProjectName){
                            
                        }
                        else if (project.val().ProjectName && project.val().Major===exp && project.val().Faculty===this.state.faculty && project.val().Department===this.state.department) {
                            counter++;
                        }
                    })
                    dataForDep.push({name:exp,value:counter})
                })
                this.setState({projectExpertiesPie:dataForDep})
            })
        })
    }
    GetProjectCount = ()=>{
        const ref = firebase.database().ref('RuppinProjects');
        let counter = 0;
        ref.once("value", (snapshot,key)=> {
            snapshot.forEach((project)=>{
                if (project.val().ProjectName && project.val().Faculty===this.state.faculty && project.val().Department===this.state.department) {
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
    getAdvisorsProjectsCount=()=>{
        const ref = firebase.database().ref('Data').child(this.state.institute).child('Faculties').child(this.state.faculty).child('Departments').child(this.state.department).child('Advisors');
        let Advisors = [];
        ref.once("value", (snapshot,key)=> {
            snapshot.forEach((ad)=>{
                console.log(ad.val())
                Advisors.push(ad.val());
            })
        })
        .then(()=>{
            const secondRef = firebase.database().ref('RuppinProjects');
            let dataForDep = [];
            secondRef.once("value", (snapshot,key)=> {
                Advisors.forEach((ad)=>{
                    let counter = 0;
                    snapshot.forEach((project)=>{
                        if (project.val().Advisor!==undefined && project.val().ProjectName!==undefined && project.val().Faculty===this.state.faculty && project.val().Department===this.state.department) {
                            if(project.val().Advisor!==undefined){
                                if (project.val().Advisor[0]===ad || project.val().Advisor[1]===ad) {
                                    counter++;
                                }
                            }
                            else if(project.val().Advisor === ad){
                                counter++;
                            }
                        }
                    })
                    dataForDep.push({name:ad,value:counter})
                })
                this.setState({projectAdvisorsBar:dataForDep},()=>{console.log(dataForDep)})
            })
        })
    }
    
    render(){
        return(
            <div>
                <NavBar/>
                {/* <Row style={{marginTop:'2%',textAlign:'-webkit-center',direction:'rtl'}}>
                    <Col>
                        <KPI title='מספר הפרויקטים במחלקה' kpi={this.state.projectsCount}/>
                    </Col>
                </Row> */}
                <Row style={{marginTop:'1%',textAlign:'-webkit-center'}}>
                    <Col >
                        <SmallHeaderForm title={'פרויקטים לפי התמחות'} />
                        <RPSPieChart data={this.state.projectExpertiesPie}/>
                    </Col>
                    <Col>
                        <SmallHeaderForm title={'מספר פרויקטים לפי מנחה'} />
                        <BarGraph data={this.state.projectAdvisorsBar}/>
                    </Col>
                </Row>
                <Row style={{marginTop:'1%',textAlign:'-webkit-center'}}>
                    <Col >
                        <SmallHeaderForm title={'מספר פרויקטים לפי מחלקות'} />
                        <RPSLineChart data={this.state.projectYearsLine}/>
                    </Col>
                </Row>
            </div>
        )
    }
}