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

			initialize : function() {
				this.listenTo(this.model, 'change', this.render);
			},

			/**
			 * Handles keyUp event
			 */
			onKeyUp : function() {
				this.resetList();
				this.searchInList();
			},

			/**
			 * After keyup we send the input value to model
			 */
			searchInList : function() {
				var inputElement = this.$(this.ui.autosuggestInput),
					searchText = inputElement.val();
				if (searchText !== '') {
					this.model.fetch({data : searchText});
				}
			},

			/**
			 * Runs after render. It appends the hit list to the main element.
			 */
			render : function() {
				var i = 0,
					wordList = this.model.attributes.wordList;
				if (wordList.length > 0) {
					this.$(this.ui.autosuggestBox).addClass('show');
					for (; i < wordList.length; i++) {
						this.$(this.ui.autosuggestBox).append('<p>' + wordList[i] + '</p>');
					}
				}
			},

			/**
			 * Reset the hit list
			 */
			resetList : function() {
				this.$(this.ui.autosuggestBox).html('');
				this.$(this.ui.autosuggestBox).removeClass('show');
			}
		}
	);

module.exports = AutosuggestView;
