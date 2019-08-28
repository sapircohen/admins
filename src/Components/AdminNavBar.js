import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBCollapse,
MDBHamburgerToggler } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';

class NavbarPage extends Component {
state = {
  collapse1: false,
  collapseID: ''
}
toggleCollapse = collapseID => () => {
  this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
}
toggleSingleCollapse = collapseId => {
  this.setState({
    ...this.state,
    [collapseId]: !this.state[collapseId]
  });
}
Disconnect = ()=>{
  localStorage.clear();
  this.props.history.push('/');
  window.location.reload();
}
render() {
  return (
    <Router>
        <MDBNavbar color="amber lighten-4" style={{backgroundColor:'#BFDCD8',elevation:20}} light>
            <MDBNavbarBrand>
              RPS Admin
            </MDBNavbarBrand>
            <MDBHamburgerToggler color="#d3531a" id="hamburger1" onClick={()=> this.toggleSingleCollapse('collapse1')} />
              <MDBCollapse isOpen={this.state.collapse1} navbar>
                <MDBNavbarNav style={{direction:'rtl',textAlign:'right'}} bottom>
                  <MDBNavItem >
                    <Nav.Link href="#/BigAdminDashboard">דשבורד</Nav.Link>
                  </MDBNavItem>
                  <MDBNavItem >
                    <Nav.Link href="#/InstitudePage">עריכת מידע</Nav.Link>
                  </MDBNavItem>
                  <MDBNavItem >
                    <Nav.Link href="#/CreateGroups">פתיחת קבוצות</Nav.Link>
                  </MDBNavItem>
                  <MDBNavItem >
                    <Nav.Link onClick={this.Disconnect}>התנתקות</Nav.Link>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
        </MDBNavbar>
    </Router>
    );
  }
}

export default withRouter(NavbarPage);