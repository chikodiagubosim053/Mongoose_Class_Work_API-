const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended', 'Deleted'],
        default: 'Inactive'
    },
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Posts"
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiresAt: {
        type: Date
    }

}, {
    timestamps: true
})

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel; 