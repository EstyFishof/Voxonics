import React from "react";
import './AgentDetails.css';


 
export default class AgentDetails extends React.Component{

    render(){
        return(<div className="a_details"><img src="propil agent"/>
    <h3>Hi agent_Name!</h3>
    {/* <h3>Hi {agent_Name}!</h3> */}
    {/* <label value="Agent Number(ID)" /> */}

    <h6>Agent Number(ID)</h6>
    <h3>agent_id</h3> 
    {/* <h3>{agent_id}</h3> */}
    <h6>Calls Today</h6>
    <h3>agent_calls_today</h3>
    {/* <h3>{agent_calls_today}</h3> */}

    <h6>Status</h6>
    <h3>Time_Status</h3>
    {/* <h3>{Time_Status}</h3> */}

    <h6>Action</h6>
    
    <input type="button" value="Ready" className="btn_ready"/>
    <input type="button" /*login*//>
    </div>)
}
}


