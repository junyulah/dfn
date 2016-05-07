'use strict';

let keysmap = require('keysmap');

let def = (args) => {
    throw new TypeError('function arguments were not accepted. args are ' + args);
};

let Dfn = function () {
    this.map = keysmap();
    this.guards = [];
    this.defFun = def;
};

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

Dfn.prototype = {
    constructor: Dfn,
    special: function (args, res) {
        args = args || [];
        if(!isArray(args)) {
            throw new TypeError('Expect array for args, but got ' + args);
        }
        this.map.set(args, res, this.eq);
    },
    setEq: function (eq) {
        if(typeof eq !== 'function') {
            throw new TypeError('Expect eq as function, but got ' + eq);
        }
        this.eq = eq;
    },
    guard: function (condition, expression) {
        if(typeof condition !== 'function') {
            throw new TypeError('Expect condition as function, but got ' + condition);
        }
        if(typeof expression !== 'function') {
            throw new TypeError('Expect expression as function, but got ' + expression);
        }

        this.guards.push({
            condition,
            expression
        });
    },
    def: function (defFun) {
        if(typeof defFun !== 'function') {
            throw new TypeError('Expect defFun as function, but got ' + defFun);
        }
        this.defFun = defFun;
    }
};

module.exports = Dfn;
