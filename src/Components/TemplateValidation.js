import React,{useEffect,useState} from 'react';
import AdminNavBar from './AdminNavBar';
import Select from '../Commons/FormSelect';
import firebase from 'firebase';
import DatatablePage from './DataTable';

const titles = {
    InstituteTitle:'מוסד',
    FacultyTitle:'פקולטה',
    MajorTitle:'התמחות',
    DepartmentTitle:'מחלקה',
    CourseTitle:'קורס'
}
const TemplateValidation =(props)=>{
    const [instituteList, setInstituteList] = useState([]);
    const [facultyList,setFacultyList]= useState([]);
    const [departmentList,setDepartmentList]= useState([]);
    const [majorList,setMajorList]= useState([]);
    const [coursesList,setCoursesList] = useState([]);
    const [institute,setInstitute]= useState('');
    const [faculty,setFaculty]= useState('');
    const [department,setDepartment] = useState('');
    const [major,setMajor] = useState('');
    const [course,setCourse] = useState('');
    const [template,setTemplate] = useState([]);
    const [data,setData] = useState([]);

    useEffect(() => {
        getInstitutes();
    }, []);
    const getInstitutes=()=>{
        const ref = firebase.database().ref('Data');
        let instituts = [];
        ref.once("value",(snapshot)=>{
            snapshot.forEach((institute)=>{
                if (institute.key!=='Admins') {
                    instituts.push(institute.key);
                }
            })
        }).then(()=>{
            setInstituteList(instituts);
        })
    }
    const getFaculties = (instituteName)=>{
        if(instituteName!=='בחר'){
            setInstitute(instituteName);
            setDepartmentList([]);
            setFacultyList([]);
            setMajorList([]);
            setCoursesList([]);
            const ref = firebase.database().ref('Data').child(instituteName).child('Faculties');
            let faculties = [];
            ref.once("value",(snapshot)=>{
                snapshot.forEach((fac)=>{
                    faculties.push(fac.key);
                })
                setFacultyList(faculties);
            })
        }
        else{
            setDepartmentList([]);
            setFacultyList([]);
            setMajorList([]);
            setCoursesList([]);
        }
    }
    const getDepartments = (faculatyName)=>{
        if(faculatyName!=='בחר'){
            setFaculty(faculatyName);
            setDepartmentList([]);
            setMajorList([]);
            setCoursesList([]);
            const ref = firebase.database().ref('Data').child(institute).child('Faculties').child(faculatyName).child('Departments');
            let Departments = [];
            ref.once("value",(snapshot)=>{
                snapshot.forEach((dep)=>{
                    Departments.push(dep.key);
                })
                setDepartmentList(Departments);
            })
        }
        else{
            setDepartmentList([]);
            setMajorList([]); 
            setCoursesList([]);
       
        }
    }
    const getMajors =  (departmentName)=>{
        if(departmentName!=='בחר'){
            setDepartment(departmentName);
            setMajorList([]);
            setCoursesList([]);
            const ref = firebase.database().ref('Data').child(institute).child('Faculties').child(faculty).child('Departments').child(departmentName).child('Experties');
            let majors = [];
            ref.once("value",(snapshot)=>{
                snapshot.forEach((maj)=>{
                    majors.push(maj.key);
                })
                setMajorList(majors);
            })
        }
        else{
            setMajorList([]);
            setCoursesList([]);
        }
    }
    const getCourses =  (majorName)=>{
        if(majorName!=='בחר'){
            setMajor(majorName);
            setCoursesList([]);
            const ref = firebase.database().ref('Data').child(institute).child('Faculties').child(faculty).child('Departments').child(department).child('Experties').child(majorName).child('Courses');
            let courses = [];
            ref.once("value",(snapshot)=>{
                snapshot.forEach((course)=>{
                    courses.push(course.key);
                })
                setCoursesList(courses);
            })
        }
        else{
            setCoursesList([]);
        }
    }
    const generateTemplateConfig=(courseName)=>{
        if(courseName!=='בחר'){
            const ref = firebase.database().ref('Data').child(institute).child('Faculties').child(faculty).child('Departments').child(department).child('Experties').child(major).child('Courses').child(courseName);
            ref.once("value",(snapshot)=>{
                setCourse(snapshot.val());
                setTemplate(snapshot.val().TemplateConfig)
            })
        }
    }
    useEffect(()=>{
        GetData()
    },[template])
    //when selected inputs changes
    const selectedInputChange = (name,input)=>{
        switch (name) {
            case titles.InstituteTitle:
                getFaculties(input.target.value);
                break;
            case titles.FacultyTitle:
                getDepartments(input.target.value);
                break;
            case titles.DepartmentTitle:
                getMajors(input.target.value);
                break;
            case titles.MajorTitle:
                getCourses(input.target.value);
                break;
            case titles.CourseTitle:
                generateTemplateConfig(input.target.value)
                break;
            default:
                break;
        }
    }
    const GetData = ()=>{
        let rows=[];
        console.log(template)
        template.forEach((validator)=>{
            let r = {
                Name:validator.Name,
                DisplayName:validator.DisplayName,
                isMandatory:validator.isMandatory?'כן':'לא'
            };
            rows.push(r);
            
        })
        const table = {
            columns: [
                {
                  label: 'שם השדה',
                  field: 'Name',
                  sort: 'asc',
                  width: 270
                },
                {
                    label: 'שם תצוגה',
                    field: 'DisplayName',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'האם שדה חובה?',
                    field: 'isMandatory',
                    sort: 'asc',
                    width: 270
                },
              ],
            rows:rows  
        }
        setData(table);
    }

    return(
        <div>
            <AdminNavBar/>
            <div style={{border:'solid 1px',padding:15,borderRadius:20,margin:60,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                <Select changedInput={selectedInputChange} list={instituteList} title={titles.InstituteTitle}/>
                <Select changedInput={selectedInputChange} list={facultyList} title={titles.FacultyTitle}/>
                <Select changedInput={selectedInputChange} list={departmentList}  title={titles.DepartmentTitle}/>
                <Select changedInput={selectedInputChange} list={majorList} title={titles.MajorTitle}/>
                <Select changedInput={selectedInputChange} list={coursesList} title={titles.CourseTitle}/>
               
            </div>
            {course!==''&&
            <div style={{border:'solid 1px',padding:15,borderRadius:20,margin:60,backgroundColor:'#fff',boxShadow:'5px 10px #888888'}}>
                    <DatatablePage paging={true} data={data}/>
            </div>
            }
        </div>
    )
}
export default TemplateValidation;