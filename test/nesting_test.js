/* jshint esversion: 6 */

const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

// Describe tour tests
describe('Nesting records', function(){

  beforeEach(function(done){
    mongoose.connection.collections.authors.drop(function(){
      done();
    });
  });

  // Create tests
  it('Creates an author with sub-documents', function(done){

    let pat = new Author({
      name:'Patrick Rothfuss',
      books:[{title:'Name of the wind',pages:400}]
    });

    pat.save().then(function(){
      Author.findOne({name:'Patrick Rothfuss'}).then(function(record){
        assert(record.books.length === 1);
        done();
      });
    });

  });

  it('Add a book to an author',function(done){

    let pat = new Author({
      name:'Patrick Rothfuss',
      books:[{title:'Name of the wind',pages:400}]
    });

    pat.save().then(function(){
      Author.findOne({name:'Patrick Rothfuss'}).then(function(record){
        // Add a book to the books array
        record.books.push({title:"Wise Man's Fear",pages:500});
        record.save().then(function(){
          Author.findOne({name:'Patrick Rothfuss'}).then(function(result){
            assert(result.books.length === 2);
            done();
          });
        });
      });
    });

  });

});
