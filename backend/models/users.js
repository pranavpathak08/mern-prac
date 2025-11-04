const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be atleast 2 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "Password must be atleast 6 characters long"],
        select: false, //This means we need to use .select() when we query the model
        
    }
}, { timeStamps: true })

/* We will use pre('save') method. It is a middleware hook that allows you to execute
specific code before the document is saved to the mongoDB. Useful for implementing logic
such as data validation, hashing passwords, generating unique IDs */

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;
