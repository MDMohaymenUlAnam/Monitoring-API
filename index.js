// project initial file to start the server and background

const server = require('./lib/server');
const workers = require('./lib/worker');



const app = {};


 


app.init = () =>{
    // start the server
    server.init();


    // start the worker
    workers.init();

};

app.init();

module.exports = app;