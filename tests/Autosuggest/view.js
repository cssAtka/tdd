var assert = require('chai').assert,
	sinon = require('sinon'),
	withData = require('mocha-testdata'),
	testUtils = require('../setup_utils'),
	testContent = require('./content/testcontent.html'),

	AutosuggestView = require('../../libs/Autosuggest/view'),
	AutosuggestModel = require('../../libs/Autosuggest/model');

suite('testing autosuggest view', function() {
	setup(function() {
		testUtils.loadTestContent(testContent);
		AutosuggestView.prototype.onKeyUp = sinon.spy(AutosuggestView.prototype, 'onKeyUp');
		this.model = new AutosuggestModel();
		this.autosuggestView = new AutosuggestView({el : '.autosuggest', model : this.model});
		this.autosuggestInput = this.autosuggestView.$(this.autosuggestView.ui.autosuggestInput);
		this.autosuggestBox = this.autosuggestView.$(this.autosuggestView.ui.autosuggestBox);
	});

	var testData = ['a', 'ma', 'b', 'x'];

	var testResponse =
		{
			a: ['alfa', 'mazda 5', 'mazda 6'],
			ma: ['mazda 5', 'mazda 6'],
			b: ['bmw'],
			x: []
		}
	;

	teardown(function() {
		AutosuggestView.prototype.onKeyUp.restore();
	});

	withData(testData).test('Test the view', function(data) {

		this.autosuggestInput.val(data);
		this.autosuggestInput.keyup();

		var suggestions = this.autosuggestBox.find('p');
		assert.lengthOf(suggestions, testResponse[data].length);
/*
var x = $('.box').find('p');
var arr = [];
for(i=0;i<x.length;i++){

arr[i] = x[i].innerHTML
}
*/
		//assert.deepEqual(suggestions.text(), testResponse[data]);
	});
});
