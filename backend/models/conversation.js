const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    members:[]
},{
    timestamps:true
})
module.exports = mongoose.model('conversationSchema', conversationSchema)
