import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';
import {weLearnLogo} from '../assests/images';

const NavabarProj = (props) => {
    const disconnect = ()=>{
        localStorage.clear();
        props.history.push('/');
        window.location.reload();
    }
    const changePage=(pageName)=>{
        props.history.push('/'+pageName);
    }
    return ( 
        <Navbar style={{backgroundColor:'#BFDCD8',elevation:20}}>
            <Navbar.Brand href="#">
                <img
                src={weLearnLogo}
                style={{width:'auto',height:'40px'}}
                className="d-inline-block align-top"
                alt="We Learn"
                />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mr">
                    <Nav.Link onClick={()=>changePage('projectsChangeData')} className={props.match.url === '/projectsChangeData'?"active":""} style={{fontSize:17}}>עריכת נתונים</Nav.Link>
                    <Nav.Link onClick={()=>changePage('projectsData')} className={props.match.url === '/projectsData'?"active":""} style={{fontSize:17}}>פרויקטים</Nav.Link>
                    <Nav.Link style={{fontSize:17}} onClick={disconnect}>התנתקות</Nav.Link>
                </Nav>
                <Nav className="mr">
                </Nav>
                <Nav className="mr">
                </Nav>
            </Navbar.Collapse>
        </Navbar>
     );
}
 
export default withRouter(NavabarProj);