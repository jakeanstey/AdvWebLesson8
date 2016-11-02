/**
 * Created by JakeAnstey on 2016-10-05.
 */
//link to mongoose
var mongoose = require('mongoose');

//create a team schema
var teamSchema = new mongoose.Schema({
    city: {
       type: String,
       required: 'City cannot be blank'
    },
    nickname: {
        type: String,
        required: 'Nickname cannot be blank'
    },
    wins: {
        type: Number,
        min: 0
    },
    losses: {
        type: Number,
        min: 0
    }
});

//make the schema public as defined above
//note the public class name starts with capital and is singular
module.exports = mongoose.model('Team', teamSchema);