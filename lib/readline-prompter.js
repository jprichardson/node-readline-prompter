var readline = require('readline')
  , batch = require('batchflow')
  , util = require('util');


function ReadlinePrompter(tokens, defaultTokens, skipTokens) {
  this._tokens = tokens || [];
  this._defaultTokens = defaultTokens || {};
  this._skipTokens = skipTokens || {};

  this._io = {input: process.stdin, output: process.stdout};
}

ReadlinePrompter.prototype.io = function(input, output) {
  this._io.input = input;
  this._io.output = output;
};

ReadlinePrompter.prototype.input = function(input) {
  this._io.input = input;
};

ReadlinePrompter.prototype.output = function(output) {
  this._io.output = output;
};

ReadlinePrompter.prototype.end = function(endCallback) {
  var self = this, rl = readline.createInterface(this._io);
  var results = {};

  batch(this._tokens).sequential().each(function(i, token, next) {
    if (self._skipTokens[token]) {
      results[token] = self._skipTokens[token];
      return next()
    }

    var defaultResponse = self._defaultTokens[token]

    function ask() {
      if (defaultResponse)
        rl.question(util.format("%s: (%s) ", token, defaultResponse), answerToQ)
      else
        rl.question(token + ': ', answerToQ)
    }

    function answerToQ(answer) {
      answer = answer.trim()
      if (answer === '')
        if (defaultResponse) {
          results[token] = defaultResponse
          return next()
        } else
          return ask()
      else { //we have an answer, let's go to the next
        results[token] = answer
        next()
      }
    }

    ask()    
  }).end(function() {
    rl.close();
    endCallback(results);
  })
}

module.exports = function rlp(tokens, defaultTokens, skipTokens) {
  return new ReadlinePrompter(tokens, defaultTokens, skipTokens);
}







