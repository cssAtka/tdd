var Backbone = require('backbone'),
	/**
	 * @name module: Dialog
	 * @constructor
	 * @extends Backbone.Marionette.View
	 */
	Chat = Backbone.Marionette.View.extend (
		/** @lends module:Dialog.prototype **/
		{
			ui : {
				chatBox   : '.chatBox',
				inputText : '.inputText',
				sendBtn   : '.sendBtn',
				messageEl : '.message'
			},

			charLimit : 40,

			events : {
				'click @ui.sendBtn' : 'onSendBtnClick'
			},

			/**
			 * Reset chat elements (for html test only)
			 */
			resetChat: function() {
				this.$(this.ui.chatBox).html('');
				this.$(this.ui.inputText).val('');
				this.$(this.ui.messageEl).removeClass('show');
			},

			/**
			 * Handles click on send button
			 * @param {Object} ev
			 */
			onSendBtnClick : function(ev) {
				ev.preventDefault();
				var inputEl      = this.$(this.ui.inputText),
					inputText    = inputEl.val();
				if (this.validateInput(inputText)) {
					var inputContent = '<p>' + inputText + '</p>'
					this.$(this.ui.chatBox).append(inputContent);
					inputEl.val('');
				}
			},

			/**
			 * Validate input field
			 * @param {String} inputText - text input content
			 */
			validateInput: function(inputText) {
				if (inputText.length > 0 && inputText.length <= this.charLimit) {
					this.$(this.ui.messageEl).removeClass('show');
					return true;
				}
				else {
					this.$(this.ui.messageEl).addClass('show');
					return false;
				}
			}
		}
	);

/**
 * @exports Dialog
 */
module.exports = Chat;
