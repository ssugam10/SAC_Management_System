import Sequelize from 'sequelize';
import sequelize from '../config.js';
import HistoryLog from './HistoryLog.js';

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

Student.hasMany(HistoryLog, { as: 'historyLogs' });
HistoryLog.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
export default Student;