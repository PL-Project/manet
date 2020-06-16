import React from 'react';
import Node from './node'


class Manet extends React.Component{

    constructor(props) {
        super(props);
        this.map = new Image();
        this.map.src='https://vignette.wikia.nocookie.net/gtawiki/images/d/de/IvoryTowersHospital-GTASA-Map.png/revision/latest?cb=20180919181549'
        this.a = new Image();
        this.a.src='https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/map_marker_base-512.png'

        this.draw = this.draw.bind(this);
        this.init= this.init.bind(this);
        this.clear = this.clear.bind(this);
        this.start = this.start.bind(this);
        this.animate = this.animate.bind(this);

        this.state={
            width: 500,
            height: 500,
            nodeArray: [],
            canvas:[],
            reqAnimation:0,
            On: false,
            
        }
    }

    componentDidMount(){
        this.state.canvas = document.getElementById('manet').getContext('2d');
        this.state.canvas.restore();
        this.state.canvas.drawImage(this.map,0,0,this.state.width,this.state.height);
    }

    draw(){
        this.state.canvas.clearRect(0,0,this.state.width,this.state.height);
        this.state.canvas.drawImage(this.map,0,0,this.state.width,this.state.height);

        this.state.canvas.drawImage(this.a,0,0,50,50)

        for (let i = 0; i < this.state.nodeArray.length; i++) {
            this.state.nodeArray[i].draw(this.state.canvas)
        }
    }
    clear(){
        this.state.canvas.clearRect(0,0,this.state.width,this.state.height)
        this.state.canvas.restore()
        window.cancelAnimationFrame(this.state.reqAnimation)
        this.state.On=false;
        this.state.canvas.drawImage(this.map,0,0,this.state.width,this.state.height)
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
    animate(){

        this.state.canvas.clearRect(0,0,this.state.width,this.state.height)
        this.state.canvas.drawImage(this.map,0,0,this.state.width,this.state.height)
        for (var i = 0; i < this.state.nodeArray.length; i++) {
            let node = this.state.nodeArray[i];
            node.update(this.state.canvas,this.state.width,this.state.height)
        }
        this.state.reqAnimation=window.requestAnimationFrame(this.animate);
        
    }
    init (e) {
        let numNodes=this.refs.numNodes.value
        this.state.nodeArray=[]
        for (var i = 0; i < numNodes; i++) {
            let x = Math.floor(Math.random() * this.state.width);
            let y = Math.floor(Math.random() * this.state.height);
            let dx = (Math.random() - 0.5) * 3;
            let dy = (Math.random() - 0.5) * 3;
    
            this.state.nodeArray.push(new Node(x, y, dx, dy));
        }        
        console.log(this.state.nodeArray)

    }
    render(){
        return(
            <div width={this.state.width+100} height={this.state.height+100} > 
                <h1 class="row">Simulacion Manet</h1>
                <canvas class="row" id="manet" width={this.state.width} height={this.state.height}></canvas>
                <div class="row">
                    <div class="column" width="100">
                        <input  class="form-control" ref="numNodes" type="number" placeholder="Numero de Nodos"/>
                    </div>
                    <div class="column">
                        <button type="button" class="btn btn-primary btn-lg" onClickCapture={this.start}>Start!!</button>
                        <button type="button" class="btn btn-primary btn-lg" onClickCapture={this.clear} >clear</button>
                    </div>  
                </div>
            
            </div>
        )
    }

    
}

export default Manet