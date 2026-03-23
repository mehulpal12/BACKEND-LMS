// payment.controller.js
import prisma from "../../db/index";
import { Request, Response } from "express";

export const createPayment = async (req:Request, res:Response) => {
  try {
    const userId = req.id as string;
    const courseId = req.body.courseId as string;

    // 1. Check course
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.price || course.price === 0) {
      return res.status(400).json({ message: "Course is free" });
    }

    // 2. Check existing payment
    const existing = await prisma.payment.findUnique({
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
    const payment = await prisma.payment.upsert({
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
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req:Request, res:Response) => {
  try {
    const userId = req.id as string;
    const courseId = req.body.courseId as string;

    // 👉 In real world: verify signature from Razorpay/Stripe

    const payment = await prisma.payment.update({
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
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};