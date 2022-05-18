const http = require('http');


const {handleReqRes} = require('./helpers/handleReqRes');


const app = {};



app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

app.handleReqRes = handleReqRes;

app.createServer(); 