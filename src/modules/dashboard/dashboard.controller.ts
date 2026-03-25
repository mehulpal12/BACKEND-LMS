import prisma from "../../db/index";
import { Request, Response } from "express";

export const getDashboard = async (req: Request, res: Response) => {
    try {
        const userId = req.id as string;

        const enrollments = await prisma.enrollment.findMany({
            where: { userId },
            include: {
                course: {
                    include: {
                        _count: {
                            select: { lessons: true } // Gets total lessons in the course
                        }
                    }
                }
            },
        });

        const completedProgress = await prisma.progress.findMany({
            where: { userId },
        });

        // Map through enrollments to calculate percentage for EACH course
        const dashboardWithPercentage = enrollments.map((enrollment) => {
            const totalLessons = enrollment.course._count.lessons;
            
            // Filter progress to find lessons belonging to THIS specific course
            // (Assuming your Progress model has a courseId field)
            const completedInThisCourse = completedProgress.filter(
                (p) => p.userId === enrollment.userId
            ).length;

            const percentage = totalLessons > 0 
                ? Math.round((completedInThisCourse / totalLessons) * 100) 
                : 0;

            return {
                ...enrollment,
                completedLessons: completedInThisCourse,
                totalLessons: totalLessons,
                progressPercentage: percentage
            };
        });

        res.status(200).json({
            count: enrollments.length,
            courses: dashboardWithPercentage
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}