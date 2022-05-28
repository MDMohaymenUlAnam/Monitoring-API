// worker related files

const data = require('./data');
const { parseJSON } = require('../helpers/utilities');



// worker object
const worker = {};

// lookup all the checks
worker.gatherAllChecks = () =>{
    data.list('checks', (err,checks) =>{
        if(!err && checks && checks.length > 0){
            checks.forEach(check => {
                // read the check data
                data.read('checks', check, (err, originalCheckData) =>{
                    if(!err && originalCheckData){
                        worker.validateCheckData(parseJSON(originalCheckData));
                        

                    }else{
                        console.log('error: reading one of the checks data');

                    }
                });
            } );

        }else{
            console.log('error: could not find any checks to process');
        }
    });

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