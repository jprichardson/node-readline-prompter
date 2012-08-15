var P = require('autoresolve')
  , rlp = require(P('lib/readline-prompter'))
  , fs = require('fs');

var tokens = ['first name', 'last name', 'cats name'];
var def = {'first name': 'JP'};
var skip = {'cats name': 'petey'};

var file = process.argv[2];

rlp(tokens, def, skip).end(function(results) {
    if (file) {
        fs.writeFile(file, JSON.stringify(results, null, 4), function(err) {
            if (err) console.error(err);
        });
    } else {
        console.log(results);
    }
});