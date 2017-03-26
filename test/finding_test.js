/* jshint esversion: 6 */

const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe tests
describe('Finding records', function(){

  let char;

  beforeEach(function(done){
    char = new MarioChar({
      name:'Mario'
    });

    char.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Find one record from the database', function(done){

    MarioChar.findOne({name:'Mario'}).then(function(result){
      assert(result.name === 'Mario');
      done();
    });

  });

  it('Find one record by ID from the database', function(done){

    MarioChar.findOne({_id:char._id}).then(function(result){
      assert(result._id.toString() === char._id.toString());
      done();
    });

  });

});
