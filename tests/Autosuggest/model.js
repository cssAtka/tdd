var assert = require('chai').assert,
	fauxServer = require('backbone-faux-server'),

	AutosuggestModel = require('../../libs/Autosuggest/model.js');

suite('Test autosuggest model', function() {
		var testData =
			{
				a  : ['alfa', 'mazda 5', 'mazda 6'],
				ma : ['mazda 5', 'mazda 6'],
				b  : ['bmw'],
				x  : []
			}
		;

	setup(function() {
		this.model = new AutosuggestModel();
		fauxServer.addRoute('fetch list', this.model.url, 'GET', function(context) {
			var response = {wordList: testData[context]};
			return response;
		});
	});

	teardown(function() {
	});

	test('Test valid items after ajax request', function() {
		this.model.fetch({
			data : testData.a,
			success: function(response) {
				assert.deepEqual(response.attributes, testData.a);
			}
		});
	});
});
