var globalLog = []
class manetLog{
    constructor(){
    }
    
    writeToLog(text){
        var currentdate = new Date(); 
        var datetime = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        if((text != globalLog[globalLog.length-1])||(globalLog.length==0) ){
            globalLog.push(datetime +"---"+ text +' \n');
        }
        console.log(globalLog);
    }

    getLog(){
        return globalLog.toString().replace(",","");
    }

    getArray(){
        return globalLog;
    }

    clearLog(){
        globalLog = [];
    }


    
}

export default manetLog;