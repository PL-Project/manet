//import cpu from ''
class Node {

    constructor(x, y, dx, dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;  
        this.icon = new Image();
        this.icon.src ='https://img.icons8.com/plasticine/100/000000/electronics.png';
    }

    get image(){
        return this.icon
    }

    draw(ctx) {
        ctx.drawImage(this.icon,this.x,this.y,70,70)
    }

    update(ctx,width,height) {

        if (this.x  > width || this.x  < 0) {
            this.dx = -this.dx;
        }
        if (this.y  > height || this.y  < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw(ctx);
    }
   
}

export default Node;