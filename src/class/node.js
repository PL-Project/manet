import AMD from '../images/Makers/AMD.png'
import DELL from '../images/Makers/DELL.PNG'
import INTEL from '../images/Makers/INTEL.png'
import QUALCOMM from '../images/Makers/QUALCOMM.png'

function randomRAM() {
    return Math.floor(Math.random() * 64)+1;
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
    return Math.floor(Math.random() *8)+1;
}
function randomHZ() {
    let select = Math.floor(Math.random()*10);
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
        this.v=0.5;
        this.x = Math.random() * (width-size-1)+1;
        this.y= Math.random() * (height-size-1)+1;
        this.dx = (Math.random() - 0.5) * this.v;
        this.dy = (Math.random() - 0.5) * this.v; 
        

        //properties
        this.participation = Math.random() >= 0.5;
        this.ram = randomRAM();
        this.cpu = randomCPU();
        this.hz = randomHZ();
        this.hhd = randomHHD();
        //fabricante
        this.maker = randomMAKER()
        this.instructions = Instructions(this.maker)
        
        //maker --> image
        this.image = new Image();
        this.image.src =randomImage(this.maker)

    }

    getId(){
        return this.id;
    }
    setId(id){
        this.id= id;
    }
    getImage(){
        return this.image;
    }
    setImage(img){
        this.image=img;
    }
    getImageSrc(){
        return this.img.src;
    }
    setImageSrc(src){
        switch (src) {
            case "AMD":
                this.image.src =AMD;
                break;
            case "INTEL":
                this.image.src =INTEL;
                break;
            case "QUALCOMM":
                this.image.src =QUALCOMM;
                break;
            case "DELL":
                this.image.src =DELL;
                break;
            default:
                this.image.src =src;
                break;
        }
    }
    getMaker(){
        return this.maker;
    }
    setMaker(maker){
        switch (maker) {
            case "AMD":
                this.maker=maker;
                this.setInstructions(maker);
                this.setImageSrc(maker);
                break;
            case "INTEL":
                this.maker=maker;
                this.setInstructions(maker);
                this.setImageSrc(maker);
                break;
            case "QUALCOMM":
                this.maker=maker;
                this.setInstructions(maker);
                this.setImageSrc(maker);
                break;
            case "DELL":
                this.maker=maker;
                this.setInstructions(maker);
                this.setImageSrc(maker);
                break;
            default:
                this.maker=maker;
                this.setInstructions(maker);
                this.setImageSrc(maker);
                break;
        }
    }
    getInstructions(){
        return this.instructions
    }
    setInstructions(maker){
        switch (maker) {
            case "AMD":
                this.instructions=[
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
                this.instructions=[
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
                this.instructions=[
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
                this.instructions=[
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
    getRam(){
        return this.ram;
    }
    setRam(ram){
        this.ram = ram;
    }
    getCPU(){
        return this.cpu;
    }
    setCpu(cpu){
        this.cpu = cpu;
    }
    getHz(){
        return this.hz;
    }
    setHz(hz){
        this.hz=hz;
    }
    getHhd(){
        return this.hhd
    }
    setHhd(hhd){
        this.hhd=hhd;
    }
    getX(){
        return this.x;
    }
    setX(x){
        this.x=x;
    }
    getY(){
        return this.y;
    }
    setY(y){
        this.y = y;
    }
    getDx(){
        return this.dx;
    }
    setDx(dx){
        this.dx=dx;
    }
    getDy(){
        return this.dy;
    }
    setDy(dy){
        this.dy=dy;
    }
    getV(){
        return this.v;
    }
    setV(ve){
        this.dx=(this.dx/this.v )*ve;
        this.dy=(this.dy/this.v )*ve;
        
        this.v=ve;
    }
    getCoordinates(){
        return [this.x+(this.size/2),this.y+(this.size/2)];
    }


    draw(ctx) {
        ctx.drawImage(this.image,this.x,this.y,this.size,this.size)
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
    
    toString(){
        return "Fabricante: "+this.maker +
                ", Cpu: " + this.cpu+ " nucleos"+
                ", Velocidad: " +this.hz + " Hz"+
                ", Disco Duro: " + this.hhd +" GB";
    }
   
}

export default Node;