"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallback = exports.googleAuth = void 0;
const catchAsync_js_1 = require("../../utils/catchAsync.js");
const google_js_1 = require("../../config/google.js");
const googleapis_1 = require("googleapis");
const index_js_1 = __importDefault(require("../../db/index.js"));
exports.googleAuth = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    // const organizationId = req.body.organizationId as string;
    const url = google_js_1.oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: google_js_1.SCOPES,
        prompt: "consent",
        // state: req.user?.organizationId,
        state: "eface8e7-f4e4-4076-be1d-56941cd6cade",
        // state: organizationId,
    });
    res.redirect(url);
});
exports.googleCallback = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const code = req.query.code;
    console.log({ code });
    const { tokens } = await google_js_1.oauth2Client.getToken(code);
    console.log({ tokens });
    google_js_1.oauth2Client.setCredentials(tokens);
    const oauth2 = googleapis_1.google.oauth2({
        auth: google_js_1.oauth2Client,
        version: "v2",
    });
    const userInfo = await oauth2.userinfo.get();
    console.log({ userInfo });
    const organizationId = req.query.state;
    await index_js_1.default.googleIntegration.upsert({
        where: {
            organizationId,
        },
        update: {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiryDate: new Date(tokens.expiry_date),
        },
        create: {
            organizationId,
            googleEmail: userInfo.data.email,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiryDate: new Date(tokens.expiry_date),
        },
    });
    res.status(200).json({
        success: true,
        data: "Google connected successfully",
    });
});
