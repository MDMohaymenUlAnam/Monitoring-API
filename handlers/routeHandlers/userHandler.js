const data = require('../../lib/data');
const  {hash} = require('../../helpers/utilities');
const  {parseJSON} = require('../../helpers/utilities');

const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get','post','put','delete'];
    if(acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties,callback);
    }else{
        callback(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof(requestProperties.body.firstName) === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof(requestProperties.body.lastName) === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

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

    const tosAgreement =
        typeof(requestProperties.body.tosAgreement) === 'boolean' &&
        requestProperties.body.tosAgreement
            ? requestProperties.body.tosAgreement
            : false;

    if(firstName && lastName && phone && password && tosAgreement) {
        // make sure the user does not exist
        data.read('users', phone , (err) =>{
            if(err){
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password : hash(password),
                    tosAgreement,

                };
                // store the user to db
                data.create('users', phone, userObject, (err) =>{
                    if(!err){
                        callback(200,{
                            message: 'user was created successfully',
                        });

                    }else {
                        callback(500, {
                            error: 'could not create',
                        })
                    }
                });

            }else{
                callback(500, {
                    error: 'there was a server side error',
                });
            }

        });

    }else {
        callback(400, {
            error : 'you have a problem in your request',
        });
    }

};

handler._users.get = (requestProperties, callback) => {
    // check the phone number is valid or not
    const phone =
        typeof(requestProperties.querystringObject.phone) === 'string' &&
        requestProperties.querystringObject.phone.trim().length === 11
            ? requestProperties.querystringObject.phone
            : false;

    if(phone){
        // lookup the user
        data.read('users', phone , (err,u) =>{
            const user = {...parseJSON(u)};
            if(!err && user){
                delete user.password;
                callback(200,user);


            }else {
                callback(404, {
                    error: 'requested user not found',
                });
            }

        });

    }else {
        callback(404, {
            error: 'requested user not found',
        });
    }

    

};



handler._users.put = (requestProperties, callback) => {
    // check the valid phone
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if (phone) {
        if (firstName || lastName || password) {
            // loopkup the user
            data.read('users', phone, (err1, uData) => {
                const userData = { ...parseJSON(uData) };

                if (!err1 && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.firstName = firstName;
                    }
                    if (password) {
                        userData.password = hash(password);
                    }

                    // store to database
                    data.update('users', phone, userData, (err2) => {
                        if (!err2) {
                            callback(200, {
                                message: 'User was updated successfully!',
                            });
                        } else {
                            callback(500, {
                                error: 'There was a problem in the server side!',
                            });
                        }
                    });
                } else {
                    callback(400, {
                        error: 'You have a problem in your request!',
                    });
                }
            });
        } else {
            callback(400, {
                error: 'You have a problem in your request!',
            });
        }
    } else {
        callback(400, {
            error: 'Invalid phone number. Please try again!',
        });
    }
};

handler._users.delete = (requestProperties, callback) => {

};
module.exports = handler;