const mongoose = require('mongoose');
const goalschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text:{
        type: String,
        required:true
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Goal',goalschema);