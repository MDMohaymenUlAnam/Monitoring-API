
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

lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err) {
                    // write on file
                    fs.writeFile(fileDescriptor,stringData, (err) =>{
                        if(!err){
                            // close the file
                            fs.close(fileDescriptor,(err) =>{
                                if(!err){
                                    callback(false);
                                }else {
                                    callback('error closing file');
                                }
                            });
                        }else{
                            callback('error writing to file');
                        }
                    });
                }else {
                    callback('error truncating');
                }
            });
        }else {
            console.log('error updating');
        }
});

};

lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback(`Error deleting file`);
        }
    });
};

// list all the items in a directory
lib.list = (dir,callback) => {
    fs.readdir(`${lib.basedir + dir}/`, (err, fileNames) =>{
        if(!err && fileNames && fileNames.length > 0){
            let trimmedFileNames = [];
            fileNames.forEach(fileName => {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callback(false, trimmedFileNames);

        }else{
            callback('error reading directory');
        }

    } );

};


module.exports = lib;