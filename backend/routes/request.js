import { createRequest } from "../controllers/request.controllers.js";

import express from "express";
import { studentAuth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/:itemId", studentAuth, createRequest);

export default router;
