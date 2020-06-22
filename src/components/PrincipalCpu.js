import React from 'react';
import Node from '../class/node'
import '../css/principalCpu.css'

class PrincipalCpu extends React.Component {
    constructor(props) {
        super(props);
        this.consoleCommand = "";
        this.param1 = "";
        this.param2 = "";
        this.param3 = "";
        this.param4 = "";
    }

    // this.ram = randomRAM()
    // this.cpu = randomCPU()
    // this.hz = randomHZ();
    // this.hhd = randomHHD()
    state = {
        nodes: [],
        ram: Number,
        cpu: Number,
        hz: Number,
        hhd: Number,
        command: "",
        value1: Number,
        value2: Number,
        newVal: "",
        output: ""
    }

    async componentDidMount() {
        let numNodes = 1000;

        for (var i = 0; i < numNodes; i++) {
            let width = 500;
            let height = 500;
            this.state.nodes.push(new Node(width, height, 100 / 2));
        }

        var i;
        // this.ram = randomRAM()
        // this.cpu = randomCPU()
        // this.hz = randomHZ();
        // this.hhd = randomHHD()
        var totalRam = 0;
        var totalCpu = 0;
        var totalHz = 0;
        var totalHhd = 0;
        if (this.state.nodes.length > 0) {
            for (i = 0; i < this.state.nodes.length; i++) {
                if (this.state.nodes[i].participation == 1) {
                    console.log(this.state.nodes[i].participation)
                    totalRam += this.state.nodes[i].ram;
                    totalCpu += this.state.nodes[i].cpu;
                    totalHz += this.state.nodes[i].hz;
                    totalHhd += this.state.nodes[i].hhd;

                    if (i == this.state.nodes.length - 1) {
                        this.setState({
                            ram: totalRam
                        });
                        this.setState({
                            cpu: totalCpu
                        });
                        this.setState({
                            hz: totalHz
                        });
                        this.setState({
                            hhd: totalHhd
                        });
                        break;
                    }
                }
            }
        }
    }

    handleCommand(value) {
        this.consoleCommand = value;
        console.log(this.consoleCommand);
        if (this.consoleCommand.toString() == "add") {
            this.setState(
                {
                    output: "hi teacher"
                }
            )
        } else {
            this.setState(
                {
                    output: ""
                }
            )
        }
    }

    handleParam1(value) {
        this.param1 = value;
        console.log(this.param1);
    }

    handleParam2(value) {
        this.param2 = value;
        console.log(this.param2);
    }

    handleParam3(value) {
        this.param3 = value;
        console.log(this.param3);
    }

    handleParam4(value) {
        this.param4 = value;
        console.log(this.param4);
    }
    handleInstruction(){
        console.log(this.consoleCommand.toString());
        if(this.consoleCommand.toString() == "add"){
            var total = this.add(this.param1, this.param2);
            total = total.toString();
            this.setState({
                newVal : total
            })
        }
    }
    add(val, val2) {
        var suma = val + val2;
        suma = suma.toString();
        this.setState(
            {
                output: suma
            }
        )
    }

    render() {
        return (
            <div id="big" className="row">
                <div id="specificationBox" className="card">
                    <h4 className="card-header">CPU Principal</h4>
                    <div id="bodycard" className="card-boddy">
                        <h1>RAM</h1>
                        <p>{this.state.ram}</p>
                        <h1>Cpu</h1>
                        <p>{this.state.cpu}</p>
                        <h1>Hhd</h1>
                        <p>{this.state.hhd}</p>
                        <h1>Processor Speed</h1>
                        <p>{this.state.hz}</p>
                    </div>

                </div>

                <div id="mainConsole" className="card">
                    <h5 className="card-header">Consola</h5>
                    <div id="bodymensaje" className="card-body">
                        <div id="emisor" className="cardpersonalizada">
                            <h6>Escribe el comando a ejecutar</h6>
                            <div className="row">
                                <input
                                    type="text"
                                    onChange={(e) => this.handleCommand(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <p>Parametro 1</p>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleParam1(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <p>Parametro 2</p>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleParam2(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <p>Parametro 3</p>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleParam3(e.target.value)}/>
                            </div>
                            <div className="row">
                                <p>Parametro 4</p>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleParam4(e.target.value)}/>
                            </div>
                            <div className="row">
                                <button onClick={this.handleInstruction}>Click Here</button>
                            </div>

                        </div>
                        <div id="receptor" className="cardpersonalizada">
                            <h6>Resultado de la instruccion</h6>
                            <div className="row">
                                <p>{this.state.command}</p>
                                <p>{this.state.output}</p>
                                <h6>Resultado</h6>
                                <h6>{this.param1}</h6>
                                <h6>{this.state.newVal}</h6>
                                <h6>{this.consoleCommand}</h6>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

        );
    }

}

export default PrincipalCpu;
