'use strict';

let process = (dfn, args, ctx) => {
    // map
    if (dfn.map.has(args, dfn.eq)) {
        return dfn.map.get(args, dfn.eq);
    }
    // guards
    for (let i = 0; i < dfn.guards.length; i++) {
        let guard = dfn.guards[i];
        if (guard.condition(args)) {
            return guard.expression.apply(ctx, args);
        }
    }
    return dfn.defFun(args);
};

module.exports = process;
