import React from 'react';
import Manet from './components/Manet'
import NodeList from './components/NodeList'
import './css/app.css'
class App extends React.Component {
    
  render(){
    return (
      <div id="app" className="container">

        <div className="container row">
            <Manet className="column"/>
            <NodeList className="column"/>
        </div>
      </div>
    );
  }
}
//Branches V2
export default App;
