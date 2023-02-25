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
exports.LoginUser = exports.RegisterUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_enum_1 = require("../constants/role.enum");
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const found = yield user_model_1.default.findOne({ email });
        if (found) {
            return res.status(400).json({ msg: 'User already exists.' });
        }
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = new user_model_1.default({
            email,
            password: hashedPassword,
            roles: role_enum_1.Role.USER,
        });
        user.save();
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const found = yield user_model_1.default.findOne({ email });
        if (!found) {
            return res.status(400).json({ msg: 'No user found!!' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, found.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials!!' });
        }
        const token = jsonwebtoken_1.default.sign({ id: found._id, roles: found.roles }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.LoginUser = LoginUser;
