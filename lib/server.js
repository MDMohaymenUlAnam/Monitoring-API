// server related files



const http = require('http');
const {handleReqRes} = require('../helpers/handleReqRes');

// server object
const server = {};



// configuration
server.config = {
    port: 3000,
};
 


server.createServer = () => {
    const serverVariable = http.createServer(server.handleReqRes);
    serverVariable.listen(server.config.port, () => {
        console.log(`listening to port ${server.config.port}`);
    });
};

server.handleReqRes = handleReqRes;

server.init = () =>{
    server.createServer();
};
 

module.exports = server;