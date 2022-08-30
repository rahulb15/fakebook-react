import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    confirmPassword: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "offline",
    },
    token: {
        type: String,
    },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;