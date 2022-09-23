var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionsSchema = new Schema(
    {
        type: {type: String},
        text: {type: String},
        answer: {type: String},
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        choices: {type: Array},
    }
);

module.exports = mongoose.model('Question', questionsSchema);