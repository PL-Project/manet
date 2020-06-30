import React, { Component } from "react";
import ReactDOM from 'react-dom';

import '../css/info.css'

class InfoV extends Component {
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
                            <div className="col-md-6 mb-2">
                                <img src={this.state.node.getImage().src} width="100" height="100"/>
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control">Participa:</label>
                                <input ref="speed" className="form-control" type="text"
                                       defaultValue={this.state.node.getParticipation()} disabled />
                            </div>
                        </div>
                    </div>
                    <div id="formu">
                        <div className="form-row">
                            <div className="col-md-6 mb-2">
                                <label className="form-control">Fabricante:</label>
                                <label className="form-control">{this.state.node.getMaker()}</label>
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control ">Nucleos de Procesamiento:</label>
                                <label className="form-control ">{this.state.node.getCPU()}</label>
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control ">Velocidad de los Nucleos:</label>
                                <label className="form-control ">{this.state.node.getHz()}</label>

                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="form-control ">Memoria RAM (GB):</label>
                                <label className="form-control ">{this.state.node.getRam()}</label>
                            </div>
                            <div className="col-md-12 mb-1">
                                <label className="form-control j">Disco de Almacenamiento (GB):</label>
                                <label className="form-control j">{this.state.node.getHhd()}</label>
                            </div>
                            <div className="col-md-12 mb-1">
                                <label className="form-control">Instrucciones:</label>
                                <textarea className="form-control" type="text"
                                          disabled
                                          defaultValue={this.state.node.getInstructions()} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}
export default InfoV