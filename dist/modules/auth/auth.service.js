"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.loginUser = exports.registerUser = void 0;
const index_js_1 = __importDefault(require("../../db/index.js"));
const apiError_js_1 = require("../../utils/apiError.js");
const hash_js_1 = require("../../utils/hash.js");
const jwt_js_1 = require("../../utils/jwt.js");
const registerUser = async (name, email, password) => {
    const existingUser = await index_js_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new apiError_js_1.ApiError(400, "User already exists");
    }
    const hashedPassword = await (0, hash_js_1.hashPassword)(password);
    const user = await index_js_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    const token = (0, jwt_js_1.generateToken)(user.id);
    await index_js_1.default.user.update({
        where: { id: user.id },
        data: { refreshToken: token },
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            refreshToken: token,
        },
    };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await index_js_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new apiError_js_1.ApiError(401, "Invalid credentials");
    }
    const isPasswordCorrect = await (0, hash_js_1.comparePassword)(password, user.password);
    if (!isPasswordCorrect) {
        throw new apiError_js_1.ApiError(401, "Invalid credentials");
    }
    const token = (0, jwt_js_1.generateToken)(user.id);
    await index_js_1.default.user.update({
        where: { id: user.id },
        data: { refreshToken: token },
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            refreshToken: token,
        },
    };
};
exports.loginUser = loginUser;
const getUserById = async (userId) => {
    const user = await index_js_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });
    return {
        user,
    };
};
exports.getUserById = getUserById;
