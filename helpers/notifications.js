const https = require('https');
const { twilio } = require('./environments');

const Notification = {};


notifications.sendTwilioSms = (phone,msg, callback) =>{
    // input validation

    const userPhone = typeof(phone) === 'string' && phone.trim().length ===11?
    phone.trim() : false;

    const userMsg = typeof(msg) === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600?
    msg.trim() : false;

    if(userPhone && userMsg){
        // configure the request
        const payload = {
            From: twilio.fromPhone,
            To: `+88${userPhone}`,
            Body: userMsg,
        };

        // stringify the request payload

    }else {
        callback('given parameters were missing ');
    }

    
};

module.exports = notifications;