
import React from "react";
import ReactExport from "react-data-export";
import Button from 'react-bootstrap/Button';
import {FaFileExcel} from 'react-icons/fa';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadExcelGroups =(props)=> {
    return (
        <ExcelFile element={<Button variant='success'>ייצוא לאקסל  <FaFileExcel/></Button>}>
            <ExcelSheet data={props.data} name="Employees">
                <ExcelColumn value="GroupName" label="שם הקבוצה"/>
                <ExcelColumn value="Password" label="סיסמה"/>
            </ExcelSheet>
        </ExcelFile>
    );

}

export default DownloadExcelGroups;