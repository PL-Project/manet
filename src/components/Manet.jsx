import React from 'react';
import Node from '../class/node';
import {Link as Linking} from 'react-router-dom';
import Message from '../class/message';
import '../css/manet.css';
import map from '../images/map3.jpg';

import PCmessages from '../images/PCmessages.png';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrincipalCpu from "./PrincipalCpu";
import link from '../class/link';
import Link from '../class/link';
class Manet extends React.Component {

    constructor(props) {
        super(props);
        this.map = new Image();
        this.map.src = map

        this.init = this.init.bind(this);
        this.clear = this.clear.bind(this);
        this.start = this.start.bind(this);
        this.animate = this.animate.bind(this);
        this.scale = this.scale.bind(this);
        this.createLinks = this.createLinks.bind(this);
        this.getNodebyID = this.getNodebyID.bind(this);
        this.updateEmisor = this.updateEmisor.bind(this);
        this.updateReceptor = this.updateReceptor.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            width: Number,
            height: Number,
            nodeArray: [],
            TotalRAM : 0,
            Totalcpu : 0,
            Totalhz : 0,
            Totalhhd : 0,
            linkArray: [],
            canvas: [],
            reqAnimation: 0,
            On: false,
            emisor: '',
            receptor: ''

        }
    }

    componentDidMount() {
        this.setState({
            canvas: document.getElementById('manet').getContext('2d')
        })

        const canvas = this.refs.canvas
        this.setState({
            width: canvas.width,
            height: canvas.height,
        })

        console.log("ancho: " + this.state.width + " alto: " + this.state.height)
        this.map.onload = () => {
            this.state.canvas.drawImage(this.map, 0, 0, this.state.width, this.state.height)
        }


    }

    start() {
        if (this.state.On) {
            this.clear()
            this.start()
        } else {
            this.state.On = true
            this.init()
            this.animate()
        }
    }

    clear() {
        this.state.canvas.clearRect(0, 0, this.state.width, this.state.height)
        window.cancelAnimationFrame(this.state.reqAnimation)
        this.state.On = false
        this.state.nodeArray = []
        this.state.emisor = ""
        this.state.receptor = ""
        this.state.canvas.drawImage(this.map, 0, 0, this.state.width, this.state.height)
        this.setState({
            //obligo a actualizar las listas
        })
    }

    init() {
        let numNodes = Math.floor(Math.abs(this.refs.numNodes.value))
        this.state.nodeArray = []
        let nodos = []
        for (var i = 0; i < numNodes; i++) {
            let width = this.state.width;
            let height = this.state.height;
            nodos.push(new Node(width, height, 300 / this.scale(numNodes), i));
            if(nodos[i].participation == true){
                this.state.TotalRAM += nodos[i].ram;
                this.state.Totalcpu += nodos[i].cpu;
                this.state.Totalhhd += nodos[i].hhd;
                this.state.Totalhz += nodos[i].hz;
            }
        }

        this.state.nodeArray = nodos
        this.setState({
            //obligo a actualizar las listas
        })

    }

    animate() {
        this.state.canvas.clearRect(0, 0, this.state.width, this.state.height)
        this.state.canvas.drawImage(this.map, 0, 0, this.state.width, this.state.height)

        for (var i = 0; i < this.state.nodeArray.length; i++) {
            let node = this.state.nodeArray[i];
            node.update(this.state.canvas, this.state.width, this.state.height)
        }

        this.createLinks();

        for (var i = 0; i < this.state.linkArray.length; i++) {
            let link = this.state.linkArray[i];
            link.update(this.state.canvas, this.getNodebyID(link.getId1()).getCoordinates(), this.getNodebyID(link.getId2()).getCoordinates())
        }

        this.state.reqAnimation = window.requestAnimationFrame(this.animate);

    }

    scale(n) {
        if (n <= 3) {
            return 1
        } else {
            return Math.log(n)
        }
    }

    createLinks() {
        let linkArray = [];
        let nodeArray = this.state.nodeArray;

        for (let i = 0; i < nodeArray.length; i++) {

            for (let j = 0; j < nodeArray.length; j++) {

                if (nodeArray[i].getId() != nodeArray[j].getId()) {

                    let distance = Math.sqrt(Math.pow(nodeArray[i].getX() - nodeArray[j].getX(), 2) + Math.pow(nodeArray[i].getY() - nodeArray[j].getY(), 2));
                    if (distance < 80) {
                        linkArray.push(new Link(nodeArray[i], nodeArray[j]));
                    }
                }

            }

        }
        this.state.linkArray = linkArray

    }

    getNodebyID(id) {
        for (let i = 0; i < this.state.nodeArray.length; i++) {
            if (id == this.state.nodeArray[i].getId()) {
                return this.state.nodeArray[i]
            }
        }
    }

    updateEmisor(id) {

        let node = this.getNodebyID(id);

        this.setState({
            emisor: node.toString()
        })
    }

    updateReceptor(id) {

        let node = this.getNodebyID(id);

        this.setState({
            receptor: node.toString()
        })
    }

    sendMessage() {
        alert("enviando msj...");
    }

    render() {
        return (

            <div id="big" className="row">
                <div id="simulador" className="card">
                    <h4 className="card-header">SIMULADOR LENG2020-1 GRP3 </h4>
                    <div id="bodycard" className="card-boddy">
                        <canvas id="manet" ref="canvas" width="1920" height="1080"></canvas>
                    </div>
                    <div id="footercard" className="card-footer">
                        <div className="row">
                            <input className="col-sm-3 form-control" ref="numNodes" type="number" placeholder="# Nodos"
                                   min="1" max="500"/>
                            <button type="button" className="btn col-sm-3 btn-primary "
                                    onClickCapture={this.start}>Animar
                            </button>
                            <button type="button" className="btn col-sm-3 btn-primary "
                                    onClickCapture={this.clear}>Limpiar
                            </button>
                            <Linking type="onClick" className="btn col-sm-3 btn-primary"
                                to={{
                                    pathname:'/MainCpu',
                                    state:{
                                        NumberOfNodes : this.state.nodeArray.length,
                                        RAM: this.state.TotalRAM,
                                        cpu: this.state.Totalcpu,
                                        Hhd: this.state.Totalhhd,
                                        hz: this.state.Totalhz
                                    }
                                
                                }}>MainCpu </Linking>

                        </div>
                    </div>
                </div>

                <div id="mensajes" className="card">
                    <h5 className="card-header">MENSAJES</h5>
                    <div id="bodymensaje" className="card-body">
                        <div id="emisor" className="cardpersonalizada">
                            <h6>EMISOR</h6>
                            <div className="row">
                                <img src={PCmessages} className="column imagenpersonalizada"/>
                                <label className="column labelpersonalizada"
                                       ref="emisorINFO">{this.state.emisor}</label>
                            </div>
                            <select ref="emisorSelect" type="select" className="form-control"
                                    onChange={(e) => this.updateEmisor(e.target.value)}>
                                {this.state.nodeArray.map((node, key) => {
                                    return <option key={node.getId()} value={node.getId()}>Nodo {node.getId()}</option>;
                                })}
                            </select>
                        </div>

                        <div id="receptor" className="cardpersonalizada">
                            <h6>RECEPTOR</h6>
                            <div className="row">
                                <img src={PCmessages} className="column imagenpersonalizada"/>
                                <label className="column labelpersonalizada"
                                       ref="emisorINFO">{this.state.receptor}</label>
                            </div>
                            <select ref="receptorSelect" type="select" className="form-control"
                                    onChange={(e) => this.updateReceptor(e.target.value)}>
                                {this.state.nodeArray.map((node, key) => {
                                    return <option key={node.getId()} value={node.getId()}>Nodo {node.getId()}</option>;
                                })}
                            </select>
                        </div>


                    </div>
                    <div id="piemsj" className="card-footer">
                        <button id="enviarmsj" type="button" className="btn col-sm-3 btn-primary"
                                onClick={this.sendMessage}>Enviar
                        </button>
                    </div>
                </div>
            </div>


        )
    }


}

export default Manet
// to={{pathname:'/MainCpu', state:{nodeArray: this.state.nodeArray}}}>MainCpu </Linking>
