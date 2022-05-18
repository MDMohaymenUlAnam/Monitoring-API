const http = require('http');


const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');


const app = {};

data.read('test', 'newfile',  (err,result) =>{
    console.log(err,result);
});



app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};

app.handleReqRes = handleReqRes;

app.createServer(); 