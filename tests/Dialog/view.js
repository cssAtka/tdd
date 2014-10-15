var assert = require('chai').assert,
	sinon = require('sinon'),
	Backbone = require('backbone'),

	Dialog = require('../../libs/Dialog/view'),
	testContent = require('../Dialog/content/testcontent.html');

suite('testing dialog view', function() {
	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		Dialog.prototype.onDialogBtnClick = sinon.spy(Dialog.prototype, 'onDialogBtnClick');
		Dialog.prototype.onCloseBtnClick = sinon.spy(Dialog.prototype, 'onCloseBtnClick');
		Dialog.prototype.onOkBtnClick = sinon.spy(Dialog.prototype, 'onOkBtnClick');
		Dialog.prototype.onCancelBtnClick = sinon.spy(Dialog.prototype, 'onCancelBtnClick');
		this.dialog = new Dialog({el : '.dialog'});
		this.dialog.init();
	});

	teardown(function() {
		Dialog.prototype.onDialogBtnClick.restore();
		Dialog.prototype.onCloseBtnClick.restore();
		Dialog.prototype.onOkBtnClick.restore();
		Dialog.prototype.onCancelBtnClick.restore();
	});

	test('test dialog button click', function() {
		this.dialog.$(this.dialog.ui.dialogBtn).trigger('click');
		assert.isTrue(this.dialog.onDialogBtnClick.calledOnce);
	});

	test('test close button click', function() {
		this.dialog.$(this.dialog.ui.closeBtn).trigger('click');
		assert.strictEqual(this.dialog.$(this.dialog.ui.dialogBox).length, 0);
		assert.isTrue(this.dialog.onCloseBtnClick.calledOnce);
	});

	test('test OK button click', function() {
		this.dialog.$(this.dialog.ui.okBtn).trigger('click');
		/*
		var eventOk = false;
		this.dialog.onOkBtnClick.on('event_ok', function() {
			eventOk = true;
		});
		assert.strictEqual(eventOk, true);
		*/
		assert.strictEqual(this.dialog.$(this.dialog.ui.dialogBox).length, 0);
		assert.isTrue(this.dialog.onOkBtnClick.calledOnce);
	});

	test('test Cancel button click', function() {
		this.dialog.$(this.dialog.ui.cancelBtn).trigger('click');
		/*
		var eventCancel = false;
		this.dialog.onCancelBtnClick.on('event_cancel', function() {
			eventCancel = true;
		});
		assert.strictEqual(eventOk, true);
		*/
		assert.strictEqual(this.dialog.$(this.dialog.ui.dialogBox).length, 0);
		assert.isTrue(this.dialog.onCancelBtnClick.calledOnce);
	});
});