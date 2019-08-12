import React from 'react';
import AdminNavbar from './AdminNavBar';
import RPSEditTree from '../Commons/RPSjsonTreeEdit';

//dashboard
export default class BigAdmin extends React.Component{
    render(){
        return(
            <div>
                <AdminNavbar/>
                <RPSEditTree/>
            </div>
        )
    }
}