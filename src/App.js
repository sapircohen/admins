import React from 'react';
import { withRouter,Route,Switch } from "react-router-dom";
//Components:
import LoginPage from './Components/LoginPage';
import AdminPage from './Components/AdminPage';
import ChangeData from './Components/ChangeDataScreen';
import BigAdmin from './Components/BigAdminPage';
import InstitudePage from './Components/Institude';
import GroupsCreation from './Components/CreateGroups';

//test and prod enviorments
import firebase from 'firebase';
import 'firebase/storage';

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
      <Route path='/BigAdminPage' component={BigAdmin}/>
      <Route path='/InstitudePage' component={InstitudePage}/>
      <Route path='/CreateGroups' component={GroupsCreation}/>
    </Switch>
  );
}

export default withRouter(App);
