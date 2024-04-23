// routes.js

import express from 'express';
import studentController from '../controllers/StudentControllers.js';

const router = express.Router();

// function hello(){
//     console.log("hey")
// }

// Route to get history logs of a specific student by ID
router.get('/:studentId/historyLogs', studentController.getStudentHistoryLogs);
router.post('/:studentId/addItem', studentController.addItemToHistoryLogs);

export default router;
