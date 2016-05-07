'use strict';

let Dfn = require('./Dfn');
let process = require('./process');

/**
 *
 * case -> pattern -> guard
 */

let defFun = () => {
    let fun = function () {
        let args = Array.prototype.slice.call(arguments);
        return process(fun.dfn, args, this);
    };
    fun.dfn = new Dfn();
    return fun;
};

let special = (fun, args, res) => {
    preWrap(fun);
    return fun.dfn && fun.dfn.special(args, res);
};

let setEq = (fun, eq) => {
    preWrap(fun);
    return fun.dfn && fun.dfn.setEq(eq);
};

let guard = (fun, condition, expression) => {
    preWrap(fun);
    return fun.dfn && fun.dfn.guard(condition, expression);
};

let def = (fun, defFun) => {
    preWrap(fun);
    return fun.dfn && fun.dfn.def(defFun);
};

let preWrap = (fun) => {
    if (!isFunction(fun)) {
        throw new TypeError('Expect function for fun, but got ' + fun);
    }
};

let isFunction = v => typeof v === 'function';

module.exports = {
    defFun,
    special,
    setEq,
    guard,
    def
};
