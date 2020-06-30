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
    }

    getId(){
        return this.id;
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

}

export default NodeInfo;