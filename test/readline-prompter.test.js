var testutil = require('testutil')
  , P = require('autoresolve')
  , suppose = require('suppose')
  , fs = require('fs-extra')
  , path = require('path')

var TEST_DIR = ''

describe('readline-prompter', function() {
  beforeEach(function() {
    TEST_DIR = testutil.createTestDir('readline-prompter')
  })

  it('should prompt the user', function(done){
    var file = path.join(TEST_DIR, 'results.json');

    suppose('node', [P('test/resources/testscript1.js'), file])
    .on('first name: (JP) ').respond('Jon Paul\n')
    .on('last name: ').respond('Richardson\n')
    .error(function(err) {
      done(err)
    })
    .end(function(code) {
      var obj = fs.readJSONFileSync(file)
      
      EQ (obj['first name'], 'Jon Paul')
      EQ (obj['last name'], 'Richardson')
      EQ (obj['cats name'], 'petey')
      
      done()
    })
  })
})