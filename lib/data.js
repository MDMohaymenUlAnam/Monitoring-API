
const fs = require('fs');
const path = require('path');


const lib = {};


lib.basedir = path.join(__dirname, '/../.data/');

lib.create = function(dir,file,data,callback) {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', function(err, fileDescriptor){
        if(!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, function(err){
                if(!err){
                    fs.close(fileDescriptor, function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback('error closing the new file');
                        }
                    })
                }
            })
        } else{
            callback('can not create new file.');
        }
    });

};

lib.read = (dir,file,callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

module.exports = lib;