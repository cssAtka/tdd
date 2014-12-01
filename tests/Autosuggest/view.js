var assert = require('chai').assert,
	sinon = require('sinon'),
	testUtils = require('../setup_utils'),
	testContent = require('./content/testcontent.html'),

	AutosuggestView = require('../../libs/Autosuggest/view'),
	AutosuggestModel = require('../../libs/Autosuggest/model');

suite('testing autosuggest view', function() {
	setup(function() {
		testUtils.loadTestContent(testContent);

		this.model = new AutosuggestModel();
		this.autosuggestView = new AutosuggestView({el : '.autosuggest', model : this.model});

		this.autosuggestView.prototype.onKeyUp = sinon.spy(AutosuggestView.prototype, 'onKeyUp');

		this.autosuggestInput = this.autosuggestView.el.find(this.autosuggestView.ui.autosuggestInput);
		this.autosuggestBox = this.autosuggestView.el.find(this.autosuggestView.ui.autosuggestBox);
	});

	teardown(function() {

	});

	test('Test keyup event', function() {
		this.autosuggestInput.keyup();
		assert.isTrue(this.autosuggestView.onKeyUp.calledOnce);
	});

	/*
	withData(validMessages).test('send button insert new message', function(testMessage) {
		this.chatInput.val(testMessage);
		this.sendButton.click();

		var messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 1);
		assert.strictEqual(messages.text(), testMessage);
	});

	withData(invalidMessages).test('send button not insert invalid message', function(testMessage) {
		this.chatInput.val(testMessage);
		this.sendButton.click();

		var messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 0);
	});

	test('more than one message', function() {
		//insert a valid message
		this.chatInput.val(validMessages[0]);
		this.sendButton.click();

		var messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 1);
		assert.strictEqual(messages.text(), validMessages[0]);

		//insert invalid message
		this.chatInput.val(invalidMessages[0]);
		this.sendButton.click();

		messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 1);

		//insert a valid message again
		this.chatInput.val(validMessages[1]);
		this.sendButton.click();

		messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 2);
		assert.strictEqual(messages.eq(0).text(), validMessages[0]);
		assert.strictEqual(messages.eq(1).text(), validMessages[1]);
	});
	*/
});
