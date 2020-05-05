import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter,Link } from 'react-router-dom';
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
                        <Link/>
                        <Nav.Link onClick={()=>this.props.history.push("/ChangeData")} className={activeItem === '/ChangeData'?"active":""} style={{fontSize:17}}>עריכת נתונים</Nav.Link>
                        <Nav.Link onClick={()=>this.props.history.push("/projectsData")} className={activeItem === '/projectsData'?"active":""} style={{fontSize:17}}>פרויקטים</Nav.Link>
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