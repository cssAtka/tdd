var assert = require('chai').assert,
	sinon = require('sinon'),
	Backbone = require('backbone'),
	Chat = require('../../libs/Chat/view'),
	testContent = require('../Chat/content/testcontent.html');

suite('testing chat view', function() {
	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		Chat.prototype.onSendBtnClick = sinon.spy(Chat.prototype, 'onSendBtnClick');
		this.chat = new Chat({el : '.chat'});
		this.chatBox = this.chat.$(this.chat.ui.chatBox);
		this.inputEl = this.chat.$(this.chat.ui.inputText);
		this.messageEl = this.chat.$(this.chat.ui.messageEl);
	});

	teardown(function() {
		Chat.prototype.onSendBtnClick.restore();
	});

	test('test send button click', function() {
		var string = 'abc';
		this.inputEl.val(string);
		this.chat.$(this.chat.ui.sendBtn).trigger('click');
		assert.strictEqual(this.chatBox.text(), string);
		assert.isTrue(this.chat.onSendBtnClick.calledOnce);
	});

	test('test validator true', function() {
		this.chat.charLimit = 5;
		assert.isTrue(this.chat.validateInput('x'));
		assert.strictEqual(this.messageEl.hasClass('show'), false);
		assert.isTrue(this.chat.validateInput('xxxxx'));
		assert.strictEqual(this.messageEl.hasClass('show'), false);
	});

	test('test validator false', function() {
		this.chat.charLimit = 5;
		assert.isFalse(this.chat.validateInput(''));
		assert.strictEqual(this.messageEl.hasClass('show'), true);
		assert.isFalse(this.chat.validateInput('xxxxxx'));
		assert.strictEqual(this.messageEl.hasClass('show'), true);
	});

	test('Full test with an invalid text and with 2 valid text', function() {
		var string = '';
		this.inputEl.val(string);
		this.chat.$(this.chat.ui.sendBtn).trigger('click');
		assert.strictEqual(this.chatBox.text(), '');
		assert.strictEqual(this.messageEl.hasClass('show'), true);
		assert.isTrue(this.chat.onSendBtnClick.calledOnce);

		var string1 = 'abc';
		this.inputEl.val(string1);
		this.chat.$(this.chat.ui.sendBtn).trigger('click');
		assert.strictEqual(this.chatBox.text(), string1);
		assert.strictEqual(this.messageEl.hasClass('show'), false);
		assert.isTrue(this.chat.onSendBtnClick.calledTwice);

		var string2 = 'defghi';
		this.inputEl.val(string2);
		this.chat.$(this.chat.ui.sendBtn).trigger('click');
		assert.strictEqual(this.chatBox.text(), string1 + string2);
		assert.strictEqual(this.messageEl.hasClass('show'), false);

		// this.chat.resetChat();
	});
});
