import AMD from '../images/Makers/AMD.png'
import DELL from '../images/Makers/DELL.PNG'
import INTEL from '../images/Makers/INTEL.png'
import QUALCOMM from '../images/Makers/QUALCOMM.png'

class NodeInfo {

    constructor(id, ram, hhd, cpu, hz, maker,instructions, participation){
        this.id = id;
        this.participation = participation;
        this.ram = ram;
        this.cpu = cpu;
        this.hz = hz;
        this.hhd = hhd;
        this.maker = maker;
        this.instructions = instructions;
        this.image = ""
        this.storeNum = 0
        this.registers = [0,0,0,0]
    }

    getId(){
        return this.id;
    }
    getStoreNum(){
        return this.storeNum;
    }
    setStoreNum(val){
       this.storeNum = val;
    }
    getMaker(){
        return this.maker;
    }

    getInstructions(){
        return this.instructions
    }
    getRam(){
        return this.ram;
    }
    getCPU(){
        return this.cpu;
    }
    getHz(){
        return this.hz;
    }
    getHhd(){
        return this.hhd;
    }
    getParticipation(){
        return this.participation;
    }
    toString(){
        return "Fabricante: "+this.maker +
            ", Cpu: " + this.cpu+ " nucleos"+
            ", Velocidad: " +this.hz + " Hz"+
            ", Disco Duro: " + this.hhd +" GB";
    }

    setImageSrc(src){
        this.image = new Image();


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
                this.image.src =AMD;
                break;
        }
        return this.image;
    }
    getRegisters(){
        return this.registers;
    }
    getImage(){
        return this.image;
    }
}

export default NodeInfo;