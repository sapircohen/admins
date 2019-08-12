import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

class ToggleProject extends React.Component{
    state={
        change:true
    }
    componentDidMount(){
        this.setState({
            change:this.props.isApproved
        })
    }
    changeApproval=()=>{
        const temp = !this.state.change;
        this.setState({
            change:temp
        },()=>{
            this.props.ChangeApproval(this.props.GroupName,this.state.change)
        })
    }
    render(){
        return(
            <div style={{fontSize:'10px'}}>
                <Toggle
                onClick={this.changeApproval}
                checked={this.state.change}            
                />
            </div>
        )
    }
}
export default ToggleProject;