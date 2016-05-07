# dfn

Dynamic Function Definition, using map pattern guard something.

[![Build Status](https://travis-ci.org/LoveKino/dfn.svg)](https://travis-ci.org/LoveKino/dfn.svg)
[![Coverage Status](https://coveralls.io/repos/github/LoveKino/dfn/badge.svg?branch=master)](https://coveralls.io/github/LoveKino/dfn?branch=master)

## install

`npm i dfn --save`

## example

```js
var dfn = require('dfn');
var defFun = dfn.defFun;
var special = dfn.special;
var guard = dfn.guard;

var fun = defFun();
special(fun, [1, 2], 5);
guard(fun, (x) => x < 0, (x) => -1 * x);

console.log(fun(1, 2)); // 5
console.log(fun(-3)); // 3
```

## create a function

```js
var dfn = require('dfn');
var defFun = dfn.defFun;
var fun = defFun();
```

## special case

You can set a special case for a function.

- `special(fun, args, ret)`

```js
var dfn = require('dfn');
var defFun = dfn.defFun;
var special = dfn.special;
var fun = defFun();

special(fun, [1, 2], 5);

console.log(fun(1, 2)); // 5
```

## guard

You can set a guard for function

- `guard(fun, condition, expression)`

When arguments satisfy condition (a function), function fun will get result from expression (a function).

```js
var dfn = require('dfn');
var defFun = dfn.defFun;
var guard = dfn.guard;

var fun = defFun();
guard(fun, (x) => x < 0, (x) => -1 * x);

console.log(fun(-3)); // 3
```

## default

You can set default expression for function.

When there is no special case or condition, default function will execute.

`def(fun, defFun)`

```js
var dfn = require('dfn');

var fun = defFun();
guard(fun, (x) => x < 0, (x) => -1 * x);
def(fun, (x) => x * x);

console.log(fun(3)); // 9
```
