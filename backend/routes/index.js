import authRouter from "./auth.js";
import itemRouter from "./item.js";
import studentsRouter from "./students.js";
import requestRouter from "./request.js";

import express from "express";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/item", itemRouter);
router.use("/student", studentsRouter);
router.use("/request", requestRouter);

export default router;
