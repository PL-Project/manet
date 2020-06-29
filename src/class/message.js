
class Message {


    constructor(source,destiny){
        this.source=source;
        this.destiny= destiny;
        this.body = '';
    }

    getSource(){
        return this.source;
    }
    getDestiny(){
        return this.destiny;
    }
    getBody(){
        return this.body;
    }


}

export default Message