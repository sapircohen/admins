import React from 'react';
import { withRouter,Route,Switch } from "react-router-dom";
//Components:
import LoginPage from './Components/LoginPage';
import AdminPage from './Components/AdminPage';
import ChangeData from './Components/ChangeDataScreen';
import InstitudePage from './Components/Institude';
import GroupsCreation from './Components/CreateGroups';

//test and prod enviorments
import firebase from 'firebase';
import 'firebase/storage';

import Dashboard from './Components/BigAdminDashboard';
import SmallDashboard from './Components/SmallAdminDashboard';
import Messeges from './Components/Messeges';

import { FirebaseProdConfig } from './Keys/APIkeys';
//import { FirebaseTestConfig } from './Keys/APIkeys';

firebase.initializeApp(FirebaseProdConfig);
//firebase.initializeApp(FirebaseTestConfig);
export const storage =  firebase.storage();

function App(props) {
  
  return (
    <Switch location={props.location}>
      <Route path='/' exact component={LoginPage}/>
      <Route path='/projectsData' component={AdminPage}/>
      <Route path='/projectsChangeData' component={ChangeData}/>
      <Route path='/InstitudePage' component={InstitudePage}/>
      <Route path='/BigAdminDashboard' component={Dashboard}/>
      <Route path='/CreateGroups' component={GroupsCreation}/>
      <Route path='/smallAdminDashboard' component={SmallDashboard}/>
      <Route path='/Messeges' component={Messeges}/>
    </Switch>
  );
}

export default withRouter(App);
