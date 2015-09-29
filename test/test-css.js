var request = require('superagent');
var chai    = require('chai');
var expect  = chai.expect;

describe('css file', function() {

	var response;

	before(function(done) {
		request.get('localhost:5000/css/0/0/app.css').end(function(err, res) {
			response = res;
			done();
		});
	});

	it('response is 200', function() {
		expect(response.status).to.equal(200);
	});

	it('response type', function() {
		expect(response.type).to.equal('text/css');
	});

	it('response body', function() {
		expect(response.text).include('background-color');
	});

});
