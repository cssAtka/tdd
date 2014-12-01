/**
 * @module views/Autosuggest
 */

var Backbone = require('backbone'),

	/**
	 * @class
	 * @extends external:Backbone.Marionette.View
	 */
	AutosuggestView = Backbone.Marionette.View.extend(
		/** @lends module:views/Autosuggest~Autosuggest.prototype */
		{

			ui : {
				autosuggestInput : '.input',
				autosuggestBox   : '.box'
			},

			events : {
				'keyup @ui.autosuggestInput' : 'onKeyUp'
			},

			/**
			 * @class ChatView
			 * @constructs
			 * @extends external:Backbone.Marionette.CompositeView
			 */
			initialize : function() {
				this.listenTo(this.model, 'change', this.render);
			},

			/**
			 * Handles message send button click
			 */
			onKeyUp : function() {
				this.resetList();
				this.searchInList();
			},

			searchInList : function() {
				var inputElement = this.$(this.ui.autosuggestInput),
					searchText = inputElement.val();
				if (searchText !== '') {
					this.model.fetch({data : searchText});
				}
			},

			render : function() {
				var i = 0,
					wordList = this.model.attributes.wordList;
				for (; i < wordList.length; i++) {
						this.$(this.ui.autosuggestBox).append('<p>' + wordList[i] + '</p>');
				}
			},

			resetList : function() {
				this.$(this.ui.autosuggestBox).html('');
			}
		}
	);

module.exports = AutosuggestView;