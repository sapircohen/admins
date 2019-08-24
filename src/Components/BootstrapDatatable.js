import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import '../css/toggle.css'
import ToolkitProvider, { Search,ColumnToggle } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import SmallHeaderForm from '../Commons/SmallHeader';
import {Row,Col} from 'react-bootstrap';

const { SearchBar } = Search;
const { ToggleList } = ColumnToggle;
const columns =[
    {
      text: 'שם הקבוצה',
      dataField: 'GroupName',
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          width:'auto',
          backgroundColor:'#BFDCD8',
          fontSize:'14px'
        };
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                fontSize:'13px'
            }
        }
    },
    {
      text: 'שם הפרויקט',
      dataField: 'ProjectName',
      sort: true,
      headerStyle: (column, colIndex) => {
          return {
            width:'auto',
            backgroundColor:'#BFDCD8',
            fontSize:'14px'
        };
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
            fontSize:'14px'
        }
    }
    },
    {
    text: 'האם מפורסם?',
    dataField: 'isPublished',
    sort: true,
    headerStyle: (column, colIndex) => {
        return {
          backgroundColor:'#BFDCD8',
          fontSize:'14px'
      };
    },
    style: (cell, row, rowIndex, colIndex) => {
        if (cell === 'כן') {
            return {
            backgroundColor: '#81c784',
            fontSize:'13px'
            };
        }
        return {
            backgroundColor: '#d78787',
            fontSize:'13px'
        };
        }
    },
    {
        text: 'שנה',
        dataField: 'Year',
        sort: true,
        headerStyle: (column, colIndex) => {
            return {
              backgroundColor:'#BFDCD8',
              fontSize:'12px'
          };
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                fontSize:'13px'
            }
        }
    },
    {
        text: 'התמחות',
        dataField: 'Major',
        sort: true,
        headerStyle: (column, colIndex) => {
            return {
              width:'auto',
              fontSize:'14px',
              backgroundColor:'#BFDCD8',
            };
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                fontSize:'13px'
            }
        }
      },
    {
        text: 'קורס',
        dataField: 'ProjectCourse',
        sort: true,
        headerStyle: (column, colIndex) => {
            return {
                width:'auto',
              backgroundColor:'#BFDCD8',
              fontSize:'14px'
          };
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                fontSize:'13px'
            }
        }
    },
    {
        text: 'נושא',
        dataField: 'ProjectTopic',
        sort: true,
        headerStyle: (column, colIndex) => {
            return {
                width:'auto',
              backgroundColor:'#BFDCD8',
              fontSize:'14px'
          };
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                fontSize:'13px'
            }
        }
    },
    {
        text: 'מנחה/מנחת הפרויקט',
        dataField: 'Advisor',
        sort: true,
        headerStyle: (column, colIndex) => {
            return {
                width:'auto',
            fontSize:'14px',
              backgroundColor:'#BFDCD8',
            };
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                fontSize:'13px'
            }
        }
    },
    {
        text: 'שמות הסטודנטים',
        dataField: 'Students',
        sort: true,
        headerStyle: (column, colIndex) => {
            return {
              width:'auto',
              fontSize:'14px',
              backgroundColor:'#BFDCD8',
            };
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                fontSize:'13px'
            }
        }
    },
    {
        text:'תצוגה מקדימה',
        dataField:'projectDetails',
        sort: true,
        headerStyle: (column, colIndex) => {
            return {
              fontSize:'14px',
              backgroundColor:'#BFDCD8',
            };
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                fontSize:'13px'
            }
        }

    },
    {
        text:'מאושר?',
        dataField:'isApproved',
        sort: true,
        
        headerStyle: (column, colIndex) => {
            return {
              fontSize:'14px',
              backgroundColor:'#BFDCD8',
            };
        },

    },
]


class BDatatable extends React.Component{
    
    render(){
        return (
            <div style={{padding:'8%',paddingTop:'1%',direction:'rtl'}}>
                <ToolkitProvider
                    keyField="GroupName"
                    data={ this.props.data }
                    columns={ columns }
                    search
                    columnToggle
                    >
                {
                    props => (
                    <div style={{textAlign:'center',direction:'rtl'}}>
                        
                        <SmallHeaderForm title={'סינון עמודות:'} />
                        <ToggleList contextual="info" className="ToggleClass" { ...props.columnToggleProps } />
                        <hr/>
                        <Row>
                            <Col sm="1">
                             <p>חיפוש</p>
                            </Col>
                            <Col style={{textAlign:'right'}} sm="11">
                                <SearchBar { ...props.searchProps } />
                            </Col>
                        </Row>
                        <hr />
                        <BootstrapTable
                        pagination={ paginationFactory() }
                        { ...props.baseProps }
                        />
                    </div>
                    )
                }
                </ToolkitProvider>
            </div>
        );
    }
}

export default BDatatable;
