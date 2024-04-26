const mongoose = require('mongoose');



const todoListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: Date },
    category: { type: String }  

})

const todoList = mongoose.model('task', todoListSchema);

module.exports = todoList;