const mongoose = require('mongoose')
const Schema = mongoose.Schema

//importation de uniqueValidator
const uniqueValidator = require('mongoose-unique-validator');

const subCategorySchema = Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
    },
    cat_id:{
        type: Schema.Types.ObjectId,
        ref: 'categoryModel'
    },
    annonce: [
		{
			type: Schema.Types.ObjectId,
			ref: 'annonceModel',
		},
	],
})

subCategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('subCategoryModel',subCategorySchema)