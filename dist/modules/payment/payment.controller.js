"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createPayment = void 0;
// payment.controller.js
const index_1 = __importDefault(require("../../db/index"));
const createPayment = async (req, res) => {
    try {
        const userId = req.id;
        const courseId = req.body.courseId;
        // 1. Check course
        const course = await index_1.default.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (!course.price || course.price === 0) {
            return res.status(400).json({ message: "Course is free" });
        }
        // 2. Check existing payment
        const existing = await index_1.default.payment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        if (existing && existing.status === "SUCCESS") {
            return res.status(400).json({
                message: "Already purchased",
            });
        }
        // 3. Create payment (PENDING)
        const payment = await index_1.default.payment.upsert({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
            update: {
                status: "PENDING",
            },
            create: {
                userId,
                courseId,
                amount: course.price,
                status: "PENDING",
            },
        });
        res.json({
            message: "Payment initiated",
            payment,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createPayment = createPayment;
const verifyPayment = async (req, res) => {
    try {
        const userId = req.id;
        const courseId = req.body.courseId;
        // 👉 In real world: verify signature from Razorpay/Stripe
        const payment = await index_1.default.payment.update({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
            data: {
                status: "SUCCESS",
            },
        });
        res.json({
            message: "Payment successful",
            payment,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.verifyPayment = verifyPayment;
