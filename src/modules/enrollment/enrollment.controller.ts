import prisma from "../../db/index";
import { Request, Response } from "express";

export const enrollCourse = async (req:Request, res:Response) => {
  try {
    const userId = req.id as string;
    const courseId = req.params.courseId as string;

    // ✅ 1. Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // // ✅ 2. Prevent instructor enrolling
    // if (course.instructorId === userId) {
    //   return res.status(400).json({
    //     message: "Instructor cannot enroll in own course",
    //   });
    // }

    // ✅ 3. If course is paid → check payment
    if (course.price && course.price > 0) {
      const payment = await prisma.payment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (!payment || payment.status !== "SUCCESS") {
        return res.status(403).json({
          message: "Payment required before enrollment",
        });
      }
    }

    // ✅ 4. Create enrollment (safe with upsert)
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      update: {},
      create: {
        userId,
        courseId,
      },
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

































// // /modules/enrollment/enrollment.controller.js
// import prisma from "../../db/index";
// import { Request, Response } from "express";


// export const enrollCourse = async (req:Request, res:Response) => {
//   try {
//     const userId = req.id as string;
//     const courseId = req.params.courseId as string;

//     // ✅ 1. Check if course exists
//     const course = await prisma.course.findUnique({
//       where: { id: courseId },
//     });

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // ✅ 2. Check if already enrolled
//     const existing = await prisma.enrollment.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId,
//         },
//       },
//     });

//     if (existing) {
//       return res.status(400).json({ message: "Already enrolled" });
//     }

//     // ✅ 3. Create enrollment
//     const enrollment = await prisma.enrollment.create({
//       data: {
//         userId,
//         courseId,
//       },
//     });

//     res.status(201).json({
//       message: "Enrolled successfully",
//       enrollment,
//     });
//   } catch (error:any) {
//     res.status(500).json({ error: error.message });
//   }
// };