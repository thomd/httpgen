var request = require('supertest');
var app = require('../app.js')
var chai = require('chai');
chai.use(require('chai-match'));
var expect = chai.expect;

describe('css response', function() {
  var response;

  before(function(done) {
    request(app).get('/css/1/1/app.css').end(function(err, res, body) {
      response = res;
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
    expect(response.headers['x-content-size']).to.equal('1000 kb');
    expect(response.headers['content-length']).to.equal('1000');
  });

  it('should contain css code', function() {
    expect(response.text).to.match(/^body { background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\); }/);
  });

  it('should have a response time of at least 1 sec', function() {
    expect(response.headers['x-content-delay']).to.equal('1');
    expect(response.headers['x-response-time']).to.match(/\d{4} ms/);
    var responseTime = parseInt(response.headers['x-response-time'].match(/(\d+) ms/)[1], 10)
    expect(responseTime).to.be.above(1000)
  });
});
