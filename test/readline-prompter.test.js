var testutil = require('testutil')
  , P = require('autoresolve')
  , suppose = require('suppose')
  , path = require('path-extra')
  , fs = require('fs')

TEST_DIR = path.join(path.tempdir(), 'test-readline-prompter')

describe('readline-prompter', function() {

  it('should prompt the user', function(done){
    if (!fs.existsSync(TEST_DIR))
      fs.mkdirSync(TEST_DIR);

    var file = path.join(TEST_DIR, 'results.json');

    suppose('node', [P('test/resources/testscript1.js'), file])
    .on('first name: (JP) ').respond('Jon Paul\n')
    .on('last name: ').respond('Richardson\n')
    .end(function(code) {
      fs.readFile(file, 'utf8', function(err, data) {
        var obj = JSON.parse(data)

        EQ (obj['first name'], 'Jon Paul')
        EQ (obj['last name'], 'Richardson')
        EQ (obj['cats name'], 'petey')

        done()
      })
    })
  })
})