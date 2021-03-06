import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import DatatablePage from './DataTable';
import AdminNavBar from './AdminNavBar';
import ToggleProject from '../Commons/toggle';
import SmallHeaderForm from '../Commons/SmallHeader';
import {FaCheck}  from "react-icons/fa";
const Messege = () => {
    const [messeges,setMesseges] = useState([]);
    const [oldMesseges,setOldMesseges] = useState([]);
    useEffect(()=>{
        getData();
    },[])
    const getData = ()=>{
        const ref = firebase.database().ref('Data').child('Ruppin').child('Messages');
        ref.on("value", (snapshot,key)=> {
            let rows=[];
            let rows2=[];
            snapshot.forEach((data)=>{
                let time = new Date().toString(data.val().date);
                let date = new Date(time).toLocaleDateString();
                let r = {
                    date:date,
                    contactName:data.val().fullName,
                    contactEmail:data.val().contactEmail,
                    messegeContent:data.val().messegeContent,
                    projectName:data.val().projectName,
                    faculty: data.val().faculty!==""?data.val().faculty:"לא צוין",
                    department:data.val().department!==""?data.val().department:"לא צוין",
                    major:data.val().major!==""?data.val().major:"לא צוין",
                    StudentsDetail:
                    <div>
                       { data.val().students.map((s)=>{
                       return <p>{s.Name} {s.Email?": "+ s.Email:""}</p>
                       })}
                        
                    </div>,
                    isSend:!data.val().isSent?<ToggleProject GroupName={data.key} isApproved={data.val().isSent} ChangeApproval={changeSend}/>:<FaCheck size={30} color="green"/>,
                };
                if(data.val().isSent){
                    rows2.push(r);
                }
                else rows.push(r);
            })
            const messeges = {
                columns: [
                    {
                    label: 'תאריך',
                    field: 'date',
                    sort: 'asc',
                    },
                    {   
                    label: 'שם איש הקשר',
                    field: 'contactName',
                    sort: 'asc',
                    },
                    {   
                    label: 'אימייל יוצר הקשר',
                    field: 'contactEmail',
                    sort: 'asc',
                    },
                    {   
                    label: 'תוכן ההודעה',
                    field: 'messegeContent',
                    sort: 'asc',
                    },
                    {   
                    label: 'שם הפרויקט',
                    field: 'projectName',
                    sort: 'asc',
                    },
                    {   
                    label: 'פקולטה',
                    field: 'faculty',
                    sort: 'asc',
                    },
                    {   
                    label: 'מחלקה',
                    field: 'department',
                    sort: 'asc',
                    },
                    {   
                    label: 'התמחות',
                    field: 'major',
                    sort: 'asc',
                    },
                    {
                    label: 'פרטי הסטודנטים',
                    field: 'StudentsDetail',
                    sort: 'asc',
                    },
                    {   
                    label: 'טופל?',
                    field: 'isSend',
                    sort: 'asc',
                    },
                ],
                rows:rows  
            }
            const oldMesseges={
                columns: [
                    {
                    label: 'תאריך',
                    field: 'date',
                    sort: 'asc',
                    },
                    {   
                    label: 'שם איש הקשר',
                    field: 'contactName',
                    sort: 'asc',
                    },
                    {   
                    label: 'אימייל יוצר הקשר',
                    field: 'contactEmail',
                    sort: 'asc',
                    },
                    {   
                    label: 'תוכן ההודעה',
                    field: 'messegeContent',
                    sort: 'asc',
                    },
                    {   
                    label: 'שם הפרויקט',
                    field: 'projectName',
                    sort: 'asc',
                    },
                    {   
                    label: 'פקולטה',
                    field: 'faculty',
                    sort: 'asc',
                    },
                    {   
                    label: 'מחלקה',
                    field: 'department',
                    sort: 'asc',
                    },
                    {   
                    label: 'התמחות',
                    field: 'major',
                    sort: 'asc',
                    },
                    {
                    label: 'פרטי הסטודנטים',
                    field: 'StudentsDetail',
                    sort: 'asc',
                    },
                    {   
                    label: 'טופל?',
                    field: 'isSend',
                    sort: 'asc',
                    },
                ],
                rows:rows2
            }
            setMesseges(messeges);
            setOldMesseges(oldMesseges)
        })
        const changeSend=(key,value)=>{
            const ref = firebase.database().ref('Data').child('Ruppin').child('Messages').child(key);
            ref.update({isSent:value});
        }
    }
    return ( 
        <div>
            <AdminNavBar/>
            <SmallHeaderForm title="הודעות חדשות"/>
            <DatatablePage data={messeges}/>
            <SmallHeaderForm title="הודעות שטופלו"/>
            <DatatablePage data={oldMesseges}/>
        </div>
     );
}
 
export default Messege;

