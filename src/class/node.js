import AMD from '../images/Makers/AMD.png'
import DELL from '../images/Makers/DELL.PNG'
import INTEL from '../images/Makers/INTEL.png'
import QUALCOMM from '../images/Makers/QUALCOMM.png'


function randomRAM() {
    return Math.floor(Math.random() * 64);
}
function randomHHD() {
    let select = Math.floor(Math.random()*10)
    switch (select) {
        case 0:
            return 50
            break;
        case 1:
            return 100
            break;
        case 2:
            return 150
            break;
        case 3:
            return 200
            break;
        case 4:
            return 300
            break;
        case 5:
            return 500
            break;
        case 6:
            return 1000
            break;
        case 7:
            return 2000
            break;
        case 8:
            return 5000
            break;
        case 9:
            return 800
            break;
    }
}
function randomCPU() {
    return Math.floor(Math.random() *8);
}
function randomHZ() {
    let select = Math.floor(Math.random()*10)
    switch (select) {
        case 0:
            return 1.5
            break;
        case 1:
            return 2.3
            break;
        case 2:
            return 3.1
            break;
        case 3:
            return 3.0
            break;
        case 4:
            return 4.0
            break;
        case 5:
            return 4.1
            break;
        case 6:
            return 4.3
            break;
        case 7:
            return 2.5
            break;
        case 8:
            return 1.1
            break;
        case 9:
            return 2.0
            break;
    }
}
function randomMAKER() {
    let select = Math.floor(Math.random()*4)
    switch (select) {
        case 0:
            return "AMD"
            break;
        case 1:
            return "INTEL"
            break;
        case 2:
            return "QUALCOMM"
            break;
        case 3:
            return "DELL"
            break;
    }
}
function Instructions(maker) {
    switch (maker) {
        case "AMD":
            return [
                "Move",
                "Store",
                "Load",
                "Add",
                "multiply",
                "Substract",
                "compare",
                "NAND",
                "NOR",
                "Shift",
                "jmpnz",
                "halt"
            ]
            break;
        case "INTEL":
            return [
                "Move",
                "Store",
                "Load",
                "Add",
                "divide",
                "Substract",
                "compare",
                "NOT",
                "AND",
                "OR",
                "jmpg",
                "wait",
                
            ]
            break;
        case "QUALCOMM":
            return [
                "Move",
                "Store",
                "Load",
                "Substract",
                "divide",
                "zero test",
                "NOT",
                "AND",
                "XOR",
                "jmp"
            ]
            break;
        case "DELL":
            return [
                "Move",
                "Add",
                "Store",
                "Load",
                "Substract",
                "Move multiple",
                "Push",
                "Pop",
                "Multiply"
            ]
            break;
    }
}
function randomImage(maker) {
    switch (maker) {
        case "AMD":
            return AMD;
            break;
        case "INTEL":
            return INTEL;
            break;
        case "QUALCOMM":
            return QUALCOMM;
            break;
        case "DELL":
            return DELL;
            break;
    }
}

class Node {

    constructor(width,height,size,id){
        this.id=id;
        this.size=size
        this.x = Math.random() * (width-size-1)+1;
        this.y= Math.random() * (height-size-1)+1;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5; 
        

        //properties
        this.participation = Math.random() >= 0.5;
        this.ram = randomRAM()
        this.cpu = randomCPU()
        this.hz = randomHZ();
        this.hhd = randomHHD()
        //fabricante
        this.maker = randomMAKER()
        this.instructions = Instructions(this.maker)
        
        //maker --> image
        this.icon = new Image();
        this.icon.src =randomImage(this.maker)

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
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getId(){
        return this.id;
    }
    getCoordinates(){
        return [this.x+(this.size/2),this.y+(this.size/2)];
    }

    toString(){
        return "Cpu: " +this.cpu+"\nVelocidad: "+this.hz+"Hz"+"\nRam: "+this.ram+"GB" + "\nDisco: "+this.hhd+"GB";
    }
   
}

export default Node;