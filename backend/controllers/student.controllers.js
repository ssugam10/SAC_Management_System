import Student from "../models/Student.js";
import Item from "../models/Item.js";
import HistoryLog from "../models/HistoryLog.js";

export async function getStudentHistoryLogs(req, res) {
    const studentId = req.user.studentId;
    console.log("yooooo" + studentId);

    try {
        // Fetch the specific student with their associated history logs and items
        const student = await Student.findByPk(studentId, {
            include: [
                {
                    model: HistoryLog,
                    as: "historyLogs",
                    include: {
                        model: Item,
                        as: "item",
                    },
                },
            ],
        });

        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Render the student page with the fetched data
        res.status(200).json({
            student,
        });
    } catch (error) {
        console.error("Error fetching student history logs:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function addItemToHistoryLogs(req, res) {
    const { itemId, timeOfBorrowing } = req.body;
    const studentId = req.user.studentId;
    try {
        // Find the student by ID
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Create a new history log entry for the student
        const historyLog = await HistoryLog.create({
            itemId,
            timeOfIssue: timeOfBorrowing,
            studentId: student.id, // Associate the history log with the student
        });

        // Return the newly created history log entry
        res.status(201).json({
            message: "Item added to history logs successfully",
            historyLog,
        });
    } catch (error) {
        console.error("Error adding item to history logs:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function getStudentDetails(req, res) {
    try {
        const studentId = req.params;
        const student = await Student.findByPk({
            where: { id: studentId },
            include: { all: true, nested: true },
        });

        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }

        res.status(200).json(student); // Send back the requests related to the item
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).send({
            message: "Error retrieving student",
        });
    }
}
