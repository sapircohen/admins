import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';

class NavbarProj extends React.Component{
    Disconnect = ()=>{
        localStorage.clear();
        this.props.history.push('/');
        window.location.reload();
    }
    render(){
        return(
            <Navbar style={{backgroundColor:'#BFDCD8',elevation:20}}>
                <Navbar.Brand href="#home">
                    <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrOkHS6TvYS5lXbJIeB-MxYIcUOYQ4Jzfu456ztCKSfIpzle2"
                    width="180"
                    height="40"
                    className="d-inline-block align-top"
                    alt="We Learn"
                    />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr">
                        <Nav.Link style={{fontSize:17}} href={'#/projectsChangeData'}>עריכת נתונים</Nav.Link>
                    </Nav>
                    <Nav className="mr">
                        <Nav.Link style={{fontSize:17}} href="#/projectsData">לכל הפרויקטים</Nav.Link>
                    </Nav>
                    {/* <Nav className="mr">
                        <Nav.Link style={{fontSize:17}} href="#/smallAdminDashboard">דשבורד</Nav.Link>
                    </Nav> */}
                    <Nav className="mr">
                        <Nav.Link style={{fontSize:17}} onClick={this.Disconnect}>התנתקות</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(NavbarProj);