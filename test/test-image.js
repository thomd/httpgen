var request = require('supertest');
var app = require('../app.js')
var chai = require('chai');
chai.use(require('chai-match'));
var expect = chai.expect;

describe('image response', function() {
  var response;

  before(function(done) {
    request(app).get('/image/1/10/10/ff0000.png').end(function(err, res, body) {
      response = res;
      done();
    });
  })

  it('should have status 200', function() {
    expect(response.statusCode).to.equal(200);
  });

  it('should be of content type image/png', function() {
    expect(response.headers['content-type']).to.include('image/png');
  });

  it('should have length of 77 Bytes', function() {
    expect(response.headers['x-content-size']).to.equal('77 kb');
    expect(response.headers['content-length']).to.equal('77');
  });

  it('should have a response time of at least 1 sec', function() {
    expect(response.headers['x-content-delay']).to.equal('1');
    expect(response.headers['x-response-time']).to.match(/\d{4} ms/);
    var responseTime = parseInt(response.headers['x-response-time'].match(/(\d+) ms/)[1], 10)
    expect(responseTime).to.be.above(999)
  });

  it('should contain a PNG binary', function() {
    expect(response.body.toString('ascii')).to.equal('\tPNG\r\n\u001a\n\u0000\u0000\u0000\rIHDR\u0000\u0000\u0000\n\u0000\u0000\u0000\n\b\u0006\u0000\u0000\u0000\r2O=\u0000\u0000\u0000\u0014IDATx\u001ccxO@p\u001f\u0018L0*\u0010>\n\u0001\u0012CG9+:|1\u0000\u0000\u0000\u0000IEND.B`\u0002');
  });
});
