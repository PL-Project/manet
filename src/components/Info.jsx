import React, { Component } from "react";
import ReactDOM from 'react-dom';

import '../css/info.css'

class Info extends Component {
    constructor(props){
        super(props);

        this.updateNode = this.updateNode.bind(this);

        this.state={
            node: this.props.node
        }
    }

    updateNode(){
        this.state.node.setMaker(this.refs.maker.value);
        this.state.node.setCpu(this.refs.cpu.value);
        this.state.node.setHz(this.refs.hz.value);
        this.state.node.setRam(this.refs.ram.value);
        this.state.node.setHhd(this.refs.hhd.value);
        this.state.node.setV(this.refs.speed.value);

        this.setState({
            
        })
        this.props.onClose()
    }
    render() {
        return (
            <div id="formulario">
                <div id="popup2">
                    <div id="img">
                        <div className="form-row">
                            <div className="col-md-12 mb-1">
                                <img src={this.state.node.getImage().src} width="100" height="100"/>
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control">Velocidad del Nodo:</label>
                                <input ref="speed" className="form-control" type="number" defaultValue={this.state.node.getV()} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control ">Trayectoria del Nodo:</label>
                                <select ref="trayectoria" type="select" className="form-control" >
                                    <option>Trayectoria 1</option>
                                    <option>Trayectoria 2</option>
                                    <option>Trayectoria 3</option>
                                    <option>Trayectoria 4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id="formu">
                        <div className="form-row">
                            <div className="col-md-6 mb-2">
                                <label className="form-control">Fabricante:</label>
                                <select ref="maker" type="select" className="form-control" defaultValue={this.state.node.getMaker()} >
                                    <option>AMD</option>
                                    <option>INTEL</option>
                                    <option>DELL</option>
                                    <option>QUALCOMM</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control ">Nucleos de Procesamiento:</label>
                                <input ref="cpu" className="form-control" type="number" 
                                min="1" max="8"  
                                defaultValue={this.state.node.getCPU()}/>
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control ">Velocidad de los Nucleos:</label>
                                <input ref="hz" className="form-control" type="number" defaultValue={this.state.node.getHz()} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control ">Memoria RAM (GB):</label>
                                <input ref="ram" className="form-control " type="number" defaultValue={this.state.node.getRam()} />
                            </div>
                            <div className="col-md-12 mb-1">
                                <label className="form-control j">Disco de Almacenamiento (GB):</label>
                                <input ref="hhd" className="form-control " type="number" defaultValue={this.state.node.getHhd()} />
                            </div>
                            <div className="col-md-12 mb-1">
                                <label className="form-control">Instrucciones:</label>
                                <textarea className="form-control" type="text" defaultValue={this.state.node.getInstructions()} />
                            </div>
                        </div>
                    </div>
                </div>
                <button id="save" type="button" className="btn btn-primary" onClick={this.updateNode}>GUARDAR</button>
            </div>
            
        );
   }
}
export default Info