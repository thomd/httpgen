var request = require('supertest');
var app = require('../app.js')
var chai = require('chai');
chai.use(require('chai-match'));
var expect = chai.expect;

describe('javascript response', function() {
  var response;

  before(function(done) {
    request(app).get('/javascript/1/0/3/script.js').end(function(err, res, body) {
      response = res;
      done();
    });
  })

  it('should have status 200', function() {
    expect(response.statusCode).to.equal(200);
  });

  it('should be of content type javascript', function() {
    expect(response.headers['content-type']).to.include('application/javascript; charset=utf-8');
  });

  it('should have length of 219 Bytes', function() {
    expect(response.headers['x-content-size']).to.equal('219 kb');
    expect(response.headers['content-length']).to.equal('219');
  });

  it('should have a response time of at least 1 sec', function() {
    expect(response.headers['x-content-delay']).to.equal('1');
    expect(response.headers['x-response-time']).to.match(/\d{4} ms/);
    var responseTime = parseInt(response.headers['x-response-time'].match(/(\d+) ms/)[1], 10)
    expect(responseTime).to.be.above(999)
  });

  it('should contain javascript code', function() {
    expect(response.text).to.equal('console.time("start execution of script.js");var result = 0;var now = new Date().getTime();while(new Date().getTime() < now + (3)){result += Math.random() * Math.random()};console.timeEnd("stop execution of script.js");');
  });
});
