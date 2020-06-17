import React from 'react';
import Node from '../class/node'
import '../css/manet.css'
import map from '../images/map.jpg'


class Manet extends React.Component{

    constructor(props) {
        super(props);
        this.map = new Image();
        this.map.src= map
        
        this.init= this.init.bind(this);
        this.clear = this.clear.bind(this);
        this.start = this.start.bind(this);
        this.animate = this.animate.bind(this);
        this.scale = this.scale.bind(this);

        this.state={
            width: Number,
            height: Number,
            nodeArray: [],
            canvas:[],
            reqAnimation:0,
            On: false,
            
        }
    }

    componentDidMount(){
        
        this.state.canvas = document.getElementById('manet').getContext('2d');
        const canvas = this.refs.canvas
        this.state.width= canvas.width
        this.state.height= canvas.height
        
        this.map.onload=()=>{
            this.state.canvas.drawImage(this.map,0,0,this.state.width,this.state.height)
        }


    }



    start(){
        if(this.state.On){
            this.clear()
            this.start()
        }else{
            this.state.On=true
            this.init()
            this.animate()
        }
    }
    clear(){
        this.state.canvas.clearRect(0,0,this.state.width,this.state.height)
        window.cancelAnimationFrame(this.state.reqAnimation)
        this.state.On=false;
        this.state.canvas.drawImage(this.map,0,0,this.state.width,this.state.height)
    }
    init (e) {
        let numNodes= Math.floor(Math.abs(this.refs.numNodes.value))
        this.state.nodeArray=[]
        for (var i = 0; i < numNodes; i++) {
            let width =this.state.width;
            let height = this.state.height
            this.state.nodeArray.push(new Node(width,height,100/this.scale(numNodes)));
        }        

    }
    animate(){

        this.state.canvas.clearRect(0,0,this.state.width,this.state.height)
        this.state.canvas.drawImage(this.map,0,0,this.state.width,this.state.height)
        for (var i = 0; i < this.state.nodeArray.length; i++) {
            let node = this.state.nodeArray[i];
            node.update(this.state.canvas,this.state.width,this.state.height)
        }
        this.state.reqAnimation=window.requestAnimationFrame(this.animate);
        
    }
    scale(n){
        if(n<=3){
            return 1
        }else{
            return Math.log(n)
        }
    }
    render(){
        return(
            <div id="simulador" className="card">
                <h4 className="card-header">SIMULADOR</h4>
                <div id="bodycard" className="card-boddy">
                    <canvas id="manet" ref="canvas"></canvas>
                </div>
                <div id="footercard" className="card-footer">
                    <div className="row">
                        <input  className="col-sm-3 form-control" ref="numNodes" type="number" placeholder="# Nodos"/>
                        <button type="button" className="btn col-sm-3 btn-primary " onClickCapture={this.start}>Animar</button>
                        <button type="button" className="btn col-sm-3 btn-primary " onClickCapture={this.clear}>Limpiar</button>

                    </div>
                </div>
            </div>
        )
    }

    
}

export default Manet