import React,{useState,useEffect} from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

const ToggleProject = (props) => {
    const [change,setChange] = useState(props.isApproved);
    const changeApproval=()=>{
        props.ChangeApproval(props.GroupName,!change)
        setChange(!change);
    }
    return ( 
        <div style={{fontSize:'10px'}}>
            <Toggle
            onClick={changeApproval}
            checked={change}            
            />
        </div>
     );
}
export default ToggleProject;