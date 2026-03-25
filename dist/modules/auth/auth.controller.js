"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const catchAsync_js_1 = require("../../utils/catchAsync.js");
const auth_schema_js_1 = require("./auth.schema.js");
const auth_service_js_1 = require("./auth.service.js");
exports.register = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const data = auth_schema_js_1.registerUserSchema.parse(req.body);
    const result = await (0, auth_service_js_1.registerUser)(data.name, data.email, data.password);
    return res.status(201).json({
        success: true,
        data: result,
    });
});
exports.login = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const data = auth_schema_js_1.loginUserSchema.parse(req.body);
    const result = await (0, auth_service_js_1.loginUser)(data.email, data.password);
    return res.status(200).json({
        success: true,
        data: result,
    });
});
exports.getMe = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const userId = req.id;
    const result = await (0, auth_service_js_1.getUserById)(userId);
    return res.status(200).json({
        success: true,
        data: result,
    });
});
