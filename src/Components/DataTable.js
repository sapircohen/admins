import React from 'react';
import { MDBDataTable } from 'mdbreact';

import '../App.css';
class DatatablePage extends React.Component{
    // componentDidMount(){
    //     window.location.reload();
    // }
    render(){
    return (
        <div style={{padding:'2%',direction:'rtl'}}>
            <MDBDataTable
            theadColor="#B5DBF8"
            paging={this.props.paging}
            className='dataTable'
            sortable
            striped
            bordered
            hover
            paginationLabel={["הקודם", "הבא"]} 
            data={this.props.data}
            />
        </div>
    );
    }
}

export default DatatablePage;