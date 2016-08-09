#!/usr/bin/env node
var lingua = require('./'),
    args = process.argv.slice(2);

if (args.length >= 2) {
    var fs = require('fs');

    lingua(args[0], buffer => {
        fs.writeFile(args[1], buffer);
    });
} else if (args.length === 1) {
    lingua(args[0], buffer => {
        process.stdout.write(buffer);
    });
} else {
    throw new Error('Please provide at least a language bundle');
}