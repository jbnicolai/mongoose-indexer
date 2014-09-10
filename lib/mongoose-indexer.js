module.exports = function(options){
//  This is how to options obj should look like
//    options.host
//    options.port
//    options.username
//    options.password
//    options database
//    options.files


    
    var chalk = require('chalk');
    
    // set console.log/console.error prefix
    var clog = console.log;
    console.log = function(str){
        clog(new Date().toLocaleTimeString() + ' - ' + chalk.green('[Mongoose-indexer] ' + str));
    }

    var cerr = console.error;
    console.error = function(str){
        cerr(new Date().toLocaleTimeString() + ' - ' + chalk.red('[Mongoose-indexer] ' + str));
    }
    
    //output the version
    console.log('v' + require('../package.json').version);
    
    // build the connection string
    var connectionString = "mongodb://" + (options.username ? options.username + ":" + options.password + "@" : "") + options.host + (options.port ? ":" + options.port : "") + "/" + options.database;
    var mongoose = require('mongoose');
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    
    // mongodb connection error handler
    db.on('error', function(err){
        console.error(err);
        process.exit(-1);
    });
    
    var async = require("async");


    async.waterfall([
        function getFilenames(callback){
            var glob = require("glob");
            // get filenames;
            var filenames = [];
         
            async.eachSeries(options.files, function each(filename, callback){
       
                glob(filename, function (err, files){
                    filenames = filenames.concat(files);
                    callback(err);
                })
            },function done(err){
                callback(err, filenames);
            });
        },
        
        function loadFiles(filenames, callback) {
            // require all files
            var models = [];
            for (var i=0; i<filenames.length; i++){
      
                var model = require( process.cwd() + '/' + filenames[i]);
                //check if model have ensureIndexes function
                if (!model.ensureIndexes){
                    console.error(filenames[i] + ' is not a valid mongoose model');
                } else { 
                    models.push(model);
                }
            }
            
            callback(null, models);
        },
                
        function buildIndexes(models, callback){
            //build indexes for models
            async.eachSeries(models, function each(model, callback){
                console.log('Building indexes for model ' + model.modelName + ' ...');
                model.ensureIndexes(function(err){
                    if (err){
                        console.error('Failed: ' + err.message);
                    } else {
                        console.log('OK');
                    }
                    callback(null);
                });
            },function done(err){
                callback(err);
            });
        }
        
    ], function done(err){
        if (err){
            console.error(err);
            process.exit(-1);
        } else {
            console.log('Done!');
            process.exit(1);
        }
    });
    

    
}
