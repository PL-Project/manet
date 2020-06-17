import React from 'react'
import Manet from './Manet'
import NodeList from './NodeList'
import '../css/navbar.css'
let container;
class NavBar extends React.Component{
    constructor(props){
        super(props);

        this.selecttab= this.selecttab.bind(this);
    }

    selecttab(n){

        switch (n) {
            case 0:
                container = [
                        <div className="container row">
                            <Manet className="column"/>
                            <NodeList className="column"/>
                        </div>]
                console.log(container)
                //this.state.simulador.tab('show')
                break;
            case 1:
                console.log(this.state.computador)
                //this.state.computador.tab('show')
                break;
            case 0:
                console.log(this.state.nose)
                //this.state.nose.tab('show')
                break;
            default:
                break;
        }
    }

    render(){
        return(
            <div id="navbar">
                <ul id="menu"class="nav nav-fill">
                    <li type="button" class="btn-primary nav-item" onClick={()=>this.selecttab(0)}>SIMULACION </li>
                    <li type="button" class="btn-primary nav-item" onClick={()=>this.selecttab(1)}>COMPUTADOR </li>
                    <li type="button" class="btn-primary nav-item" onClick={()=>this.selecttab(2)}>NO SE</li>
                </ul>
                <div id="tablas" class="container">
                    <container/>

                </div>
            </div>
        )
    }
}

export default NavBar