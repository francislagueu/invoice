"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        max: 50,
        required: true,
    },
    lastName: {
        type: String,
        max: 50,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileImg: {
        type: String,
    },
}, { timestamps: true });
const Profile = (0, mongoose_1.model)('Profile', ProfileSchema);
exports.default = Profile;
