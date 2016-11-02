var mongoose = require('mongoose');

var plm = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username empty'
    },
    password: {
        type: String
    }
});

//connect this model to mongoose passport
accountSchema.plugin(plm);

module.exports = mongoose.model('Account', accountSchema);