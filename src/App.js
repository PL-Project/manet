import React from 'react';
import Manet from './components/Manet'
import './css/app.css'
class App extends React.Component {
  render(){
    return (
      <div id="app" className="container">

        <div className="container row">
            <Manet className="column"/>
        </div>
      </div>
    );
  }
}

export default App;
