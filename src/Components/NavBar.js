import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';
import {weLearnLogo} from '../assests/images';
class NavbarProj extends React.Component{
    state = { activeItem: this.props.match.url }
    Disconnect = ()=>{
        localStorage.clear();
        this.props.history.push('/');
        window.location.reload();
    }
    render(){
        const {activeItem} = this.state;
        return(
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
                        <Nav.Link className={activeItem === '/projectsChangeData'?"active":""} style={{fontSize:17}} href={'#/projectsChangeData'}>עריכת נתונים</Nav.Link>
                        <Nav.Link className={activeItem === '/projectsData'?"active":""} style={{fontSize:17}} href={"#/projectsData"}>פרויקטים</Nav.Link>
                        <Nav.Link style={{fontSize:17}} onClick={this.Disconnect}>התנתקות</Nav.Link>
                    </Nav>
                    <Nav className="mr">
                    </Nav>
                    {/* <Nav className="mr">
                        <Nav.Link style={{fontSize:17}} href="#/smallAdminDashboard">דשבורד</Nav.Link>
                    </Nav> */}
                    <Nav className="mr">
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(NavbarProj);