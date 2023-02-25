"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_enum_1 = require("../constants/role.enum");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    roles: [
        {
            type: String,
            enum: role_enum_1.Role,
            default: role_enum_1.Role.USER,
        },
    ],
    profileId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Profile',
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
