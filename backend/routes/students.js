// routes.js

import express from "express";
import {
    getStudentHistoryLogs,
    addItemToHistoryLogs,
    getStudentDetails,
} from "../controllers/student.controllers.js";
import { studentAuth } from "../middlewares/auth.js";

const router = express.Router();

// function hello(){
//     console.log("hey")
// }

// Route to get history logs of a specific student by ID
router.get("/:studentId", getStudentDetails);
router.get("/:studentId/historyLogs", studentAuth, getStudentHistoryLogs);
router.post("/:studentId/addItem", studentAuth, addItemToHistoryLogs);

export default router;
