

Node.js - readline-prompter
==========================

[![build status](https://secure.travis-ci.org/jprichardson/node-readline-prompter.png)](http://travis-ci.org/jprichardson/node-readline-prompter)

Easily prompt the user with a series of questions.



Why?
----

I wanted a package that I could easily specify an array of words and then have it ask a series of questions. Now you can be a bit more productive.



Installation
------------

    npm install readline-prompter



Node Versions
-------------

There is an error with the test on Node v0.6. Not sure what's causing it.


Example
------


```javascript
var rlp = require('readline-prompter');

var tokens = ['first name', 'last name', 'cats name'];
var def = {'first name': 'JP'};
var skip = {'cats name': 'petey'};


rlp(tokens, def, skip).end(function(results) {
    console.log(results);
});
```

The default for 'first name' is "JP" in this case. 'cats name' gets skipped. You would have to type in something for 'last name', it won't let you skip it.

Console:

    first name: (JP)
    last name:


Output:

```json
{
    "first name": "JP",
    "last name": "Richardson",
    "cats name": "petey"
}
```



Author
------

`node-readline-prompter` was written by [JP Richardson][aboutjp]. You should follow him on Twitter [@jprichardson][twitter]. Also read his coding blog [Procbits][procbits]. If you write software with others, you should checkout [Gitpilot][gitpilot] to make collaboration with Git simple.



License
-------

(MIT License)

Copyright 2012, JP Richardson  <jprichardson@gmail.com>


[aboutjp]: http://about.me/jprichardson
[twitter]: http://twitter.com/jprichardson
[procbits]: http://procbits.com
[gitpilot]: http://gitpilot.com

