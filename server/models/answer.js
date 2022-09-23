var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var answerSchema = new Schema(
    {
        text: {type: String},
        dateslash: {type: String},
        datedot: {type: String},
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        qid: {type: Schema.Types.ObjectId, ref: 'Question'},
    }
);

module.exports = mongoose.model('Answer', answerSchema);