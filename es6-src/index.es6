//
// Enable require calls relative to this directory
//
process.env.NODE_PATH = '.';
require('module').Module._initPaths();

//
// Dependencies
//
var mod = require('app/lib/mod');

//
// Bootstrap Application
//
console.log('I\'m the index.');
mod.log();
