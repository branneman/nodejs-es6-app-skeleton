var assert = require('chai').assert;

var mod = require('../../../lib/mod');

describe('Mod', function() {
    it('should export `log`', function() {
        assert.property(mod, 'log');
    });
});