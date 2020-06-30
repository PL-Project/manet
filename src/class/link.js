

class link {
    
    constructor(node1,node2,color){
        this.p1=node1.getCoordinates();
        this.p2=node2.getCoordinates();
        this.id1= node1.id;
        this.id2= node2.id;
        this.id = node1.id +" ---- "+node2.id;
        this.color =color
    }
    getId1(){
        return this.id1;
    }
    getId2(){
        return this.id2;
    }
    update(ctx,p1,p2){
        this.p1=p1;
        this.p2=p2;
        this.draw(ctx);
    }
    draw(ctx){
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.p1[0],this.p1[1]);
        ctx.lineTo(this.p2[0],this.p2[1]);
        ctx.stroke();
    }
}

export default link