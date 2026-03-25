import prisma from "../../db/index.js";
import cloudinary from "../../config/cloudinary.js";
import { Request, Response } from "express";

export const getSecureVideo = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId as string },
    });

    if (!lesson || !lesson.videoUrl) {
      return res.status(404).json({ message: "Lesson/Video not found" });
    }

    // 1. Better Extraction: Get everything after '/upload/v12345/' and before '.mp4'
    // This handles folders like 'main-course/lectures/' perfectly.
    const urlParts = lesson.videoUrl.split('/');
    const vIndex = urlParts.findIndex(part => part.startsWith('v') && !isNaN(Number(part.substring(1))));
    
    // Join everything after the version number, then remove the file extension
    let fullPath = urlParts.slice(vIndex + 1).join('/');
    const publicId = fullPath.replace(/\.[^/.]+$/, ""); 

    // 2. Generate the URL using the 'url' method with 'sign_url: true'
    // This is often more compatible with <video> tags than the download link
    const signedUrl = cloudinary.url(publicId, {
      resource_type: "video",
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour for testing
    });

    res.json({ videoUrl: signedUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};