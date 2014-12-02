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

	var testData = ['a', 'ma', 'b', 'x', 'mb'],

		testResponse =
		{
			a  : ['audi', 'ferrari', 'mazda 5', 'mazda 6'],
			ma : ['mazda 5', 'mazda 6'],
			b  : ['bmw'],
			x  : [],
			mb : []
		}
	;

	teardown(function() {
		AutosuggestView.prototype.onKeyUp.restore();
	});

	withData(testData).test('Test autosuggest view with testData', function(data) {
		this.autosuggestInput.val(data);
		this.autosuggestInput.keyup();
		var suggestions = this.autosuggestBox.find('p'),
			suggestionsArray = [],
			i = 0;

		if (suggestions.length > 0) {
			assert.isTrue(this.autosuggestBox.hasClass('show'));
		}
		else {
			assert.isFalse(this.autosuggestBox.hasClass('show'));
		}
		assert.lengthOf(suggestions, testResponse[data].length);
		for (; i<suggestions.length; i++) {
			suggestionsArray[i] = suggestions[i].innerHTML;
		}
		assert.deepEqual(suggestionsArray, testResponse[data]);
	});
});
