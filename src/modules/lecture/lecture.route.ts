import express from "express";
import { create, getByCourse, getById, update, remove } from "./lecture.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import { checkEnrollment } from "../../middlewares/checkEnrollment.middleware.js";
import { getSecureVideo } from "./video.controller.js";

const router = express.Router();

router.route("/").post(authMiddleware, roleMiddleware("ADMIN"), upload.single("video"), create);
router.route("/:courseId").get(
  // authMiddleware,
  // checkEnrollment,
  getByCourse); // get all lesson by the course id 
router.route("/:courseId/:id").get(
  // authMiddleware,
  // checkEnrollment,
  getById);// get lesson by single id
router.route("/:courseId/:id").put(authMiddleware,checkEnrollment, roleMiddleware("ADMIN"), update); // update lesson by single id
router.route("/:courseId/:id").delete(authMiddleware,checkEnrollment, roleMiddleware("ADMIN"), remove); // delete lesson by single id
router.get(
  "/:courseId/:lessonId/video",
  // authMiddleware,
  // checkEnrollment,
  getSecureVideo
);
export default router;