/**
 * @module models/Autosuggest
 */

var Backbone = require('backbone'),

	/**
	 * @class
	 * @extends external:Backbone.Model
	 */
	AutosuggestModel = Backbone.Model.extend(
		/** @lends module:models/Message~Message.prototype */
		{
			/**
			 * @default
			 */
			default : {
				wordList : []
			},
			url     : '/autosuggest/getList'
		}
	);

module.exports = AutosuggestModel;
