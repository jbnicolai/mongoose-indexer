mongoose-indexer
==================
mongoose-indexer is a command line interface to create indexes for mongoose model.
It is particularly useful if you disabled mongoose auto indexing feature to avoid auto indexing everytime 
when the application runs on production enviroment.
You can run this script on production or include it as part of your deployment.

Install
-------------------

    npm install mongoose-indexer -g

Usage
------------------

    mongoose-indexer -username [username] --password [password] --host [host] --port [port] [database] [files]

Accepted Mongoose Model Format
--------------------
Your mongoose model MUST use mongoose object passed from outside

    module.exports = function(mongoose){
      return mongoose.model('a', {name : String});
    }
