import React, { Component } from "react";
import ReactDOM from 'react-dom';
import manetLog from '../class/log';

import '../css/log.css'

var mLog = new manetLog(); 

class LogPage extends Component{
    constructor(props){
        super(props);
        this.log = mLog.getLog();
        
    }
    

    

    render(){
        return(
           
               <div id="logBox" className="card">
                   <h4 className="card-header">LOG MANET</h4>
                   <div id="bodycard" className="card-boddy">
                   <textarea className="form-control" type="text" 
                                disabled
                                defaultValue={mLog.getLog()} />
                   </div>
               </div>
        );
    }
}

export default LogPage;