const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//importation de uniqueValidator
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	subcat: [
		{
			type: Schema.Types.ObjectId,
			ref: 'subCategoryModel',
		},
	],
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('categoryModel', categorySchema);
