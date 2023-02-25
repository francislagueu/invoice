"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProfile = exports.UpdateProfile = exports.CreateProfile = exports.GetProfile = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const profile_model_1 = __importDefault(require("../models/profile.model"));
const GetProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(403).send({ message: 'Access denied!!' });
        }
        const profile = yield profile_model_1.default.findOne({ userId: user.id });
        return res.status(200).json({ profile });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.GetProfile = GetProfile;
const CreateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(403).send({ message: 'Access denied!!' });
        }
        const found = yield profile_model_1.default.findOne({ userId: user.id });
        if (found) {
            return res.status(500).send({ message: 'User profile already exist' });
        }
        const { firstName, lastName, dob, phone, profileImg, bio } = req.body;
        const profile = new profile_model_1.default({
            firstName,
            lastName,
            bio,
            dob,
            phone,
            profileImg,
            userId: user.id,
        });
        yield profile.save();
        yield user_model_1.default.findByIdAndUpdate(user.id, { profileId: profile._id });
        return res.status(201).json({ profile });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.CreateProfile = CreateProfile;
const UpdateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(403).send({ message: 'Access denied!!' });
        }
        const { id } = req.params;
        yield profile_model_1.default.findByIdAndUpdate(id, req.body);
        const profile = yield profile_model_1.default.findById(id);
        return res.status(200).json({ profile });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.UpdateProfile = UpdateProfile;
const DeleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(403).send({ message: 'Access denied!!' });
        }
        const { id } = req.params;
        yield profile_model_1.default.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Profile successfully deleted!!' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.DeleteProfile = DeleteProfile;
