import Student from "../models/Student.js";
import User from "../models/User.js";
import Item from "../models/Item.js"
import HistoryLog from "../models/HistoryLog.js";


import Sequelize from "sequelize";

// const sequelize = new Sequelize("sac_management_system", "root", "root", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 8889,
// });
// sequelize
//     .sync({ force: false })
//     .then(async () => {
//         console.log(
//             `Database connected! 🚀`
//         );
//         // await getStudentHistoryLogs(2); // Call the function after database connection
//         // await addItemToHistoryLogs({studentId: 1, timeOfBorrowing: Date.now(), itemId:1 })


//     })
//     .catch((err) => console.log(err));



const studentController = {
    async getStudentHistoryLogs(req, res) {
      const { studentId } = req.params;
      console.log("yooooo"+studentId);
  
      try {
        // Fetch the specific student with their associated history logs and items
        const student = await Student.findByPk(studentId, {
          include: [
            {
              model: HistoryLog,
              as: 'historyLogs',
              include: {
                model: Item,
                as: 'item'
              }
            }
          ]
        });
  
        if (!student) {
          return res.status(404).send('Student not found');
        }
  
        // Render the student page with the fetched data
        res.status(200).json({
            student
        });
      } catch (error) {
        console.error('Error fetching student history logs:', error);
        res.status(500).send('Internal Server Error');
      }
    },















    async addItemToHistoryLogs(req,res){
        const { studentId } = req.params;
        const { itemId, timeOfBorrowing } = req.body;
    
        try {
          // Find the student by ID
          const student = await Student.findByPk(studentId);
          if (!student) {
            return res.status(404).send('Student not found');
          }
    
          // Create a new history log entry for the student
          const historyLog = await HistoryLog.create({
            itemId,
            timeOfIssue: timeOfBorrowing,
            studentId: student.id // Associate the history log with the student
          });
    
          // Return the newly created history log entry
          res.status(201).json({ message: 'Item added to history logs successfully', historyLog });
        } catch (error) {
          console.error('Error adding item to history logs:', error);
          res.status(500).send('Internal Server Error');
        }
    }
  };

  async function addItemToHistoryLogs({studentId,itemId, timeOfBorrowing}){

    try {
      // Find the student by ID
      const student = await Student.findByPk(studentId);

      // Create a new history log entry for the student
      const historyLog = await HistoryLog.create({
        itemId,
        timeOfIssue: timeOfBorrowing,
        studentId: student.id // Associate the history log with the student
      });

      // Return the newly created history log entry
      console.log(historyLog);
    } catch (error) {
      console.error('Error adding item to history logs:', error);
    }
}

export default studentController;


// async function getStudentHistoryLogs(studentId) {
//     try {
//         // Fetch the specific student with their associated history logs and items
//         const student = await Student.findByPk(studentId, {
//             include: [
//                 {
//                     model: HistoryLog,
//                     as: 'historyLogs',
//                     include: {
//                         model: Item,
//                         as: 'item'
//                     }
//                 }
//             ]
//         });
//         // console.log({student}.student.historyLogs[0].item.dataValues.name+{student}.student.historyLogs[1].item.dataValues.name);
//     } catch (error) {
//         console.error('Error fetching student history logs:', error);
//     }
// }


