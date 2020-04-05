const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
})

module.exports = model('Task', taskSchema)