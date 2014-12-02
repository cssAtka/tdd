var assert = require('chai').assert,
	fauxServer = require('backbone-faux-server'),
	AutosuggestModel = require('../../libs/Autosuggest/model.js');

suite('Test autosuggest model', function() {
	var testData =
		{
			a  : ['audi', 'ferrari', 'mazda 5', 'mazda 6'],
			ma : ['mazda 5', 'mazda 6'],
			b  : ['bmw'],
			x  : [],
			mb : []
		}
	;

	setup(function() {
		this.model = new AutosuggestModel();
		fauxServer.addRoute('fetch list', this.model.url, 'GET', function(context) {
			var response = {wordList: testData[context.data]};
			return response;
		});
	});

	test('Test autosuggest model - response after ajax request', function() {
		var searchText;
		for (searchText in testData) {
			if (testData.hasOwnProperty(searchText)) {
				this.model.fetch({
					data: searchText,
					success: function(response) {
						assert.deepEqual(response.attributes.wordList, testData[searchText]);
					}
				});
			}
		}
	});
});
