const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true, //removes leading and trailing whitespaces before saving it to the database
        minlength: [3, 'Title must be atleast 3 characters long'],
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
    },
}, { timeStamps: true }); //This adds createdAt and updatedAt automatically

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;