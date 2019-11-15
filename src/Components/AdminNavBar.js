import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBCollapse,
MDBHamburgerToggler } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import {Nav,Badge} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {weLearnLogo} from '../assests/images';
import firebase from 'firebase';

class NavbarPage extends Component {
state = {
  collapse1: false,
  collapseID: '',
  notifications:''
}
componentDidMount(){
  this.getNotifications();
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
getNotifications=()=>{
  const ref = firebase.database().ref('Data').child('Ruppin').child('Messages');
  ref.on("value", (snapshot,key)=> {
    let counter=0;
      snapshot.forEach((msg)=>{
          if(!msg.val().isSent){
              counter++;
          }
      })
      this.setState({notifications:counter})
  })
}
render() {
  return (
    <Router>
        <MDBNavbar color="amber lighten-4" style={{backgroundColor:'#BFDCD8',elevation:20}} light>
            <MDBNavbarBrand>
              <img
              src={weLearnLogo}
              style={{width:'auto',height:'40px'}}
              className="d-inline-block align-top"
              alt="We Learn"
              />
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
                    <Nav.Link href="#/Messeges">הודעות ממעסיקים
                      <Badge variant="light">{this.state.notifications}</Badge>
                    </Nav.Link>
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