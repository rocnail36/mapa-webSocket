const { Server } = require("socket.io");
var cors = require('cors');
const Bands = require("../models/bands");

class Socket {

    constructor(httpServer){
      this.io = new Server(httpServer,{cors:{origin:"http://localhost:5173"}})
    }


    start(){
        this.io.on("connection", (socket) => {
           

           socket.on("createMark",(data) => {
           
            this.io.emit("createMarkFromServer",data)
           })

           socket.on("moveMark",data => {
            this.io.emit("moveMarkFromServer",data)
           })


          });
    }

}


module.exports = Socket