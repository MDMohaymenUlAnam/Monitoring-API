

const {sampleHandler} = require('./handlers/routeHandlers/samplehandler');
const {userHandler} = require('./handlers/routeHandlers/userHandler');
const{tokenHandler} = require('./handlers/routeHandlers/tokenHandler');
const routes = {
    'sample': sampleHandler,
    'user': userHandler,
    'token': tokenHandler,
    
};

module.exports = routes;