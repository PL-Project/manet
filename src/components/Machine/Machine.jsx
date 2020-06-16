import React from 'react'
import script from './script'


class Machine extends React.Component {
    render(){
        return (
            <div className="container">
                <canvas id="canvas" width="300" height="300"></canvas>
            </div>
        );
    }
}


export default Machine;