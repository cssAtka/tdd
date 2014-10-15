var Backbone = require('backbone'),

	/**
	 * @name module: Dialog
	 * @constructor
	 * @extends Backbone.Marionette.View
	 */
	Dialog = Backbone.Marionette.View.extend (
		/** @lends module:Dialog.prototype **/
		{
			ui : {
				dialogContent : '.dialogContent',
				dialogBtn  : '.dialogBtn',
				dialogBox  : '.dialogBox',
				closeBtn   : '.close',
				okBtn      : '.ok',
				cancelBtn  : '.cancel',
				dialogBoxTpl: ''
			},

			events : {
				'click @ui.dialogBtn' : 'onDialogBtnClick',
				'click @ui.closeBtn'  : 'onCloseBtnClick',
				'click @ui.okBtn'     : 'onOkBtnClick',
				'click @ui.cancelBtn' : 'onCancelBtnClick'
			},

			init: function() {
				this.ui.dialogBoxTpl = this.$(this.ui.dialogContent).html();
			},

			/**
			 * Handles click on dialog button
			 */
			onDialogBtnClick : function(ev) {
				ev.preventDefault();
				this.$(this.ui.dialogContent).append(this.ui.dialogBoxTpl);
			},

			/**
			 * Handles click on close button
			 */
			onCloseBtnClick : function(ev) {
				ev.preventDefault();
				this.$(this.ui.dialogBox).remove();
			},

			/**
			 * Handles click on OK button
			 */
			onOkBtnClick : function(ev) {
				ev.preventDefault();
				this.trigger('event_ok');
				this.$(this.ui.dialogBox).remove();
			},

			/**
			 * Handles click on Cancel button
			 */
			onCancelBtnClick : function(ev) {
				ev.preventDefault();
				this.trigger('event_cancel');
				this.$(this.ui.dialogBox).remove();
			}
		}
	);

/**
 * @exports Dialog
 */
module.exports = Dialog;
