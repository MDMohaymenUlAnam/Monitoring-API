const data = require('../../lib/data');
const  {hash} = require('../../helpers/utilities');
const  {parseJSON} = require('../../helpers/utilities');
const  {createRandomString} = require('../../helpers/utilities');

const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get','post','put','delete'];
    if(acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties,callback);
    }else{
        callback(405);
    }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
    const phone =
        typeof(requestProperties.body.phone) === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof(requestProperties.body.password) === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;
    if(phone && password){
        data.read('users', phone, (err, userData) =>{
            let hashedpassword = hash(password);
            if(hashedpassword === parseJSON(userData).password){
                let tokenId = createRandomString(20);
                let expires = Date.now() + 60*60*1000;
                let tokenObject = {
                    phone,
                    'id':tokenId,
                    expires
                };
                // store the token
                data.create('tokens',tokenId,tokenObject,(err) =>{
                    if(!err){
                        callback(200, tokenObject);

                    }else{
                        callback(500, {
                            error: 'there waS a problem in server side',
                        });
                    }

                });

            }else{
                callback(400, {
                    error: 'password is not valid',
                });
            }

        });

    }else{
        callback(400, {
            error: 'you have a problem in your request',
        });
    }

};

handler._token.get = (requestProperties, callback) => {
    // check the id is valid or not
    const id =
        typeof(requestProperties.querystringObject.id) === 'string' &&
        requestProperties.querystringObject.id.trim().length === 20
            ? requestProperties.querystringObject.id
            : false;

    if(id){
        // lookup the token
        data.read('tokens', id , (err,tokenData) =>{
            const token = {...parseJSON(tokenData)};
            if(!err && token){
                callback(200,token);
            }else {
                callback(404, {
                    error: 'requested token not found',
                });
            }

        });

    }else {
        callback(404, {
            error: 'requested token was not found',
        });
    }

    

};



handler._token.put = (requestProperties, callback) => {
    const id =
        typeof(requestProperties.body.id) === 'string' &&
        requestProperties.body.id.trim().length === 20
            ? requestProperties.body.id
            : false;

     const extend =
        typeof(requestProperties.body.extend) === 'boolean' &&
        requestProperties.body.extend === true
            ? true
            : false;

    if(id && extend){
        data.read('tokens', id, (err, tokenData) =>{
            let tokenObject = parseJSON(tokenData);
            if(tokenObject.expires > Date.now()){
                tokenObject.expires = Date.now() + 60*60*1000;

                // store the updated token
                data.update('tokens', id, tokenObject,(err) =>{
                    if(!err){
                        callback(200);
                    }else {
                        callback(500, {
                            error : 'server side error',

                        });
                    }

                });
            }else {
                callback(400, {
                    error : 'token already expired',
                });
            }

        });
    }else {
        callback(400, {
            error: 'There was a problem in your request',
        });
    }
    
};

handler._token.delete = (requestProperties, callback) => {
    const id =
        typeof(requestProperties.querystringObject.id) === 'string' &&
        requestProperties.querystringObject.id.trim().length === 20
            ? requestProperties.querystringObject.id
            : false;

    if(id) {
        data.read('tokens', id , (err, tokenData) =>{
            if(!err && tokenData){
                data.delete('tokens', id, (err)=>{
                    if(!err){
                        callback(200,{
                            message: 'token was deleted successfully',
                        });
                    }else {
                        callback(500, {
                            error: 'there was a server side problem',
                        });
                    }

                });
            }else {
                callback(500, {
                    error: 'there was a server side problem',
                });
            }
        })
    }else {
        callback(400, {
            error: 'there was a problem in the request',
        });
    }

    

};
module.exports = handler;