import express from "express";
import { create, getAll, getById, update, remove } from "./course.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.route("/").get(getAll);
router.route("/").post(authMiddleware, roleMiddleware("ADMIN"), create);
router.route("/:id").get(getById);
router.route("/:id").put(authMiddleware, roleMiddleware("ADMIN"), update);
router.route("/:id").delete(authMiddleware, roleMiddleware("ADMIN"), remove);

export default router;