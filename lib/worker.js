// worker related files

const data = require('./data');



// worker object
const worker = {};

// lookup all the checks
worker.gatherAllChecks = () =>{

};


// timer to execute the worker process once per minute
worker.loop = () =>{
    setInterval(() =>{
        worker.gatherAllChecks();
    }, 1000 * 60)
};

// start the worker
worker.init = () =>{
    // execute the checks
    worker.gatherAllChecks();

    // call the loop so that continue
    worker.loop();
    
};
 

module.exports = worker;