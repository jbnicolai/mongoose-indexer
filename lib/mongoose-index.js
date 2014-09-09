module.exports = function(options){
//    options.host
//    options.port
//    options.username
//    options.password
//    options database
//    options.files
    var connectionString = "mongodb://" + (options.username ? options.username + ":" + options.password + "@" : "") + options.host + (options.port ? ":" + options.port : "") + "/" + options.database;
    var mongoose = require('mongoose');
    var db = mongoose.connect(config.database.connectionString);
    db.on('error', function(err){
        console.error(err);
        process.exit(-1);
    });
    
    var async = require("async");
    var glob = require("glob");
    var filenames = [];
    
    
}
