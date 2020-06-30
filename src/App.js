import React from 'react';
import Manet from './components/Manet'
import NavbarTop from "./components/NavbarTop";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrincipalCpu from "./components/PrincipalCpu";
import './css/app.css'
class App extends React.Component {
  render(){
    return (
        <div>
            <div className="column wrapper">
                <Router>
                    <div id="content">
                        <div className="container-fluid">
                            <NavbarTop/>
                            <Route path="/Manet" component={Manet}></Route>
                            <Route path="/MainCpu" component={PrincipalCpu}></Route>
                        </div>
                    </div>
                </Router>
            </div>
        </div>
    );
  }
}

export default App;
