import React from 'react';

//components
import Info from './Info';
import LinkTable from './LinkTable';
import LogPage from './LogPage';
//js clases
import Node from '../class/node';
import NodeInfo from '../class/nodeInfo';
import Link from '../class/link';
import manetLog from '../class/log.js';
import Message from '../class/message';
//modal bootstrap
import {Modal} from 'react-bootstrap';
//images
import PCmessages from '../images/PCMSM.png';
import map from '../images/MAP.jpg';
//css styles
import '../css/manet.css';
import {Link as Linking} from 'react-router-dom';


import {BrowserRouter as Router, Route} from 'react-router-dom';

import link from '../class/link';


const mLog = new manetLog();

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
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openMlog = this.openMlog.bind(this);
        this.closeMlog = this.closeMlog.bind(this);
        this.openMTable = this.openMTable.bind(this);
        this.closeMTable = this.closeMTable.bind(this);


        this.state = {
            width: Number,
            height: Number,
            nodeArray: [],
            nodesInfo: [],
            TotalRAM : 0,
            Totalcpu : 0,
            Totalhz : 0,
            Totalhhd : 0,
            linkArray: [],
            logArray: [],
            canvas: [],
            reqAnimation: 0,
            On: false,

            visualizador:'',
            emisor:[],
            receptor: [],
            showModal: false,
            showMTable: false,
            showMLog: false
            

 

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

    clear(){
        mLog.clearLog();
        this.refs.textMessage.value='';
        this.state.canvas.clearRect(0,0,this.state.width,this.state.height)
        window.cancelAnimationFrame(this.state.reqAnimation)
        this.state.On = false
        this.state.nodeArray=[]
        this.state.nodesInfo=[]
        this.state.visualizador=''
        this.state.emisor=[]
        this.state.receptor=[]
        this.state.canvas.drawImage(this.map,0,0,this.state.width,this.state.height)


        this.setState({
            //obligo a actualizar las listas
        })
    }

    init() {        
        mLog.writeToLog("Log iniciado")
        mLog.writeToLog("Simulacion iniciada")
        let numNodes = Math.floor(Math.abs(this.refs.numNodes.value))
        this.state.nodeArray = []
        let nodos = []
        let nodosInfo = []
        for (var i = 0; i < numNodes; i++) {
            let width = this.state.width;
            let height = this.state.height;
            nodos.push(new Node(width, height, 300 / this.scale(numNodes), i));
            //constructor(id, ram, hhd, cpu, hz, maker,instructions, participation)
            nodosInfo.push(new NodeInfo(nodos[i].getId(),nodos[i].getRam(),nodos[i].getHhd(), nodos[i].getCPU(), nodos[i].getHz(), nodos[i].getMaker(), nodos[i].getInstructions(), nodos[i].getParticipation()));
            if(nodosInfo[i].participation == true){
                this.state.TotalRAM += nodos[i].ram;
                this.state.Totalcpu += nodos[i].cpu;
                this.state.Totalhhd += nodos[i].hhd;
                this.state.Totalhz += nodos[i].hz;
            }
        }

        this.state.nodeArray = nodos;
        this.state.log = mLog;


        this.state.nodeArray = nodos
        this.state.nodesInfo = nodosInfo
        this.setState({
            //obligo a actualizar las listas
        })

        if(numNodes>0){
            this.setState({
                visualizador: this.state.nodeArray[0]
            })
        }

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
        let nodeArray=this.state.nodeArray;

        for (let i = 0; i < nodeArray.length; i++) {
    
            for(let j = 0; j < nodeArray.length; j++){
    
                if(nodeArray[i].getId()!=nodeArray[j].getId()){                    
                    let distance= Math.sqrt(Math.pow(nodeArray[i].getX()-nodeArray[j].getX(),2)+Math.pow(nodeArray[i].getY()-nodeArray[j].getY(),2));
                    if(distance<300){
                        //console.log("In distance "+ nodeArray[i].getId() + nodeArray[j].getId());
                        if(nodeArray[i].getOpenHandshake()){                            
                            linkArray.push(new Link(nodeArray[i],nodeArray[j],"red"));
                            //console.log("New Link");
                            if(nodeArray[j].getOpenHandshake()){                                                            
                                linkArray.pop();
                                linkArray.push(new Link(nodeArray[i],nodeArray[j],"green"));
                            } else {
                                //mLog.writeToLog("Nodo "+ nodeArray[j].getId()+" rechaza conexión con nodo "+nodeArray[i].getId() );                            
                            }
                        }
                        
                    }
                }
    
            }
            
        }
        this.state.linkArray = linkArray
        
    }   

    // checkHandshake(node1,node2){
    //     if(node1.getOpenHandshake() && node2.getOpenHandshake()){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    getNodebyID(id) {
        for (let i = 0; i < this.state.nodeArray.length; i++) {
            if (id == this.state.nodeArray[i].getId()) {
                return this.state.nodeArray[i]
            }
        }
    }

    updateVisualizador(id){
        let node = this.getNodebyID(id);
        this.setState({
            visualizador: node
        })
    }
    updateEmisor(id){
        let node = this.getNodebyID(id);
        this.setState({
            emisor: node
        })
    }

    updateReceptor(id){

        let node = this.getNodebyID(id);
        this.setState({
            receptor: node
        })
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

    openMlog(){
        this.setState({
            showMLog: !this.state.showMLog
        })
    }
    closeMlog(){
        this.setState({
            showMLog: false
        })
    }

    openMTable(){
        this.setState({
            showMTable: !this.state.showMTable
        })
    }
    closeMTable(){
        this.setState({
            showMTable: false
        })
    }

    sendMessage(){
        let textMsj = this.refs.textMessage.value
        let E = this.refs.emisorSelect.value
        let R = this.refs.receptorSelect.value
        alert(E +"___"+R+"__MSJ::__"+textMsj)
        
    }
    
    render(){
        return(

            <div id="big" className="row">
                <div id="simulador" className="card">
                    <h4 className="card-header">SIMULADOR LENG2020-1 GRP3 </h4>
                    <div id="bodycard" className="card-boddy">
                        <canvas id="manet" ref="canvas" width="1920" height="1080" onClick={this.openMTable}></canvas>
                        <Modal show ={this.state.showMTable} onHide={this.closeMTable}>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <LinkTable linkList={this.state.linkArray}></LinkTable>
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div id="footercard" className="card-footer">
                        <div className="row">

                            <input  className="col-sm-3 form-control" ref="numNodes" type="number" placeholder="# Nodos" 
                            min="1" max="10" onKeyDown={(e) => {e.preventDefault();}}/>        

                            <button type="button" className="btn col-sm-3 btn-primary "
                                    onClickCapture={this.start}>Animar
                            </button>
                            <button type="button" className="btn col-sm-3 btn-primary "
                                    onClickCapture={this.clear} >Limpiar
                            </button>
                                                    
                            <Linking type="onClick" className="btn col-sm-3 btn-primary"
                                to={{
                                    pathname:'/MainCpu',
                                    state:{
                                        NumberOfNodes : this.state.nodeArray.length,
                                        RAM: this.state.TotalRAM,
                                        cpu: this.state.Totalcpu,
                                        Hhd: this.state.Totalhhd,
                                        hz: this.state.Totalhz,
                                        nodes: this.state.nodesInfo
                                    }
                                
                                }}>MainCpu </Linking>

                            <button type="button" className="btn col-sm-3 btn-primary" onClick={this.openMlog}>Log</button>
                            <Modal show ={this.state.showMLog} onHide={this.closeMlog}>
                                        <Modal.Header closeButton>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <LogPage log={this.state.logArray}></LogPage>
                                        </Modal.Body>
                                    </Modal>
                            
                        </div>
                    </div>
                </div>

                
                <div id="Herramientas" className="card">
                    <h5 className="card-header">HERRAMIENTAS</h5>
                    <div id="bodymensaje" className="card-body">

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
                                            <Info node = {this.state.visualizador} onClose ={this.closeModal}></Info>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                            <select type="select" className="form-control" onChange={(e)=>this.updateVisualizador(e.target.value)}> 
                                {this.state.nodeArray.map((node, key) => { return <option key={node.getId()} value={node.getId()} >Nodo {node.getId()} : {node.getMaker()} </option>; })} 
                            </select>
                        </div>
                         
                        

                        <div id="mensajes" className="cardpersonalizada" >
                            <h6>MENSAJES</h6>
                            <div className="container">
                                <div id="emisor" className="row selectorContainer">
                                    <label className="labelpersonalizada2 col-sm">Emisor :</label>
                                    <select className="form-control selectpp col-sm" ref="emisorSelect" type="select" onChange={(e)=>this.updateEmisor(e.target.value)}> 
                                        {this.state.nodeArray.map((node, key) => { return <option key={node.getId()} value={node.getId()} >Nodo {node.getId()}</option>; })} 
                                    </select>
                                </div>
                            </div>
                            <div className="container">
                                <div id="receptor" className="row selectorContainer">
                                    <label className="labelpersonalizada2 col-sm">Receptor :</label>
                                    <select className="form-control selectpp col-sm" ref="receptorSelect" type="select" onChange={(e)=>this.updateReceptor(e.target.value)}> 
                                        {this.state.nodeArray.map((node, key) => { return <option key={node.getId()} value={node.getId()} >Nodo {node.getId()}</option>; })} 
                                    </select>
                                </div>
                            </div>
                            <div className="container">
                                <div id="tipoMensaje" className="selectorContainer">
                                    <label className="labelpersonalizada2">Mensaje :</label>
                                    <textarea ref="textMessage"className="form-control" rows="1" ></textarea>
                                </div>
                            </div>
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
