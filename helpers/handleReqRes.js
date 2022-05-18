
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const{notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');


const handler = {}; 


handler.handleReqRes = (req, res) => {
    // request handling
    // get the handle and parse it
    const parsedurl = url.parse(req.url, true);
    const path = parsedurl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const querystringObject = parsedurl.query;
    const headersObject = req.headers;


    const requestProperties = {
        parsedurl,
        path,
        trimmedPath,
        method,
        querystringObject,
        headersObject, 
    }
    const decoder = new StringDecoder('utf8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    
    req.on('data', (buffer) =>{
        realData += decoder.write(buffer);

    } );

    req.on('end', () => {
        realData += decoder.end();
        
        chosenHandler(requestProperties, (statusCode, payload) =>{
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};
    
            const payloadString = JSON.stringify(payload);
    
            res.writeHead(statusCode);
            res.end(payloadString);
        });

        // response handle
        res.end('hello programmers');
    });

   
    
    
}; 

module.exports = handler;