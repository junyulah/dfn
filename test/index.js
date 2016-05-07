'use strict';

let dfn = require('../index');
let assert = require('assert');
let jsoneq = require('cl-jsoneq');

let defFun = dfn.defFun;
let special = dfn.special;
let guard = dfn.guard;
let def = dfn.def;
let setEq = dfn.setEq;

describe('dfn', () => {
    it('special', () => {
        let fun = defFun();
        special(fun, null, 20);
        special(fun, [1, 2], 5);
        special(fun, ['a', 'b'], 30);

        assert.equal(fun(), 20);
        assert.equal(fun(1, 2), 5);
        assert.equal(fun('a', 'b'), 30);
    });

    it('guard', () => {
        let fun = defFun();
        guard(fun, (x) => x > 0, (x) => x);
        guard(fun, (x) => x < 0, (x) => -1 * x);

        assert.equal(fun(2), 2);
        assert.equal(fun(-2), 2);
    });

    it('guard special priority', () => {
        let fun = defFun();
        special(fun, [5], 10);
        guard(fun, (x) => x > 0, (x) => x);
        guard(fun, (x) => x < 0, (x) => -1 * x);

        assert.equal(fun(5), 10);
    });

    it('default', (done) => {
        let fun = defFun();
        special(fun, [5], 10);

        try {
            fun(10);
        } catch (err) {
            if (err.toString().indexOf('function arguments') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });

    it('default2', () => {
        let fun = defFun();
        special(fun, [5], 10);
        def(fun, () => {});
        fun(10);
    });

    it('set eq', () => {
        let fun = defFun();
        setEq(fun, jsoneq);

        special(fun, [{a: 10}], 10);

        fun({a: 10});
    });

    it('error special args', (done) => {
        let fun = defFun();
        try {
            special(fun, 1, 10);
        } catch (err) {
            if(err.toString().indexOf('Expect array') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });

    it('error setEq args', (done) => {
        let fun = defFun();
        try {
            setEq(fun, 1);
        } catch (err) {
            if(err.toString().indexOf('Expect eq') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });

    it('error guard args', (done) => {
        let fun = defFun();
        try {
            guard(fun, 1);
        } catch (err) {
            if(err.toString().indexOf('Expect condition') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });

    it('error guard args2', (done) => {
        let fun = defFun();
        try {
            guard(fun, () => true, 1);
        } catch (err) {
            if(err.toString().indexOf('Expect expression') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });

    it('error def', (done) => {
        let fun = defFun();
        try {
            def(fun, 1);
        } catch (err) {
            if(err.toString().indexOf('Expect defFun') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });

    it('error preWrap', (done) => {
        try {
            def(0, () => 30);
        } catch (err) {
            if(err.toString().indexOf('Expect function') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });
});
