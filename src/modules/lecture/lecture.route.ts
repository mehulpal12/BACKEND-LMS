import express from "express";
import { create, getByCourse, getById, update, remove } from "./lecture.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, roleMiddleware("ADMIN"), upload.single("video"), create);
router.route("/course/:courseId").get(getByCourse);
router.route("/:id").get(getById);
router.route("/:id").put(authMiddleware, roleMiddleware("ADMIN"), update);
router.route("/:id").delete(authMiddleware, roleMiddleware("ADMIN"), remove);

export default router;