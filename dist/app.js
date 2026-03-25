"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_route_js_1 = __importDefault(require("./modules/auth/auth.route.js"));
const course_route_js_1 = __importDefault(require("./modules/course/course.route.js"));
const lecture_route_js_1 = __importDefault(require("./modules/lecture/lecture.route.js"));
const progress_route_js_1 = __importDefault(require("./modules/progress/progress.route.js"));
const enrollment_routes_js_1 = __importDefault(require("./modules/enrollment/enrollment.routes.js"));
const payment_route_js_1 = __importDefault(require("./modules/payment/payment.route.js"));
const google_route_js_1 = __importDefault(require("./modules/google/google.route.js"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// health-check
app.get("/health-check", (req, res) => {
    return res.status(200).json({
        success: true,
        messsage: "health is fine",
    });
});
app.use("/api/auth", auth_route_js_1.default);
app.use("/api/course", course_route_js_1.default);
app.use("/api/lecture", lecture_route_js_1.default);
app.use("/api/progress", progress_route_js_1.default);
app.use("/api/enrollment", enrollment_routes_js_1.default);
app.use("/api/payment", payment_route_js_1.default);
app.use("/api/google", google_route_js_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
