import React from 'react';
import '../css/principalCpu.css'
import PCmessages from "../images/PCMSM.png";
import {Modal} from "react-bootstrap";
import InfoV from "./InfoV";
import NodeInfo from "../class/nodeInfo";


class PrincipalCpu extends React.Component {
    constructor(props) {
        super(props);
        this.consoleCommand = "";
        this.nodes = this.props.location.state.nodes;
        this.NumberOfNodes = this.props.location.state.NumberOfNodes;
        this.param1 = "";
        this.param2 = "";
        this.param3 = "";
        this.param4 = "";
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    state = {
        nodes:  this.props.location.state.nodes,
        ram: Number,
        cpu: Number,
        hz: Number,
        hhd: Number,
        command: "",
        value1: Number,
        value2: Number,
        newVal: "",
        output: "",
        visualizador: "",
        nodosParticipantes: [],
        showModal: false,
        showMTable: false

    }

    async componentDidMount() {
        let numNodes = 1000;
        let j = 0;
        for (var i = 0; i < numNodes; i++) {
            let width = 500;
            let height = 500;

        }
        //
        // this.setState({
        //     nodes : this.nodes
        // })
        //

        this.state.ram = this.props.location.state.RAM;
        this.state.cpu = this.props.location.state.cpu;
        this.state.hhd = this.props.location.state.Hhd;
        this.state.hz = this.props.location.state.hz;

        this.setState({
            visualizador : this.nodes[0]
        })
        // console.log(this.nodes.length + "---------------------------------")
        // console.log(this.state.nodes.length + "*****************")
        for (let i = 0; i < this.state.nodes.length; i++) {
            // console.log(typeof(this.state.nodes[i].getParticipation()) + "---dasdasdasdasd" )

            if(this.state.nodes[i].getParticipation() == 1){

                // console.log(this.state.nodes[i].getMaker() + " MAKER")
                this.state.nodosParticipantes.push(this.state.nodes[i]);

            }
        }
        for (let i = 0; i < this.state.nodosParticipantes.length; i++){
            // console.log("*-*-*-*-- "+ this.state.nodosParticipantes[i].getMaker())
            this.state.nodosParticipantes[i].setImageSrc(this.state.nodosParticipantes[i].getMaker());
        }

    }
    getNodebyID(id) {
        for (let i = 0; i < this.state.nodes.length; i++) {
            if (id == this.state.nodes[i].getId()) {
                return this.state.nodes[i]
            }
        }
    }

    updateVisualizador(id){
        let node = this.getNodebyID(id);
        this.setState({
            visualizador: node
        })
    }

    handleCommand(value) {
        this.consoleCommand = value;
        // console.log("this.consoleCommand");
        // console.log(this.test);
        // console.log("this.consoleCommand");
        // console.log(this.consoleCommand);

    }

    handleParam1(value) {
        this.param1 = value;

        var data = this.param1 / this.state.nodosParticipantes.length

        // console.log("data --> " + data)
        for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
            this.state.nodosParticipantes[i].setStoreNum(data)
        }
    }

    handleParam2(value) {

        this.param2 = value;
        var data = this.param2 / this.state.nodosParticipantes.length

        for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
            this.state.nodosParticipantes[i].setStoreNum(this.state.nodosParticipantes[i].getStoreNum() + data)
        }

    }

    handleParam3(value) {
        this.param3 = value;

    }

    handleParam4(value) {
        this.param4 = value;

    }




    handleInstruction(){
        // console.log(this.consoleCommand);
        // console.log("hellllllooooo" + this.NumberOfNodes)
        // console.log("test maker" + this.nodes[1].getMaker())

        // for(this.state.NumberOfNodes){
        //
        //
        // }
        if(this.consoleCommand.toString() == "add"){

            var total = this.add();
            // console.log(total);

            this.setState({
                 output : total
            })

        }
        if(this.consoleCommand.toString() == "multiply"){

            var total = this.multiply();
            // console.log(total);

            this.setState({
                output : total
            })

        }
        if(this.consoleCommand.toString() == "substract"){

            var total = this.substract();
            // console.log(total);

            this.setState({
                output : total
            })

        }
        if(this.consoleCommand.toString() == "divide"){

            var total = this.divide();
            // console.log(total);

            this.setState({
                output : total
            })

        }

        if(this.consoleCommand.toString() == "setRegister0"){
            var data = this.param1/this.state.nodosParticipantes.length


            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                this.state.nodosParticipantes[i].getRegisters()[0] = data
                // console.log("registers" + this.state.nodosParticipantes[i].getRegisters()[0])
            }
            this.setState({
                output : total
            })
        }
        if(this.consoleCommand.toString() == "setRegister1"){
            var data = this.param1/this.state.nodosParticipantes.length


            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                this.state.nodosParticipantes[i].getRegisters()[1] = data

            }
            this.setState({
                output : total
            })
        }
        if(this.consoleCommand.toString() == "setRegister2"){
            var data = this.param1/this.state.nodosParticipantes.length


            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                this.state.nodosParticipantes[i].getRegisters()[2] = data

            }
            this.setState({
                output : total
            })
        }
        if(this.consoleCommand.toString() == "setRegister3"){
            var data = this.param1/this.state.nodosParticipantes.length

            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                this.state.nodosParticipantes[i].getRegisters()[3] = data

            }
            this.setState({
                output : total
            })
        }


    }
    add() {

        var data = 0
        if(this.param1.toString() == "register0"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[0]
            }
        }
        else if(this.param1.toString() == "register1"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[1]
            }
        }
        else if(this.param1.toString() == "register2"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[2]
            }
        }
        else if(this.param1.toString() == "register3"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[3]
            }
        }
        else{
            data = parseInt(this.param1)
        }

        if(this.param2.toString() == "register0"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[0]
            }
        }
        else if(this.param2.toString() == "register1"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[1]
            }
        }
        else if(this.param2.toString() == "register2"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[2]
            }
        }
        else if(this.param3.toString() == "register3"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[3]
            }
        }
        else{
            data += parseInt(this.param2)
        }
        return data
    }
    multiply() {

        var data = 0
        var data2 = 0
        if(this.param1.toString() == "register0"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[0]
            }
        }
        else if(this.param1.toString() == "register1"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[1]
            }
        }
        else if(this.param1.toString() == "register2"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[2]
            }
        }
        else if(this.param1.toString() == "register3"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[3]
            }
        }
        else{
            data = parseInt(this.param1)
        }

        if(this.param2.toString() == "register0"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[0]
            }
        }
        else if(this.param2.toString() == "register1"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[1]
            }
        }
        else if(this.param2.toString() == "register2"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[2]
            }
        }
        else if(this.param3.toString() == "register3"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[3]
            }
        }
        else{
            data2 += parseInt(this.param2)
        }
        return data * data2
    }
    substract() {

        var data = 0
        var data2 = 0
        if(this.param1.toString() == "register0"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[0]
            }
        }
        else if(this.param1.toString() == "register1"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[1]
            }
        }
        else if(this.param1.toString() == "register2"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[2]
            }
        }
        else if(this.param1.toString() == "register3"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[3]
            }
        }
        else{
            data = parseInt(this.param1)
        }

        if(this.param2.toString() == "register0"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[0]
            }
        }
        else if(this.param2.toString() == "register1"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[1]
            }
        }
        else if(this.param2.toString() == "register2"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[2]
            }
        }
        else if(this.param3.toString() == "register3"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[3]
            }
        }
        else{
            data2 += parseInt(this.param2)
        }
        return data - data2
    }
    divide() {

        var data = 0
        var data2 = 0
        if(this.param1.toString() == "register0"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[0]
            }
        }
        else if(this.param1.toString() == "register1"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[1]
            }
        }
        else if(this.param1.toString() == "register2"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[2]
            }
        }
        else if(this.param1.toString() == "register3"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data += this.state.nodosParticipantes[i].getRegisters()[3]
            }
        }
        else{
            data = parseInt(this.param1)
        }

        if(this.param2.toString() == "register0"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[0]
            }
        }
        else if(this.param2.toString() == "register1"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[1]
            }
        }
        else if(this.param2.toString() == "register2"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[2]
            }
        }
        else if(this.param3.toString() == "register3"){
            for (let i = 0; i < this.state.nodosParticipantes.length; i++) {
                // console.log("dato a sumar" + this.state.nodosParticipantes[i].getStoreNum())
                data2 += this.state.nodosParticipantes[i].getRegisters()[3]
            }
        }
        else{
            data2 += parseInt(this.param2)
        }
        return data / data2
    }
    openModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }
    closeModal(){
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <div id="big" className="row">

                <div id="specificationBox" className="card">
                    <h4 className="card-header">CPU Principal</h4>
                    <div id="bodycard" className="card-boddy">
                        <h1>RAM</h1>
                        <p>{this.state.ram} GB</p>
                        <h1>CPU's</h1>
                        <p>{this.state.cpu}</p>
                        <h1>Hhd</h1>
                        <p>{this.state.hhd} GB</p>
                        <h1>Processor Speed</h1>
                        <p>{this.state.hz} Hz</p>
                    </div>
                    <div id="visualizador" className="cardpersonalizada" >
                        <h6>PRE-VISUALIZADOR</h6>
                        <div className="container">
                            <div className="row">
                                <img src={PCmessages} className="column" />
                                <label className="column labelpersonalizada" ref="visualizadorINFO" onClick={this.openModal}>{this.state.visualizador.toString()}</label>
                                <Modal show ={this.state.showModal} onHide={this.closeModal}>
                                    <Modal.Header closeButton>
                                    </Modal.Header>
                                    <Modal.Body id="modalbody">
                                        <InfoV node = {this.state.visualizador} onClose ={this.closeModal}></InfoV>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                        <select type="select" className="form-control" onChange={(e)=>this.updateVisualizador(e.target.value)}>
                            {this.state.nodosParticipantes.map((node, key) => { return <option key={node.getId()} value={node.getId()} >Nodo {node.getId()} : {node.getMaker()} </option>; })}
                        </select>
                    </div>
                </div>

                <div id="mainConsole" className="card">
                    <h5 className="card-header">Consola</h5>
                    <div id="bodymensaje" className="card-body">
                        <div id="emisor" className="cardpersonalizada">
                            <form action="/action_page.php">
                                <h6>Escribe el comando a ejecutar</h6>
                                <div className="row">
                                    <input
                                        type="text"
                                        onChange={(e) => this.handleCommand(e.target.value)}
                                    />
                                    <button type="button" className="btn col-sm-3 btn-primary "
                                            onClick={(e) => this.handleInstruction()}>Run</button>
                                </div>
                                <div className="row">
                                    <p>Parametro 1     </p>
                                    <input
                                        type="text"
                                        onChange={(e) => this.handleParam1(e.target.value)}
                                    />
                                </div>
                                <div className="row">
                                    <p>Parametro 2     </p>
                                    <input
                                        type="text"
                                        onChange={(e) => this.handleParam2(e.target.value)}
                                    />
                                </div>
                                <div className="row">
                                    <p>Parametro 3     </p>
                                    <input
                                        type="text"
                                        onChange={(e) => this.handleParam3(e.target.value)}/>
                                </div>
                                <div className="row">
                                    <p>Parametro 4     </p>
                                    <input
                                        type="text"
                                        onChange={(e) => this.handleParam4(e.target.value)}/>
                                </div>

                                <button type="reset" className="btn col-sm-3 btn-primary " onClick="ClearFields();">Clear</button>
                            </form>


                        </div>
                        <div id="receptor" className="cardpersonalizada">
                            <h1>Resultado de la instruccion</h1>
                            <div className="column">
                                <p><b>instruccion realizada:</b> {this.consoleCommand}</p>
                                <p><b>resultado:</b> {this.state.output}</p>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

        );
    }

}

export default PrincipalCpu;

// <form>
//     <div className="form-group">
//         <h1>Principal CPU</h1>
//
//         <h1>RAM</h1>
//         <p>{this.state.ram}</p>
//         <h1>Cpu</h1>
//         <p>{this.state.cpu}</p>
//         <h1>Hhd</h1>
//         <p>{this.state.hhd}</p>
//         <h1>Processor Speed</h1>
//         <p>{this.state.hz}</p>
//     </div>
// </form>