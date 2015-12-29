var request = require('request');
var chai = require('chai');
var expect = chai.expect;

describe('css response', function() {
  "use strict"

  var response, body;

  before(function(done) {
    request.get('http://localhost:5000/css/0/1/app.css', function(error, _response, _body) {
      response = _response;
      body = _body;
      done();
    });
  })

  it('should have status 200', function() {
    expect(response.statusCode).to.equal(200);
  });

  it('should be of content type css', function() {
    expect(response.headers['content-type']).to.include('text/css');
  });

  it('should have length of 1000 Bytes', function() {
    expect(response.headers['content-length']).to.equal('1000');
  });

  it('should contain css code', function() {
    expect(body).to.include('background-color');
  });
});
