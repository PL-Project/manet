import amd from '../images/amd.png'
import hp from '../images/hp.png'
import iphone from '../images/iphone.png'
import linux from '../images/linux.png'
import mac from '../images/mac.png'
import win_pc from '../images/win-pc.png'
import win_phone from '../images/win-phone.png'

function randomImage() {
    let select = Math.floor(Math.random()*7)
    switch (select) {
        case 0:
            return amd
            break;
        case 1:
            return hp
            break;
        case 2:
            return iphone
            break;
        case 3:
            return mac
            break;
        case 4:
            return win_pc
            break;
        case 5:
            return win_phone
            break;
        case 6:
            return linux
            break;

    }
}

class Node {

    constructor(width,height,size){
        this.size=size
        this.x = Math.random() * (width-size-1)+1;
        this.y= Math.random() * (height-size-1)+1;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5; 
        this.icon = new Image();
        this.icon.src =randomImage()//"https://img.icons8.com/color/144/000000/rick-sanchez.png";//'https://img.icons8.com/plasticine/100/000000/electronics.png';
    }

    get image(){
        return this.icon
    }

    draw(ctx) {
        ctx.drawImage(this.icon,this.x,this.y,this.size,this.size)
    }

    update(ctx,width,height) {

        if (this.x  > width-this.size || this.x  < 0) {
            this.dx = -this.dx;
        }
        if (this.y  > height-this.size  || this.y  < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw(ctx);
    }
   
}

export default Node;