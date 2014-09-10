#!/usr/bin/env node

var mongooseIndexer = require("../lib/");
var argv = require('yargs')
            .usage('$0 -username [username] --password [password] --host [host] --port [port] [database] [files]')
            .example('$0 db1 models/*.js', 'Create indexes for all models in models folder in database db1')
            .demand(2)
            .argv;

argv.database = argv._[0];
argv.files = argv._.slice(1);

mongooseIndexer(argv);
